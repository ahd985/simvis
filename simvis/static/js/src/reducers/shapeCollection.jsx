import uuidV4 from 'uuid/v4'
import ssv from '../../ssv.min.js'

const defaultShapeStyle = {fill: "#F4F4F4", stroke: "black", strokeWidth: 1, cursor: "move", color:"black", fontSize:12};

const defaultPresent = {
    shapes: [],
    selectedShapes: [],
    selectedStyle:{},
    data: null,
    dataHeaders: null,
    xSeriesIndex: null,
    editActive: false,
    addPosition: {x:10, y:10},
    layout:{
        leftSideBarWidth:250,
        rightSideBarPresent:true,
        rightSideBarWidth:300,
        diagramWidth:500,
        diagramHeight:500,
        scale:100
    },
    overview:{
        title:"",
        x_series_unit:"",
        font_size:12
    }
};

const historyTracker = (reducer) => {
    const initialState = {
        past: [],
        present: reducer(undefined, {}),
        future: []
    };

    return function (state = initialState, action) {
        console.log(state, action);

        const { past, present, future } = state;

        switch (action.type) {
            case 'UNDO':
                if (past.length > 0) {
                    const previous = past[past.length - 1];
                    const newPast = past.slice(0, past.length - 1);
                    return {
                        past: newPast,
                        present: previous,
                        future: [present, ...future]
                    }
                } else {
                    return state
                }
            case 'REDO':
                if (future.length > 0) {
                    const next = future[0];
                    const newFuture = future.slice(1);
                    return {
                        past: [ ...past, present ],
                        present: next,
                        future: newFuture
                    };
                } else {
                    return state
                }

            default:
                // TODO - Set limit on history size
                const noHistoryActions = ['MOVE_SHAPES', 'ADD_SELECTED_SHAPE'];

                const newPresent = reducer(present, action);
                if (present === newPresent && action.type != 'START_MOVE_SHAPES') {
                    return state
                }

                return {
                    past: (noHistoryActions.indexOf(action.type) >= 0 ? [...past] : [...past, present]),
                    present: newPresent,
                    future: []
                }
        }
    }
};

