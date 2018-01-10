'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactColor = require('react-color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPickerModal = function (_Component) {
    _inherits(ColorPickerModal, _Component);

    function ColorPickerModal(props) {
        _classCallCheck(this, ColorPickerModal);

        var _this = _possibleConstructorReturn(this, (ColorPickerModal.__proto__ || Object.getPrototypeOf(ColorPickerModal)).call(this, props));

        _this.state = {
            open: false,
            color: _this.props.color
        };

        _this.handleOpen = _this.handleOpen.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        _this.handleChangeComplete = _this.handleChangeComplete.bind(_this);
        return _this;
    }

    _createClass(ColorPickerModal, [{
        key: 'handleOpen',
        value: function handleOpen() {
            this.setState({ open: true });
        }
    }, {
        key: 'handleClose',
        value: function handleClose(canceled) {
            if (!canceled) {
                var style = {};
                style[this.props.attr] = this.state.color.hex;
                this.props.setShapeStyle(style);
            }

            this.setState({ open: false });
        }
    }, {
        key: 'handleChangeComplete',
        value: function handleChangeComplete(color) {
            this.setState({ color: color });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _semanticUiReact.Modal,
                { basic: true, trigger: _react2.default.createElement(
                        _semanticUiReact.Button,
                        { className: 'color-picker-btn', onClick: this.handleOpen },
                        this.props.desc,
                        _react2.default.createElement('span', { className: 'color-picker-icon', style: { background: this.props.color } })
                    ), open: this.state.open },
                _react2.default.createElement(
                    _semanticUiReact.Modal.Content,
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-sketch-picker' },
                        _react2.default.createElement(_reactColor.SketchPicker, { color: this.state.color, onChangeComplete: this.handleChangeComplete })
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Modal.Actions,
                    { style: { textAlign: "center" } },
                    _react2.default.createElement(
                        _semanticUiReact.Button,
                        { basic: true, color: 'red', inverted: true, onClick: function onClick() {
                                return _this2.handleClose(true);
                            } },
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'remove' }),
                        ' Cancel'
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Button,
                        { color: 'green', inverted: true, onClick: function onClick() {
                                return _this2.handleClose();
                            } },
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'checkmark' }),
                        ' OK'
                    )
                )
            );
        }
    }]);

    return ColorPickerModal;
}(_react.Component);

exports.default = ColorPickerModal;