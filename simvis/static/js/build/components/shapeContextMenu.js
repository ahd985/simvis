'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShapeContextMenu = function (_Component) {
    _inherits(ShapeContextMenu, _Component);

    function ShapeContextMenu(props) {
        _classCallCheck(this, ShapeContextMenu);

        var _this = _possibleConstructorReturn(this, (ShapeContextMenu.__proto__ || Object.getPrototypeOf(ShapeContextMenu)).call(this, props));

        _this.moveForwards = _this.moveForwards.bind(_this);
        _this.moveBackwards = _this.moveBackwards.bind(_this);
        _this.moveToFront = _this.moveToFront.bind(_this);
        _this.moveToBack = _this.moveToBack.bind(_this);
        return _this;
    }

    _createClass(ShapeContextMenu, [{
        key: 'moveForwards',
        value: function moveForwards() {
            this.props.reorderShapes(1);
            this.props.close();
        }
    }, {
        key: 'moveBackwards',
        value: function moveBackwards() {
            this.props.reorderShapes(-1);
            this.props.close();
        }
    }, {
        key: 'moveToFront',
        value: function moveToFront() {
            this.props.reorderShapes("F");
            this.props.close();
        }
    }, {
        key: 'moveToBack',
        value: function moveToBack() {
            this.props.reorderShapes("B");
            this.props.close();
        }
    }, {
        key: 'render',
        value: function render() {
            var menu = _react2.default.createElement(
                _semanticUiReact.Menu,
                { secondary: true, vertical: true },
                _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'moveForwards', onClick: this.moveForwards }),
                _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'moveBackwards', onClick: this.moveBackwards }),
                _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'moveToFront', onClick: this.moveToFront }),
                _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'moveToBack', onClick: this.moveToBack })
            );

            return _react2.default.createElement(_semanticUiReact.Popup, { open: this.props.contextMenuActive, content: menu,
                style: this.props.contextMenuStyle, basic: true, on: 'click',
                onClose: this.props.close });
        }
    }]);

    return ShapeContextMenu;
}(_react.Component);

exports.default = ShapeContextMenu;