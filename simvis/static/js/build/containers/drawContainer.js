'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactColor = require('react-color');

var _reactRedux = require('react-redux');

var _diagram = require('./diagram.jsx');

var _diagram2 = _interopRequireDefault(_diagram);

var _topMenu = require('./topMenu.jsx');

var _topMenu2 = _interopRequireDefault(_topMenu);

var _shapeContextMenu = require('../components/shapeContextMenu');

var _shapeContextMenu2 = _interopRequireDefault(_shapeContextMenu);

var _rightSidebar = require('./rightSidebar.jsx');

var _rightSidebar2 = _interopRequireDefault(_rightSidebar);

var _leftSidebar = require('./leftSidebar.jsx');

var _leftSidebar2 = _interopRequireDefault(_leftSidebar);

var _actions = require('../actions');

var _utility = require('../utility/utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawContainer = function (_Component) {
    _inherits(DrawContainer, _Component);

    function DrawContainer(props) {
        _classCallCheck(this, DrawContainer);

        var _this = _possibleConstructorReturn(this, (DrawContainer.__proto__ || Object.getPrototypeOf(DrawContainer)).call(this, props));

        _this.state = {
            contextMenuActive: false,
            contextMenuStyle: {}
        };

        _this.contextMenuHandler = _this.contextMenuHandler.bind(_this);
        _this.closeContextMenu = _this.closeContextMenu.bind(_this);
        return _this;
    }

    _createClass(DrawContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var scrollWidth = Math.max(0, (document.getElementById("diagram-mat").offsetWidth - document.getElementById("diagram-container").offsetWidth) / 2);
            var container = document.getElementById("diagram-container");
            container.scrollLeft = scrollWidth;
            window.addEventListener('resize', function () {
                return _this2.forceUpdate();
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _this3 = this;

            window.removeEventListener('resize', function () {
                return _this3.forceUpdate();
            });
        }
    }, {
        key: 'contextMenuHandler',
        value: function contextMenuHandler(e) {
            this.setState({
                contextMenuActive: true,
                contextMenuStyle: { position: "absolute", left: e.clientX, top: e.clientY }
            });
        }
    }, {
        key: 'closeContextMenu',
        value: function closeContextMenu() {
            this.setState({
                contextMenuActive: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var padding = 100;
            var scale = this.props.layout.scale / 100;
            var dims = { width: this.props.layout.diagramWidth * scale, height: this.props.layout.diagramHeight * scale };
            var containerWidth = document.getElementById('simvis-container').offsetWidth - this.props.layout.leftSideBarWidth - (this.props.layout.rightSideBarPresent ? this.props.layout.rightSideBarWidth : 0);
            var xOffset = Math.max(padding, (containerWidth - dims.width) / 2);

            var diagramStyle = {
                top: padding,
                left: xOffset,
                width: dims.width,
                height: dims.height
            };

            var matStyle = {
                position: "absolute",
                top: 0,
                left: 0,
                width: dims.width + 2 * padding,
                height: dims.height + 2 * padding
            };

            var b64Grid = (0, _utility.generateB64Grid)(10, scale);

            return _react2.default.createElement(
                'div',
                { className: 'draw-container' },
                _react2.default.createElement(_shapeContextMenu2.default, { contextMenuActive: this.state.contextMenuActive,
                    contextMenuStyle: this.state.contextMenuStyle,
                    close: this.closeContextMenu,
                    reorderShapes: this.props.reorderShapes }),
                _react2.default.createElement(
                    'div',
                    { className: 'draw-container-top' },
                    _react2.default.createElement(_topMenu2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'draw-container-bottom' },
                    _react2.default.createElement(_leftSidebar2.default, null),
                    _react2.default.createElement(_rightSidebar2.default, null),
                    _react2.default.createElement(
                        'div',
                        { className: 'diagram-wrapper', style: { left: this.props.layout.leftSideBarWidth,
                                right: this.props.layout.rightSideBarPresent ? this.props.layout.rightSideBarWidth : 0 } },
                        _react2.default.createElement(
                            'div',
                            { className: 'diagram-container', id: 'diagram-container' },
                            _react2.default.createElement('div', { className: 'diagram-mat', id: 'diagram-mat', style: matStyle }),
                            _react2.default.createElement('div', { className: 'diagram-background', style: _extends({}, diagramStyle, { "backgroundImage": b64Grid }) }),
                            _react2.default.createElement(_diagram2.default, { contextMenuHandler: this.contextMenuHandler, svgStyle: diagramStyle, scale: scale })
                        )
                    )
                )
            );
        }
    }]);

    return DrawContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var shapeCollection = _ref.shapeCollection;
    return {
        layout: shapeCollection.present.layout
    };
};

var mapDispatchToProps = {
    reorderShapes: _actions.reorderShapes
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DrawContainer);