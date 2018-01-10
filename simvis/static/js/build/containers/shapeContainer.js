'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _semanticUiReact = require('semantic-ui-react');

var _underscore = require('underscore');

var _shapeElements = require('../components/shapeElements');

var _shapeElements2 = _interopRequireDefault(_shapeElements);

var _svgpath = require('svgpath');

var _svgpath2 = _interopRequireDefault(_svgpath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShapeContainer = function (_Component) {
    _inherits(ShapeContainer, _Component);

    function ShapeContainer(props) {
        _classCallCheck(this, ShapeContainer);

        var _this = _possibleConstructorReturn(this, (ShapeContainer.__proto__ || Object.getPrototypeOf(ShapeContainer)).call(this, props));

        _this.path = _this.props.lineOutline ? (0, _svgpath2.default)(_this.props.elements[0].d).abs() : false;

        _this.isClicked = false;
        _this.isDragging = false;
        _this.dragPos = { x: 0, y: 0 };
        _this.lastPos = null;
        _this.doubleClickWIndow = false;

        _this.outlineHandleSize = 5;
        _this.minBound = Math.ceil(_this.outlineHandleSize / 2.0);

        _this.handleDragStart = _this.handleDragStart.bind(_this);
        _this.handleDragStop = _this.handleDragStop.bind(_this);
        _this.handleMove = _this.handleMove.bind(_this);
        _this.handleMove = (0, _underscore.debounce)(_this.handleMove, 3);
        _this.getResizeDims = _this.getResizeDims.bind(_this);
        _this.handleResizeStart = _this.handleResizeStart.bind(_this);
        _this.handleResize = _this.handleResize.bind(_this);
        _this.handleResize = (0, _underscore.debounce)(_this.handleResize, 3);
        _this.handleResizeStop = _this.handleResizeStop.bind(_this);
        _this.handlePathChangeStart = _this.handlePathChangeStart.bind(_this);
        _this.handlePathChange = _this.handlePathChange.bind(_this);
        _this.getChangedPath = _this.getChangedPath.bind(_this);
        _this.handlePathChangeStop = _this.handlePathChangeStop.bind(_this);
        _this.handleContextMenu = _this.handleContextMenu.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleDoubleClick = _this.handleDoubleClick.bind(_this);
        return _this;
    }

    _createClass(ShapeContainer, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (~nextProps.selectedShapes.indexOf(nextProps.uuid) || nextProps.toggled != this.props.toggled) {
                return true;
            }

            return false;
        }
    }, {
        key: 'handleDragStart',
        value: function handleDragStart(e, ui) {
            this.isClicked = true;
            this.dragPos = { x: e.pageX, y: e.pageY };
            this.lastPos = { x: 0, y: 0 };
        }
    }, {
        key: 'handleMove',
        value: function handleMove(e, ui) {
            if (this.isClicked && !(Math.abs(e.pageX - this.dragPos.x) < 4 && Math.abs(e.pageY - this.dragPos.y) < 4)) {
                if (!this.isDragging) {
                    this.props.startMoveShapes();
                    this.isDragging = true;
                }
            }

            if (this.isDragging) {
                var scale = this.props.scale;
                var deltaX = ui.x - this.lastPos.x;
                var deltaY = ui.y - this.lastPos.y;
                if (this.props.selectedShapes.indexOf(this.props.uuid) == -1) {
                    this.props.addSelectedShape(this.props.uuid, true);
                }
                this.props.moveShapes({ x: deltaX / scale, y: deltaY / scale });
                this.lastPos = { x: ui.x, y: ui.y };
            }
        }
    }, {
        key: 'handleDragStop',
        value: function handleDragStop(e, ui) {
            if (this.isDragging) {
                var scale = this.props.scale;
                var deltaX = ui.x - this.lastPos.x;
                var deltaY = ui.y - this.lastPos.y;
                this.props.moveShapes({ x: deltaX / scale, y: deltaY / scale });
                this.lastPos = null;
            } else {
                this.props.addSelectedShape(this.props.uuid, !e.shiftKey);
            }

            this.isClicked = false;
            this.isDragging = false;
        }
    }, {
        key: 'getResizeDims',
        value: function getResizeDims(deltaX, deltaY, scale, dir) {
            var dW = 0,
                dH = 0,
                dX = 0,
                dY = 0;
            if (dir.indexOf('t') > -1) {
                dY = deltaY;
                dH = -deltaY;
            }
            if (dir.indexOf('b') > -1) {
                dH = deltaY;
            }
            if (dir.indexOf('l') > -1) {
                dX = deltaX;
                dW = -deltaX;
            }
            if (dir.indexOf('r') > -1) {
                dW = deltaX;
            }

            return { width: dW / scale, height: dH / scale, x: dX / scale, y: dY / scale };
        }
    }, {
        key: 'handleResizeStart',
        value: function handleResizeStart(e, ui) {
            this.lastPos = { x: 0, y: 0 };
        }
    }, {
        key: 'handleResize',
        value: function handleResize(e, ui, dir) {
            var scale = this.props.scale;
            var deltaX = ui.x - this.lastPos.x;
            var deltaY = ui.y - this.lastPos.y;
            this.props.resizeShapes(this.getResizeDims(deltaX, deltaY, scale, dir));
            this.lastPos = { x: ui.x, y: ui.y };
        }
    }, {
        key: 'handleResizeStop',
        value: function handleResizeStop(e, ui, dir) {
            var scale = this.props.scale;
            var deltaX = ui.x - this.lastPos.x;
            var deltaY = ui.y - this.lastPos.y;
            this.props.resizeShapes(this.getResizeDims(deltaX, deltaY, scale, dir), true);
            this.lastPos = null;
        }
    }, {
        key: 'handlePathChangeStart',
        value: function handlePathChangeStart(e, ui, i) {
            this.lastPos = { x: 0, y: 0 };
        }
    }, {
        key: 'getChangedPath',
        value: function getChangedPath(dX, dY, i) {
            var scale = this.props.scale;
            var newPath = (0, _svgpath2.default)(this.path.toString());
            var segment = newPath.segments[i];

            if (segment[0] == 'V' && this.props.moveY != false) {
                segment[1] += dY / scale;
            } else if (segment[0] == 'H' && this.props.moveX != false) {
                segment[2] += dX / scale;
            } else {
                if (this.props.moveX != false) {
                    segment[segment.length - 2] += dX / scale;
                }
                if (this.props.moveY != false) {
                    segment[segment.length - 1] += dY / scale;
                }
            }

            newPath.segments[i] = segment;

            this.path = newPath;

            return newPath.toString();
        }
    }, {
        key: 'handlePathChange',
        value: function handlePathChange(e, ui, i) {
            var scale = this.props.scale;
            var deltaX = ui.x - this.lastPos.x;
            var deltaY = ui.y - this.lastPos.y;
            this.props.changePath(this.getChangedPath(deltaX, deltaY, i), this.props.uuid);
            this.lastPos = { x: ui.x, y: ui.y };

            // kludge to force update
            this.forceUpdate();
        }
    }, {
        key: 'handlePathChangeStop',
        value: function handlePathChangeStop(e, ui, i) {
            var scale = this.props.scale;
            var deltaX = ui.x - this.lastPos.x;
            var deltaY = ui.y - this.lastPos.y;
            this.props.changePath(this.getChangedPath(deltaX, deltaY, i), this.props.uuid);
            this.lastPos = null;

            // kludge to force update
            this.forceUpdate();
        }
    }, {
        key: 'handleContextMenu',
        value: function handleContextMenu(e) {
            e.preventDefault();
            this.props.contextMenuHandler(e, this.props.uuid);
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var _this2 = this;

            this.doubleClickWindow = true;
            setTimeout(function () {
                _this2.doubleClickWindow = false;
            }, 100);
        }
    }, {
        key: 'handleDoubleClick',
        value: function handleDoubleClick(e) {
            if (this.doubleClickWindow) {
                this.props.clearSelectedShapes();
                this.props.addSelectedShape(this.props.uuid, false);
                this.props.toggleEdit(true);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var minX = this.props.minX ? this.props.minX : 25;
            var minY = this.props.minY ? this.props.minY : 25;
            var scale = this.props.scale;
            var height = this.props.dims.height;
            var width = this.props.dims.width;
            var dH = Math.max(this.props.deltaDims.height, -height + minY);
            var dW = Math.max(this.props.deltaDims.width, -width + minX);

            var visibility_style = { "visibility": this.props.toggled ? "visible" : "hidden" };
            var translate = 'translate(' + this.props.position.x * scale + ', ' + this.props.position.y * scale + ')';
            var dObject = { dX: dW, dY: dH, scale: scale };

            var position = { x: 0, y: 0 };

            var editActive = this.props.editActive && this.props.toggled;

            var outline = void 0;
            if (this.props.lineOutline) {
                (function () {
                    // Get points of path
                    var posX = void 0,
                        posY = void 0;

                    var points = _this3.path.segments.map(function (s, i) {
                        if (i == 0) {
                            posX = s[1];
                            posY = s[2];
                        } else if (s[0] != 'Z') {
                            if (s[0] == 'V') {
                                posY = s[1];
                            } else if (s[0] == 'H') {
                                posX = s[1];
                            } else {
                                posX = s[s.length - 2];
                                posY = s[s.length - 1];
                            }
                        }

                        return [posX, posY];
                    });

                    var outlinePath = (0, _svgpath2.default)(_this3.path.toString()).scale(scale).toString();

                    outline = _react2.default.createElement(
                        'g',
                        { style: visibility_style, className: 'ignore' },
                        _react2.default.createElement('path', { d: outlinePath, className: 'line-outline' }),
                        points.map(function (p, i) {
                            return _react2.default.createElement(
                                _reactDraggable2.default,
                                { onStart: function onStart(e, ui) {
                                        return _this3.handlePathChangeStart(e, ui, i);
                                    }, onDrag: function onDrag(e, ui) {
                                        return _this3.handlePathChange(e, ui, i);
                                    },
                                    onStop: function onStop(e, ui) {
                                        return _this3.handlePathChangeStop(e, ui, i);
                                    }, position: { x: 0, y: 0 }, axis: "none", key: i },
                                _react2.default.createElement(
                                    'g',
                                    null,
                                    _react2.default.createElement('circle', { cx: p[0] * scale, cy: p[1] * scale, r: _this3.outlineHandleSize,
                                        className: 'resizer-circle' })
                                )
                            );
                        })
                    );
                })();
            } else {
                outline = _react2.default.createElement(
                    'g',
                    { style: visibility_style, className: 'ignore' },
                    _react2.default.createElement('rect', { x: '0', y: '0', height: (height + dH) * scale, width: (width + dW) * scale, className: 'shape-outline' }),
                    ['tl', 't', 'tr', 'r', 'br', 'b', 'bl', 'l'].map(function (dir, i) {
                        var cx = (width + dW) * scale / 2;
                        var cy = (height + dH) * scale / 2;
                        if (dir.indexOf('t') > -1) {
                            cy = 0;
                        };
                        if (dir.indexOf('b') > -1) {
                            cy = (height + dH) * scale;
                        };
                        if (dir.indexOf('l') > -1) {
                            cx = 0;
                        };
                        if (dir.indexOf('r') > -1) {
                            cx = (width + dW) * scale;
                        };

                        return _react2.default.createElement(
                            _reactDraggable2.default,
                            { onStart: _this3.handleResizeStart, onDrag: function onDrag(e, ui) {
                                    return _this3.handleResize(e, ui, dir);
                                }, onStop: function onStop(e, ui) {
                                    return _this3.handleResizeStop(e, ui, dir);
                                }, position: { x: 0, y: 0 }, axis: "none", key: i },
                            _react2.default.createElement(
                                'g',
                                null,
                                _react2.default.createElement('circle', { cx: cx, cy: cy, r: _this3.outlineHandleSize,
                                    className: 'resizer-circle' })
                            )
                        );
                    })
                );
            }

            // TODO - fix crappy implementation of drag
            return _react2.default.createElement(
                'g',
                { transform: translate },
                _react2.default.createElement(
                    _reactDraggable2.default,
                    { onStart: this.handleDragStart, onDrag: this.handleMove, onStop: this.handleDragStop, position: position, axis: "none" },
                    _react2.default.createElement(
                        'g',
                        { className: 'shape-container', onContextMenu: this.handleContextMenu, id: this.props.uuid, style: _extends({}, this.props.style, { 'pointerEvents': "all" }), onClick: this.handleClick, onDoubleClick: this.handleDoubleClick },
                        _react2.default.createElement(_shapeElements2.default, { elements: this.props.elements, objectBBox: this.props.bbox, dObject: dObject, editActive: editActive })
                    )
                ),
                outline
            );
        }
    }]);

    return ShapeContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var shapeCollection = _ref.shapeCollection;
    return {
        selectedShapes: shapeCollection.present.selectedShapes,
        editActive: shapeCollection.present.editActive,
        layout: shapeCollection.present.layout
    };
};

var mapDispatchToProps = {
    addSelectedShape: _actions.addSelectedShape,
    clearSelectedShapes: _actions.clearSelectedShapes,
    moveShapes: _actions.moveShapes,
    startMoveShapes: _actions.startMoveShapes,
    resizeShapes: _actions.resizeShapes,
    toggleEdit: _actions.toggleEdit,
    changePath: _actions.changePath
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ShapeContainer);