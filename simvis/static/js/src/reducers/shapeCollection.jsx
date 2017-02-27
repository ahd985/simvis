import uuidV4 from 'uuid/v4'

const shapeCollection = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SHAPE':
            return [
                ...state.shapes,
                {uuid:"s" + uuidV4(), shape:action.shape, position:{x:400, y:400}}
            ];
        case 'REMOVE_SHAPES':
            return state.shapes.filter((shape) => {
                return state.selectedShapes.indexOf(shape.uuid) > -1
            });
        case 'MOVE_SHAPES':
            return action.deltaShapePos;
        case 'RESIZE_SHAPES':
            return action.deltaShapeSize;
        case 'REORDER_SHAPES':
            let topPosition = -1;
            const movePositions = state.shapes.map(function(d, i) {
                let ind = state.selectedShapes.indexOf(d.uuid);
                if (ind > -1) {
                    topPosition == -1 ? topPosition = i : null;
                    return true
                } else {
                    return false
                }
            });

            let updatedShapes = this.state.shapes;
            let movedShapes = [];
            for (let i=movePositions.length-1; i >= 0; i--) {
                if (movePositions[i]) {
                    movedShapes.unshift(updatedShapes[i]);
                    updatedShapes.splice(i,1);
                }
            }

            let step = 0;
            if (action.step == "B") {
                topPosition = 0;
                step = 0
            } else if (action.step == "F") {
                topPosition = this.state.shapes.length - 1 - movedShapes.length;
                step = 0
            } else {
                step = action.step
            }

            topPosition = Math.max(0, topPosition + step);

            let args = [topPosition, 0].concat(movedShapes);
            Array.prototype.splice.apply(updatedShapes, args);

            return updatedShapes;
        case 'SET_DATA':
            return {data:action.data, dataHeaders:action.dataHeaders};
        case 'SET_SHAPE_STYLE':
            let updatedStyle = state.selectedStyle;
            for (var s in style) {
                updatedStyle[s] = style[s]
            }

            return updatedStyle;
        case 'SET_SELECTED_SHAPES':
            if (action.overwriteIfNotPresent) {
                return [action.uuid]
            } else {
                return [
                    ...state.selectedShapes,
                    action.uuid
                ]
            }
        case 'CLEAR_SELECTED_SHAPES':
            return [];
        case 'SET_SHAPE_MODEL':
            const element_data = {
                conditions: [
                    {
                        color_levels:[372.7401979757573,408.50419817952684,444.2681983832963],
                        color_scale:['#fdd49e','#fdbb84','#fc8d59'],
                        data:[409],
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

            var demo = ssv.create_demo_element(this.state.selectedShapes[0], element_data).update(0,0);
            return;
        default:
            return state
    }
};

export default shapeCollection
