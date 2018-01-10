'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shapeContainer = require('./shapeContainer.jsx');

var _shapeContainer2 = _interopRequireDefault(_shapeContainer);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Diagram = function (_Component) {
    _inherits(Diagram, _Component);

    function Diagram(props) {
        _classCallCheck(this, Diagram);

        var _this = _possibleConstructorReturn(this, (Diagram.__proto__ || Object.getPrototypeOf(Diagram)).call(this, props));

        _this.state = {
            clicked: false,
            dragX: 0,
            dragY: 0,
            dragWidth: 0,
            dragHeight: 0,
            clientX: 0,
            clientY: 0,
            selectOutline: { x: 0, y: 0, width: 0, height: 0 }
        };

        _this.toggle = _this.toggle.bind(_this);
        _this.handleMouseDown = _this.handleMouseDown.bind(_this);
        _this.handleMouseMove = _this.handleMouseMove.bind(_this);
        _this.handleMouseUp = _this.handleMouseUp.bind(_this);
        return _this;
    }

    _createClass(Diagram, [{
        key: 'toggle',
        value: function toggle() {
            this.props.clearSelectedShapes();
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown(e) {
            e.preventDefault();
            var dim = e.target.getBoundingClientRect();
            var x = e.clientX - dim.left - 1;
            var y = e.clientY - dim.top - 1;

            if (!(e.button == 2)) {
                this.setState({
                    clicked: true,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    dragX: x,
                    dragY: y,
                    dragWidth: 0,
                    dragHeight: 0
                });
            }
        }
    }, {
        key: 'handleMouseMove',
        value: function handleMouseMove(e) {
            e.preventDefault();
            e.persist();
            if (this.state.clicked) {
                this.setState(function (prevState, props) {
                    return {
                        dragWidth: e.clientX - prevState.clientX,
                        dragHeight: e.clientY - prevState.clientY
                    };
                });
            }
        }
    }, {
        key: 'handleMouseUp',
        value: function handleMouseUp(e) {
            e.preventDefault();

            if (this.state.dragWidth > 5 || this.state.dragHeight > 5) {
                var selectOutline = {
                    x: this.state.dragWidth < 0 ? this.state.dragX + this.state.dragWidth : this.state.dragX,
                    y: this.state.dragHeight < 0 ? this.state.dragY + this.state.dragHeight : this.state.dragY,
                    width: Math.abs(this.state.dragWidth),
                    height: Math.abs(this.state.dragHeight)
                };

                this.props.selectShapesInOutline(selectOutline);
                this.setState(function (prevState) {
                    return {
                        clicked: false,
                        selectOutline: null
                    };
                });
            } else {
                this.toggle();
                this.setState({
                    clicked: false
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var selectedShapes = this.props.selectedShapes;
            var contextMenuHandler = this.props.contextMenuHandler;
            var selectOutline = this.state.selectOutline;
            var scale = this.props.scale;

            var renderedShapes = this.props.shapes.map(function (shapeData) {
                var toggled = selectedShapes.indexOf(shapeData.uuid) > -1;

                return _react2.default.createElement(_shapeContainer2.default, _extends({ uuid: shapeData.uuid }, shapeData.shape, {
                    toggled: toggled,
                    key: shapeData.uuid,
                    contextMenuHandler: contextMenuHandler,
                    position: shapeData.position,
                    dims: shapeData.dims,
                    deltaDims: shapeData.deltaDims,
                    selectOutline: selectOutline,
                    style: shapeData.style,
                    scale: scale }));
            });

            var selectOutlineRect = null;
            if (this.state.clicked) {
                var outlineX = Math.min(this.state.dragX, this.state.dragX + this.state.dragWidth);
                var outlineY = Math.min(this.state.dragY, this.state.dragY + this.state.dragHeight);
                var rectStyle = { x: outlineX, y: outlineY,
                    height: Math.abs(this.state.dragHeight), width: Math.abs(this.state.dragWidth) };
                selectOutlineRect = _react2.default.createElement('rect', { className: 'select-outline', style: rectStyle });
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'svg',
                    { className: 'diagram', id: 'draw-svg', xmlns: 'http://www.w3.org/2000/svg', style: this.props.svgStyle },
                    _react2.default.createElement('rect', { className: 'diagram-space ignore', onClick: this.toggle,
                        onMouseDown: this.handleMouseDown }),
                    _react2.default.createElement(
                        'g',
                        null,
                        renderedShapes
                    ),
                    selectOutlineRect
                ),
                _react2.default.createElement('div', { className: 'select-layer', style: { visibility: this.state.clicked ? "visible" : "hidden" },
                    onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp,
                    onMouseOut: this.handleMouseUp })
            );
        }
    }]);

    return Diagram;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var shapeCollection = _ref.shapeCollection;
    return {
        shapes: shapeCollection.present.shapes,
        selectedShapes: shapeCollection.present.selectedShapes
    };
};

var mapDispatchToProps = {
    clearSelectedShapes: _actions.clearSelectedShapes,
    selectShapesInOutline: _actions.selectShapesInOutline
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Diagram);