import uuidV4 from 'uuid/v4'
import ssv from '../../ssv.min.js'

const shapeStyle = {fill: "grey", stroke: "black", strokeWidth: 1, cursor: "move"};

const defaultState = {
    shapes: [],
    selectedShapes: [],
    selectedStyle:{},
    data: null,
    dataHeaders: null
};

const shapeCollection = (state = defaultState, action) => {
    console.log(state, action);
    switch (action.type) {
        case 'ADD_SHAPE':
            return {
                ...state,
                shapes:[
                    ...state.shapes,
                    {
                        uuid:"s" + uuidV4(),
                        shape:action.shape,
                        position:{x:400, y:400},
                        dims:{width:action.shape.bbox.w0, height:action.shape.bbox.h0},
                        deltaDims:{width:0, height:0},
                        style:shapeStyle
                    }
                ]
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
                })
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
                })
            };
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
                dataHeaders:action.dataHeaders
            };
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
                selectedShapes:outlinedShapes
            };
        case 'CLEAR_SELECTED_SHAPES':
            return {
                ...state,
                selectedShapes:[]
            };
        case 'SET_SHAPE_MODEL':
            /*
            const element_data = {
                conditions: [
                    {
                        color_levels:[372.7401979757573,408.50419817952684,444.2681983832963],
                        color_scale:['#fdd49e','#fdbb84','#fc8d59'],
                        data:[450],
                        description:"Vapor Temp",
                        id:"element_0",
                        opacity:1,
                        report:false,
                        type:"background",
                        unit:"K"
                    }
                ],
                description: "Quench Tank",
                ids: ['element'],
                type: "cell",
                x_series:[0]
            };
            */

            // Add in x-series to model
            const model = {
                "x_series":state.data.map((row) => {
                    return row[0]
                }),
                ...action.model
            };

            console.log(action.model.ids[0], model)

            var demo = ssv.create_demo_element(state.selectedShapes[0], model).update(0,0);
            return state;
        default:
            return state
    }
};

export default shapeCollection
