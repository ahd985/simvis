'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactRedux = require('react-redux');

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _shapes = require('../components/shapes.jsx');

var _shapes2 = _interopRequireDefault(_shapes);

var _shapeElements = require('../components/shapeElements.jsx');

var _shapeElements2 = _interopRequireDefault(_shapeElements);

var _index = require('../actions/index.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftSideBarMenu = function (_Component) {
    _inherits(LeftSideBarMenu, _Component);

    function LeftSideBarMenu(props) {
        _classCallCheck(this, LeftSideBarMenu);

        var _this = _possibleConstructorReturn(this, (LeftSideBarMenu.__proto__ || Object.getPrototypeOf(LeftSideBarMenu)).call(this, props));

        _this.resizerWidth = 2;

        _this.handleMove = _this.handleMove.bind(_this);
        return _this;
    }

    _createClass(LeftSideBarMenu, [{
        key: 'handleMove',
        value: function handleMove(e, ui) {
            var width = Math.max(this.props.leftSideBarWidth + ui.deltaX, this.resizerWidth);
            this.props.setLayout("leftSideBarWidth", width);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var numCols = Math.floor((this.props.leftSideBarWidth - this.resizerWidth) / 50);
            var panels = _shapes2.default.map(function (shapeSet) {
                return {
                    title: shapeSet.name,
                    content: _react2.default.createElement(GriddedSubMenu, { shapes: shapeSet.shapes, cols: numCols, addShape: _this2.props.addShape })
                };
            });

            /* TODO - consider re-enabling resizer
            <Draggable onDrag={this.handleMove} axis={"none"}>
                <div className={"left-sidebar-resizer"} style={{width:this.resizerWidth, right:-this.resizerWidth}}></div>
            </Draggable>
            */

            return _react2.default.createElement(
                'div',
                { style: { width: this.props.leftSideBarWidth - this.resizerWidth }, id: 'left-sidebar' },
                _react2.default.createElement(
                    'div',
                    { style: { width: this.props.leftSideBarWidth - this.resizerWidth } },
                    numCols > 0 ? _react2.default.createElement(_semanticUiReact.Accordion, { styled: true, panels: panels, exclusive: false, defaultActiveIndex: 0 }) : null
                ),
                _react2.default.createElement('div', { className: "left-sidebar-resizer", style: { width: this.resizerWidth, right: -this.resizerWidth } })
            );
        }
    }]);

    return LeftSideBarMenu;
}(_react.Component);

var GriddedSubMenu = function (_Component2) {
    _inherits(GriddedSubMenu, _Component2);

    function GriddedSubMenu(props) {
        _classCallCheck(this, GriddedSubMenu);

        var _this3 = _possibleConstructorReturn(this, (GriddedSubMenu.__proto__ || Object.getPrototypeOf(GriddedSubMenu)).call(this, props));

        _this3.getShape = _this3.getShape.bind(_this3);
        return _this3;
    }

    _createClass(GriddedSubMenu, [{
        key: 'getShape',
        value: function getShape(e, shape) {
            this.props.addShape(shape);
        }
    }, {
        key: 'render',
        value: function render() {
            var getShape = this.getShape;
            var leftSideBarWidth = this.props.leftSideBarWidth;

            return _react2.default.createElement(
                _semanticUiReact.Grid,
                { stackable: true, padded: true, textAlign: "center", columns: this.props.cols },
                this.props.shapes.map(function (shape, i) {
                    var viewbox = shape.bbox.x0 - 5 + ' ' + (shape.bbox.y0 - 5) + ' ' + (shape.bbox.w0 + 10) + ' ' + (shape.bbox.h0 + 10);

                    var a = _react2.default.createElement(
                        'a',
                        { id: shape.id, className: 'menu-item', name: shape.name, onClick: function onClick(e) {
                                return getShape(e, shape);
                            } },
                        _react2.default.createElement(
                            'svg',
                            { className: 'menu-icon', width: '40', height: '40', viewBox: viewbox, preserveAspectRatio: 'xMidYMid' },
                            _react2.default.createElement(
                                'g',
                                { className: 'shape-svg-container' },
                                _react2.default.createElement(
                                    'g',
                                    { className: 'shape-svg', style: shape.iconStyle ? shape.iconStyle : null },
                                    _react2.default.createElement(_shapeElements2.default, { elements: shape.elements, objectBBox: shape.bbox })
                                )
                            )
                        )
                    );

                    return _react2.default.createElement(
                        _semanticUiReact.Grid.Column,
                        { key: i, style: { "paddingLeft": 4, "paddingRight": 4 } },
                        _react2.default.createElement(_semanticUiReact.Popup, {
                            trigger: a,
                            content: shape.description ? shape.name + ": " + shape.description : shape.name,
                            position: 'right center',
                            style: { left: leftSideBarWidth }
                        })
                    );
                })
            );
        }
    }]);

    return GriddedSubMenu;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var shapeCollection = _ref.shapeCollection;
    return {
        leftSideBarWidth: shapeCollection.present.layout.leftSideBarWidth
    };
};

var mapDispatchToProps = {
    addShape: _index.addShape,
    setLayout: _index.setLayout
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LeftSideBarMenu);