'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var setStrokeWidth = exports.setStrokeWidth = function setStrokeWidth(strokeWidth) {
    return {
        type: 'SET_STROKE_WIDTH',
        strokeWidth: 10
    };
};

var addShape = exports.addShape = function addShape(shape) {
    return { type: 'ADD_SHAPE', shape: shape };
};
var removeShapes = exports.removeShapes = function removeShapes() {
    return { type: 'REMOVE_SHAPES' };
};
var startMoveShapes = exports.startMoveShapes = function startMoveShapes() {
    return { type: 'START_MOVE_SHAPES' };
};
var moveShapes = exports.moveShapes = function moveShapes(deltaShapePos) {
    return { type: 'MOVE_SHAPES', deltaShapePos: deltaShapePos };
};
var resizeShapes = exports.resizeShapes = function resizeShapes(deltaShapeSize, reset) {
    return { type: 'RESIZE_SHAPES', deltaShapeSize: deltaShapeSize, reset: reset };
};
var reorderShapes = exports.reorderShapes = function reorderShapes(step) {
    return { type: 'REORDER_SHAPES', step: step };
};
var setData = exports.setData = function setData(data, dataHeaders, xSeriesIndex) {
    return { type: 'SET_DATA', data: data, dataHeaders: dataHeaders, xSeriesIndex: xSeriesIndex };
};
var clearData = exports.clearData = function clearData() {
    return { type: 'CLEAR_DATA' };
};
var setSelectedStyle = exports.setSelectedStyle = function setSelectedStyle(style) {
    return { type: 'SET_SELECTED_STYLE', style: style };
};
var setShapeStyle = exports.setShapeStyle = function setShapeStyle(style) {
    return { type: 'SET_SHAPE_STYLE', style: style };
};
var changePath = exports.changePath = function changePath(path, uuid) {
    return { type: 'CHANGE_PATH', path: path, uuid: uuid };
};
var addSelectedShape = exports.addSelectedShape = function addSelectedShape(uuid, overwriteIfNotPresent) {
    return {
        type: 'ADD_SELECTED_SHAPE', uuid: uuid, overwriteIfNotPresent: overwriteIfNotPresent
    };
};
var selectShapesInOutline = exports.selectShapesInOutline = function selectShapesInOutline(outline) {
    return {
        type: 'SELECT_SHAPES_IN_OUTLINE', outline: outline
    };
};
var clearSelectedShapes = exports.clearSelectedShapes = function clearSelectedShapes() {
    return { type: 'CLEAR_SELECTED_SHAPES' };
};
var setShapeModel = exports.setShapeModel = function setShapeModel(model) {
    return { type: 'SET_SHAPE_MODEL', model: model };
};
var setOverview = exports.setOverview = function setOverview(overview) {
    return { type: 'SET_OVERVIEW', overview: overview };
};
var setLayout = exports.setLayout = function setLayout(arg, value) {
    return { type: 'SET_LAYOUT', arg: arg, value: value };
};
var undo = exports.undo = function undo() {
    return { type: 'UNDO' };
};
var redo = exports.redo = function redo() {
    return { type: 'REDO' };
};
var toggleEdit = exports.toggleEdit = function toggleEdit(value) {
    return { type: 'TOGGLE_EDIT', value: value };
};