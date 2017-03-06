export const setStrokeWidth = (strokeWidth) => ({
    type: 'SET_STROKE_WIDTH',
    strokeWidth: 10
});

export const addShape = (shape) => ({type:'ADD_SHAPE', shape});
export const removeShapes = () => ({type:'REMOVE_SHAPES'});
export const moveShapes = (deltaShapePos) => ({type:'MOVE_SHAPES', deltaShapePos});
export const resizeShapes = (deltaShapeSize) => ({type:'RESIZE_SHAPES', deltaShapeSize});
export const reorderShapes = (step) => ({type:'REORDER_SHAPES', step});
export const setData = (data, dataHeaders) => ({type:'SET_DATA', data, dataHeaders});
export const setSelectedStyle = (style) => ({type:'SET_SELECTED_STYLE', style});
export const setShapeStyle = (style) => ({type:'SET_SHAPE_STYLE', style});
export const addSelectedShape = (uuid, overwriteIfNotPresent) => ({
    type:'ADD_SELECTED_SHAPE', uuid, overwriteIfNotPresent
});
export const selectShapesInOutline = (outline) => ({
    type:'SELECT_SHAPES_IN_OUTLINE', outline
});
export const clearSelectedShapes = () => ({type:'CLEAR_SELECTED_SHAPES'});
export const setShapeModel = () => ({type:'SET_SHAPE_MODEL'});
