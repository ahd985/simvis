'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ssvMin = require('../../ssv.min.js');

var _ssvMin2 = _interopRequireDefault(_ssvMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultShapeStyle = { fill: "#F4F4F4", stroke: "black", strokeWidth: 1, color: "black", fontSize: 12 };

var defaultPresent = {
    shapes: [],
    selectedShapes: [],
    selectedStyle: {},
    data: null,
    dataHeaders: null,
    xSeriesIndex: null,
    editActive: false,
    addPosition: { x: 10, y: 10 },
    layout: {
        leftSideBarWidth: 250,
        rightSideBarPresent: true,
        rightSideBarWidth: 300,
        diagramWidth: 500,
        diagramHeight: 500,
        scale: 100
    },
    overview: {
        title: "",
        x_series_unit: "",
        font_size: 12
    }
};

var historyTracker = function historyTracker(reducer) {
    var initialState = {
        past: [],
        present: reducer(undefined, {}),
        future: []
    };

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        console.log(state, action);

        var past = state.past,
            present = state.present,
            future = state.future;


        switch (action.type) {
            case 'UNDO':
                if (past.length > 0) {
                    var previous = past[past.length - 1];
                    var newPast = past.slice(0, past.length - 1);
                    return {
                        past: newPast,
                        present: previous,
                        future: [present].concat(_toConsumableArray(future))
                    };
                } else {
                    return state;
                }
            case 'REDO':
                if (future.length > 0) {
                    var next = future[0];
                    var newFuture = future.slice(1);
                    return {
                        past: [].concat(_toConsumableArray(past), [present]),
                        present: next,
                        future: newFuture
                    };
                } else {
                    return state;
                }

            default:
                // TODO - Set limit on history size
                var noHistoryActions = ['MOVE_SHAPES', 'ADD_SELECTED_SHAPE'];

                var newPresent = reducer(present, action);
                if (present === newPresent && action.type != 'START_MOVE_SHAPES') {
                    return state;
                }

                return {
                    past: noHistoryActions.indexOf(action.type) >= 0 ? [].concat(_toConsumableArray(past)) : [].concat(_toConsumableArray(past), [present]),
                    present: newPresent,
                    future: []
                };
        }
    };
};

