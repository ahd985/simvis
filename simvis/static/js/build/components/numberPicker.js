"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.INCREASE_VALUE = exports.DECREASE_VALUE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _semanticUiReact = require("semantic-ui-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DECREASE_VALUE = exports.DECREASE_VALUE = 'DECREASE_VALUE';
var INCREASE_VALUE = exports.INCREASE_VALUE = 'INCREASE_VALUE';

var NumberPicker = _react2.default.createClass({
    displayName: "NumberPicker",

    getDefaultProps: function getDefaultProps() {
        return {
            placeholder: "Enter a number",
            /*
             Limiting min, max value to 1e10 to prevent javascript to switch into scientific notation
             */
            min: 1e10 * -1,
            max: 1e10,
            maxLength: 10,
            step: 1,
            required: false,
            basic: false,
            circular: false,
            compact: false
        };
    },
    propTypes: {
        name: _react2.default.PropTypes.string.isRequired,
        value: _react2.default.PropTypes.any.isRequired,
        onChange: _react2.default.PropTypes.func.isRequired,
        placeholder: _react2.default.PropTypes.string,
        min: _react2.default.PropTypes.number,
        max: _react2.default.PropTypes.number,
        step: _react2.default.PropTypes.number,
        maxLength: _react2.default.PropTypes.number,
        required: _react2.default.PropTypes.bool,
        basic: _react2.default.PropTypes.bool,
        circular: _react2.default.PropTypes.bool,
        compact: _react2.default.PropTypes.bool
    },
    getInitialState: function getInitialState() {
        return {
            touched: false,
            buffer: {}
        };
    },
    handleAction: function handleAction(event, v) {
        var actionFilter = event.currentTarget.name;
        var currentValue = event.currentTarget.value.replace(",", ".");

        var setVal = _lodash2.default.isFinite(parseFloat(this.props.value)) ? parseFloat(this.props.value) : null;
        var stepSize = _lodash2.default.isFinite(parseFloat(this.props.step)) ? parseFloat(this.props.step) : 1;
        switch (actionFilter) {
            case DECREASE_VALUE:
                if (this.props.value - stepSize >= this.props.min) setVal -= stepSize;else setVal = this.props.min;

                break;
            case INCREASE_VALUE:
                if (setVal + stepSize <= this.props.max) setVal += stepSize;else setVal = this.props.max;

                break;
            case this.props.name:
                var parsedVal = parseFloat(currentValue);
                if (currentValue === "-") this.state.buffer = "-";

                if (parsedVal > this.props.max || parsedVal < this.props.min) console.log("Warning: min/max values exceeded");else setVal = currentValue;

                break;
        }

        var lastChar = ("" + setVal).charAt(setVal.length - 1) || "";
        var returnValue = setVal;
        var precision = 1000;
        if (_lodash2.default.isFinite(parseFloat(setVal))) returnValue = Math.floor(parseFloat(setVal) * precision) / precision;

        if (setVal === "" || setVal === "-" || lastChar === "." || lastChar === ",") returnValue = setVal;

        setTimeout(this.props.onChange, 1, { name: this.props.name, value: returnValue });
    },
    validateInput: function validateInput(event, v) {
        var actionFilter = event.target.name;
        var currentValue = event.target.value;

        var setVal = this.props.value;
        switch (actionFilter) {
            case this.props.name:
                var parsedVal = parseFloat(currentValue);
                setVal = _lodash2.default.isFinite(parsedVal) ? parsedVal : null;

                if (parsedVal > this.props.max) setVal = this.props.max;
                break;

            case DECREASE_VALUE:
            case INCREASE_VALUE:
            default:
                break;
        }
    },
    style: {
        default: {
            input: {
                borderRadius: "0px",
                textAlign: "right"
            },
            buttonLeft: {
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                margin: "0px"
            },
            buttonRight: {
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px"
            }
        },
        circular: {
            input: {
                textAlign: "right"
            },
            buttonLeft: {
                marginRight: "3.5px"
            },
            buttonRight: {
                marginLeft: "3.5px"
            }
        }

    },
    render: function render() {
        var style = this.props.circular ? this.style.circular : this.style.default;
        var display = { circular: this.props.circular, basic: this.props.basic, compact: this.props.compact };
        return _react2.default.createElement(
            _semanticUiReact.Input,
            null,
            _react2.default.createElement(_semanticUiReact.Button, _extends({}, display, { type: "button", icon: "minus", onClick: this.handleAction, name: DECREASE_VALUE,
                style: style.buttonLeft, disabled: this.props.value <= this.props.min })),
            _react2.default.createElement("input", { type: "text", name: this.props.name, min: this.props.min, max: this.props.max,
                step: this.props.step,
                maxLength: this.props.maxLength, placeholder: this.props.placeholder, required: this.props.required,
                value: this.props.value,
                onChange: this.handleAction, onBlur: this.validateInput, style: style.input }),
            _react2.default.createElement(_semanticUiReact.Button, _extends({}, display, { type: "button", icon: "plus", onClick: this.handleAction, name: INCREASE_VALUE,
                style: style.buttonRight, disabled: this.props.value >= this.props.max }))
        );
    }
});

exports.default = NumberPicker;