const shapeCollection = (state = defaultPresent, action) => {
    switch (action.type) {
        case 'ADD_SHAPE':
            return {
                ...state,
                shapes:[
                    ...state.shapes,
                    {
                        uuid:"s" + uuidV4(),
                        shape:action.shape,
                        position:state.addPosition,
                        dims:{width:action.shape.bbox.w0, height:action.shape.bbox.h0},
                        deltaDims:{width:0, height:0},
                        style:(action.shape.style ? action.shape.style : defaultShapeStyle),
                    }
                ],
                addPosition:{x:state.addPosition.x + 10, y:state.addPosition.y + 10}
            };
        case 'REMOVE_SHAPES':
            return {
                ...state,
                shapes:state.shapes.filter((shapeData) => {
                    if (state.selectedShapes.indexOf(shapeData.uuid) > -1) {
                        return false
                    } else {
                        return true
                    }
                }),
                selectedShapes:[],
                editActive: false
            };
        case 'MOVE_SHAPES':
            return {
                ...state,
                shapes:state.shapes.map((shape) => {
                    if (state.selectedShapes.indexOf(shape.uuid) > -1) {
                        return {
                            ...shape,
                            position: {
                                x:shape.position.x + action.deltaShapePos.x,
                                y:shape.position.y + action.deltaShapePos.y
                            }
                        }
                    } else {
                        return shape
                    }
                }),
                editActive:false
            };
        case 'START_MOVE_SHAPES':
            return state;
        case 'RESIZE_SHAPES':
            return {
                ...state,
                shapes:state.shapes.map((shapeData) => {
                    if (state.selectedShapes.indexOf(shapeData.uuid) > -1) {
                        var dX, dY;
                        if (shapeData.shape.ratioLock) {
                            if (Math.abs(action.deltaShapeSize.width) > Math.abs(action.deltaShapeSize.height)) {
                                dY = action.deltaShapeSize.width * shapeData.dims.height / shapeData.dims.width;
                                dX = action.deltaShapeSize.width
                            } else {
                                dX = action.deltaShapeSize.height * shapeData.dims.width / shapeData.dims.height;
                                dY = action.deltaShapeSize.height
                            }
                        } else {
                            dX = action.deltaShapeSize.width;
                            dY = action.deltaShapeSize.height
                        }

                        return {
                            ...shapeData,
                            deltaDims:{
                                width:shapeData.deltaDims.width + dX,
                                height:shapeData.deltaDims.height + dY
                            }
                        }
                    } else {
                        return shapeData
                    }
                })
            };
        case 'REORDER_SHAPES':
            var topPosition = -1;
            const movePositions = state.shapes.map(function(d, i) {
                if (state.selectedShapes.indexOf(d.uuid) > -1) {
                    topPosition == -1 ? topPosition = i : null;
                    return true
                } else {
                    return false
                }
            });

            var updatedShapes = state.shapes.slice();
            var movedShapes = [];
            for (var i=movePositions.length-1; i >= 0; i--) {
                if (movePositions[i]) {
                    movedShapes.unshift(updatedShapes[i]);
                    updatedShapes.splice(i,1);
                }
            }

            var step = 0;
            if (action.step == "B") {
                topPosition = 0;
            } else if (action.step == "F") {
                topPosition = state.shapes.length - 1;
            } else {
                step = action.step
            }

            topPosition = Math.max(0, topPosition + step);

            var args = [topPosition, 0].concat(movedShapes);
            Array.prototype.splice.apply(updatedShapes, args);

            return {
                ...state,
                shapes: updatedShapes
            };
        case 'SET_DATA':
            return {
                ...state,
                data:action.data,
                dataHeaders:action.dataHeaders,
                xSeriesIndex:action.xSeriesIndex
            };
        case 'CLEAR_DATA':
            state.shapes.map((shapeData) => {
                ssv.remove_demo_element(shapeData.uuid)
            })

            return {
                ...state,
                data: null,
                dataHeaders: null,
                xSeriesIndex: null
            }
        case 'SET_SHAPE_STYLE':
            return {
                ...state,
                shapes:state.shapes.map((shapeData) => {
                    if (state.selectedShapes.indexOf(shapeData.uuid) > -1) {
                        return Object.assign({}, shapeData, {style: Object.assign({}, shapeData.style, action.style)});
                    } else {
                        return shapeData
                    }
                }),
                selectedStyle:Object.assign({}, state.selectedStyle, action.style)
            };
        case 'SET_SELECTED_STYLE':
            return {
                ...state,
                selectedStyle:action.style
            };
        case 'ADD_SELECTED_SHAPE':
            var selectedShapes;
            if (action.overwriteIfNotPresent && state.selectedShapes.indexOf(action.uuid) == -1) {
                selectedShapes = [action.uuid]
            } else {
                selectedShapes = [
                    ...state.selectedShapes
                ];
                if (state.selectedShapes.indexOf(action.uuid) == -1) {
                    selectedShapes.push(action.uuid)
                }
            }

            // Use the top element's style to populate the menu
            var topShapeStyle;
            for (var shape of state.shapes) {
                if (shape.uuid == action.uuid) {
                    topShapeStyle = shape.style;
                }
            }

            return {
                ...state,
                selectedShapes,
                selectedStyle:topShapeStyle
            };
        case 'SELECT_SHAPES_IN_OUTLINE':
            var outlinedShapes = state.shapes.filter((shapeData) => {
                if (shapeData.position.x >= action.outline.x &&
                    shapeData.position.y >= action.outline.y &&
                    shapeData.position.x + shapeData.dims.width + shapeData.deltaDims.width <= action.outline.x + action.outline.width &&
                    shapeData.position.y + shapeData.dims.height + shapeData.deltaDims.height <= action.outline.y + action.outline.height) {

                    return true
                } else {
                    return false
                }
            }).map((shapeData) => {
                return shapeData.uuid
            });

            return {
                ...state,
                selectedShapes:outlinedShapes,
                editActive:false
            };
        case 'CLEAR_SELECTED_SHAPES':
            return {
                ...state,
                selectedShapes:[],
                editActive:false
            };
        case 'SET_SHAPE_MODEL':
            // Add in x-series and data to create demo model
            const demoModel = {
                "x_series":state.data.map((row) => {
                    return row[state.xSeriesIndex]
                }),
                ...action.model,
                conditions: action.model.conditions.map((condition) => {
                    return {
                        ...condition,
                        id: "s" + uuidV4().substring(0,8),
                        data:state.data.map((row) => {return row[condition.dataIndex]})
                    }
                }),
                ids:["element"]
            };
            ssv.create_demo_element(state.selectedShapes[0], demoModel).update(0,0);

            return {
                ...state,
                shapes: state.shapes.map((shapeData) => {
                    if (state.selectedShapes.indexOf(shapeData.uuid) > -1) {
                        shapeData.model = action.model
                    }
                    return shapeData
                })
            };
        case 'SET_OVERVIEW':
            return {
                ...state,
                overview:action.overview
            };
        case 'SET_LAYOUT':
            return {
                ...state,
                layout:{
                    ...state.layout,
                    [action.arg]:action.value
                }
            };
        case 'TOGGLE_EDIT':
            return {
                ...state,
                editActive:action.value ? action.value : !state.editActive
            };
        default:
            return state
    }
};

export default historyTracker(shapeCollection)
