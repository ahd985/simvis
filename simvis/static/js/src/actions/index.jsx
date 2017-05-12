export const setStrokeWidth = (strokeWidth) => ({
    type: 'SET_STROKE_WIDTH',
    strokeWidth: 10
});

export const addShape = (shape) => ({type:'ADD_SHAPE', shape});
export const removeShapes = () => ({type:'REMOVE_SHAPES'});
export const startMoveShapes = () => ({type:'START_MOVE_SHAPES'});
export const moveShapes = (deltaShapePos) => ({type:'MOVE_SHAPES', deltaShapePos});
export const resizeShapes = (deltaShapeSize) => ({type:'RESIZE_SHAPES', deltaShapeSize});
export const reorderShapes = (step) => ({type:'REORDER_SHAPES', step});
export const setData = (data, dataHeaders, xSeriesIndex) => ({type:'SET_DATA', data, dataHeaders, xSeriesIndex});
export const setSelectedStyle = (style) => ({type:'SET_SELECTED_STYLE', style});
export const setShapeStyle = (style) => ({type:'SET_SHAPE_STYLE', style});
export const addSelectedShape = (uuid, overwriteIfNotPresent) => ({
    type:'ADD_SELECTED_SHAPE', uuid, overwriteIfNotPresent
});
export const selectShapesInOutline = (outline) => ({
    type:'SELECT_SHAPES_IN_OUTLINE', outline
});
export const clearSelectedShapes = () => ({type:'CLEAR_SELECTED_SHAPES'});
export const setShapeModel = (model) => ({type:'SET_SHAPE_MODEL', model:model});
export const setOverview = (overview) => ({type:'SET_OVERVIEW', overview:overview});
export const setLayout = (arg, value) => ({type:'SET_LAYOUT', arg, value});
export const undo = () => ({type:'UNDO'});
export const redo = () => ({type:'REDO'});
export const toggleEdit = (value) => ({type:'TOGGLE_EDIT', value});