var shapeCollection = function shapeCollection() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultPresent;
    var action = arguments[1];

    switch (action.type) {
        case 'ADD_SHAPE':
            return _extends({}, state, {
                shapes: [].concat(_toConsumableArray(state.shapes), [{
                    uuid: "s" + (0, _v2.default)(),
                    shape: action.shape,
                    position: state.addPosition,
                    dims: { width: action.shape.bbox.w0, height: action.shape.bbox.h0 },
                    deltaDims: { width: 0, height: 0 },
                    style: action.shape.style ? action.shape.style : defaultShapeStyle
                }]),
                addPosition: { x: state.addPosition.x + 10, y: state.addPosition.y + 10 }
            });
        case 'REMOVE_SHAPES':
            return _extends({}, state, {
                shapes: state.shapes.filter(function (shapeData) {
                    if (state.selectedShapes.indexOf(shapeData.uuid) > -1) {
                        return false;
                    } else {
                        return true;
                    }
                }),
                selectedShapes: [],
                editActive: false
            });
        case 'MOVE_SHAPES':
            return _extends({}, state, {
                shapes: state.shapes.map(function (shape) {
                    if (state.selectedShapes.indexOf(shape.uuid) > -1) {
                        return _extends({}, shape, {
                            position: {
                                x: Math.max(0, shape.position.x + action.deltaShapePos.x),
                                y: Math.max(0, shape.position.y + action.deltaShapePos.y)
                            }
                        });
                    } else {
                        return shape;
                    }
                }),
                editActive: false
            });
        case 'START_MOVE_SHAPES':
            return state;
        case 'RESIZE_SHAPES':
            return _extends({}, state, {
                shapes: state.shapes.map(function (shapeData) {
                    if (state.selectedShapes.indexOf(shapeData.uuid) > -1) {
                        var dH = action.deltaShapeSize.height;
                        var dW = action.deltaShapeSize.width;
                        var dX = action.deltaShapeSize.x;
                        var dY = action.deltaShapeSize.y;

                        if (shapeData.shape.ratioLock) {
                            if (Math.abs(dW) > Math.abs(dH)) {
                                dH = dW;
                                dY = dX;
                            } else {
                                dW = dH;
                                dX = dY;
                            }
                        }

                        var width = shapeData.deltaDims.width + dW;
                        var height = shapeData.deltaDims.height + dH;
                        var minH = shapeData.shape.minY || 25;
                        var minW = shapeData.shape.minX || 25;

                        // Check if H or W is at min value transition
                        var yMinPre = shapeData.dims.height + shapeData.deltaDims.height < minH;
                        var yMinPost = shapeData.dims.height + height < minH;
                        if (dY != 0) {
                            if (yMinPre && yMinPost) {
                                dY = 0;
                            } else if (yMinPre) {
                                dY += minH - (shapeData.dims.height + shapeData.deltaDims.height);
                            } else if (yMinPost) {
                                dY = Math.max(0, shapeData.dims.height + shapeData.deltaDims.height - minH);
                            }
                        };

                        var xMinPre = shapeData.dims.width + shapeData.deltaDims.width < minW;
                        var xMinPost = shapeData.dims.width + width < minW;
                        if (dX != 0) {
                            if (xMinPre && xMinPost) {
                                dX = 0;
                            } else if (xMinPre) {
                                dX += minW - (shapeData.dims.width + shapeData.deltaDims.width);
                            } else if (xMinPost) {
                                dX = Math.max(0, shapeData.dims.width + shapeData.deltaDims.width - minW);
                            }
                        };

                        return _extends({}, shapeData, {
                            deltaDims: {
                                width: action.reset ? Math.max(width, minW - shapeData.dims.width) : width,
                                height: action.reset ? Math.max(height, minH - shapeData.dims.height) : height
                            },
                            position: {
                                x: shapeData.position.x + dX,
                                y: shapeData.position.y + dY
                            }
                        });
                    } else {
                        return shapeData;
                    }
                })
            });
        case 'REORDER_SHAPES':
            var topPosition = -1;
            var movePositions = state.shapes.map(function (d, i) {
                if (state.selectedShapes.indexOf(d.uuid) > -1) {
                    topPosition == -1 ? topPosition = i : null;
                    return true;
                } else {
                    return false;
                }
            });

            var updatedShapes = state.shapes.slice();
            var movedShapes = [];
            for (var i = movePositions.length - 1; i >= 0; i--) {
                if (movePositions[i]) {
                    movedShapes.unshift(updatedShapes[i]);
                    updatedShapes.splice(i, 1);
                }
            }

            var step = 0;
            if (action.step == "B") {
                topPosition = 0;
            } else if (action.step == "F") {
                topPosition = state.shapes.length - 1;
            } else {
                step = action.step;
            }

            topPosition = Math.max(0, topPosition + step);

            var args = [topPosition, 0].concat(movedShapes);
            Array.prototype.splice.apply(updatedShapes, args);

            return _extends({}, state, {
                shapes: updatedShapes
            });
        case 'SET_DATA':
            return _extends({}, state, {
                data: action.data,
                dataHeaders: action.dataHeaders,
                xSeriesIndex: action.xSeriesIndex
            });
        case 'CLEAR_DATA':
            state.shapes.map(function (shapeData) {
                _ssvMin2.default.remove_demo_element(shapeData.uuid);
            });

            return _extends({}, state, {
                data: null,
                dataHeaders: null,
                xSeriesIndex: null
            });
        case 'SET_SHAPE_STYLE':
            return _extends({}, state, {
                shapes: state.shapes.map(function (shapeData) {
                    if (state.selectedShapes.indexOf(shapeData.uuid) > -1) {
                        return Object.assign({}, shapeData, { style: Object.assign({}, shapeData.style, action.style) });
                    } else {
                        return shapeData;
                    }
                }),
                selectedStyle: Object.assign({}, state.selectedStyle, action.style)
            });
        case 'SET_SELECTED_STYLE':
            return _extends({}, state, {
                selectedStyle: action.style
            });
        case 'ADD_SELECTED_SHAPE':
            var selectedShapes;
            if (action.overwriteIfNotPresent && state.selectedShapes.indexOf(action.uuid) == -1) {
                selectedShapes = [action.uuid];
            } else {
                selectedShapes = [].concat(_toConsumableArray(state.selectedShapes));
                if (state.selectedShapes.indexOf(action.uuid) == -1) {
                    selectedShapes.push(action.uuid);
                }
            }

            // Use the top element's style to populate the menu
            var topShapeStyle;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = state.shapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var shape = _step.value;

                    if (shape.uuid == action.uuid) {
                        topShapeStyle = shape.style;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return _extends({}, state, {
                selectedShapes: selectedShapes,
                selectedStyle: topShapeStyle
            });
        case 'CHANGE_PATH':
            return _extends({}, state, {
                shapes: state.shapes.map(function (shape) {
                    if (shape.uuid == action.uuid) {
                        var newShape = _extends({}, shape);
                        newShape.shape.elements[0].d = action.path;
                        return newShape;
                    } else {
                        return shape;
                    }
                }),
                editActive: false
            });
        case 'SELECT_SHAPES_IN_OUTLINE':
            var outlinedShapes = state.shapes.filter(function (shapeData) {
                if (shapeData.position.x >= action.outline.x && shapeData.position.y >= action.outline.y && shapeData.position.x + shapeData.dims.width + shapeData.deltaDims.width <= action.outline.x + action.outline.width && shapeData.position.y + shapeData.dims.height + shapeData.deltaDims.height <= action.outline.y + action.outline.height) {

                    return true;
                } else {
                    return false;
                }
            }).map(function (shapeData) {
                return shapeData.uuid;
            });

            return _extends({}, state, {
                selectedShapes: outlinedShapes,
                editActive: false
            });
        case 'CLEAR_SELECTED_SHAPES':
            return _extends({}, state, {
                selectedShapes: [],
                editActive: false
            });
        case 'SET_SHAPE_MODEL':
            // Add in x-series and data to create demo model
            var demoModel = _extends({
                "x_series": state.data.map(function (row) {
                    return row[state.xSeriesIndex];
                })
            }, action.model, {
                conditions: action.model.conditions.map(function (condition) {
                    return _extends({}, condition, {
                        id: "s" + (0, _v2.default)().substring(0, 8),
                        data: state.data.map(function (row) {
                            return row[condition.dataIndex];
                        })
                    });
                }),
                ids: ["element"]
            });
            _ssvMin2.default.create_demo_element(state.selectedShapes[0], demoModel).update(0, 0);

            return _extends({}, state, {
                shapes: state.shapes.map(function (shapeData) {
                    if (state.selectedShapes.indexOf(shapeData.uuid) > -1) {
                        shapeData.model = action.model;
                    }
                    return shapeData;
                })
            });
        case 'SET_OVERVIEW':
            return _extends({}, state, {
                overview: action.overview
            });
        case 'SET_LAYOUT':
            return _extends({}, state, {
                layout: _extends({}, state.layout, _defineProperty({}, action.arg, action.value))
            });
        case 'TOGGLE_EDIT':
            return _extends({}, state, {
                editActive: action.value ? action.value : !state.editActive
            });
        default:
            return state;
    }
};

exports.default = historyTracker(shapeCollection);