'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactColor = require('react-color');

var _numberPicker = require('./numberPicker.jsx');

var _numberPicker2 = _interopRequireDefault(_numberPicker);

var _chromaJs = require('chroma-js');

var _chromaJs2 = _interopRequireDefault(_chromaJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataForm = function (_Component) {
    _inherits(DataForm, _Component);

    function DataForm(props) {
        _classCallCheck(this, DataForm);

        var _this = _possibleConstructorReturn(this, (DataForm.__proto__ || Object.getPrototypeOf(DataForm)).call(this, props));

        _this.state = {
            dataIndex: null
        };

        _this.handleSelectData = _this.handleSelectData.bind(_this);
        return _this;
    }

    _createClass(DataForm, [{
        key: 'handleSelectData',
        value: function handleSelectData(e, f) {
            this.setState(function (prevState) {
                return {
                    dataIndex: f.value
                };
            });

            this.props.onChange(e, f, 'dataIndex');
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _semanticUiReact.Form.Field,
                null,
                _react2.default.createElement(
                    'label',
                    null,
                    'Data'
                ),
                _react2.default.createElement(_semanticUiReact.Dropdown, { placeholder: 'Select Data', search: true, selection: true, options: this.props.dataHeaderOptions,
                    value: this.state.dataIndex ? this.state.dataIndex : '', onChange: this.handleSelectData })
            );
        }
    }]);

    return DataForm;
}(_react.Component);

var DescriptionForm = function (_Component2) {
    _inherits(DescriptionForm, _Component2);

    function DescriptionForm(props) {
        _classCallCheck(this, DescriptionForm);

        return _possibleConstructorReturn(this, (DescriptionForm.__proto__ || Object.getPrototypeOf(DescriptionForm)).call(this, props));
    }

    _createClass(DescriptionForm, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_semanticUiReact.Form.Input, { value: this.props.valueMap.description ? this.props.valueMap.description : '', label: 'Description', name: 'description', type: 'text', placeholder: '', onChange: this.props.onChange });
        }
    }]);

    return DescriptionForm;
}(_react.Component);

var UnitForm = function (_Component3) {
    _inherits(UnitForm, _Component3);

    function UnitForm(props) {
        _classCallCheck(this, UnitForm);

        return _possibleConstructorReturn(this, (UnitForm.__proto__ || Object.getPrototypeOf(UnitForm)).call(this, props));
    }

    _createClass(UnitForm, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_semanticUiReact.Form.Input, { value: this.props.valueMap.unit ? this.props.valueMap.unit : '', label: 'Unit', name: 'unit', type: 'text', placeholder: '', onChange: this.props.onChange });
        }
    }]);

    return UnitForm;
}(_react.Component);

var OpacityForm = function (_Component4) {
    _inherits(OpacityForm, _Component4);

    function OpacityForm(props) {
        _classCallCheck(this, OpacityForm);

        var _this4 = _possibleConstructorReturn(this, (OpacityForm.__proto__ || Object.getPrototypeOf(OpacityForm)).call(this, props));

        _this4.default = 1;
        _this4.handleChange = _this4.handleChange.bind(_this4);
        return _this4;
    }

    _createClass(OpacityForm, [{
        key: 'handleChange',
        value: function handleChange(e, f) {
            // Cast as float
            this.props.onChange(e, { value: parseFloat(f.value) });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_semanticUiReact.Form.Input, { value: this.props.valueMap.opacity ? this.props.valueMap.opacity : this.default, label: 'Opacity', name: 'opacity', placeholder: '1', min: '0', max: '1', type: 'number', step: '0.01', onChange: this.handleChange });
        }
    }]);

    return OpacityForm;
}(_react.Component);

var ReportForm = function (_Component5) {
    _inherits(ReportForm, _Component5);

    function ReportForm(props) {
        _classCallCheck(this, ReportForm);

        var _this5 = _possibleConstructorReturn(this, (ReportForm.__proto__ || Object.getPrototypeOf(ReportForm)).call(this, props));

        _this5.state = {
            value: false
        };

        _this5.handleChange = _this5.handleChange.bind(_this5);
        return _this5;
    }

    _createClass(ReportForm, [{
        key: 'handleChange',
        value: function handleChange(e, f) {
            var value = !this.state.value;
            this.setState({ value: value });

            this.props.onChange(e, f);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _semanticUiReact.Form.Field,
                null,
                _react2.default.createElement(
                    'div',
                    { style: { position: "relative", top: "50%", left: "30%" } },
                    _react2.default.createElement(_semanticUiReact.Radio, { label: 'Report Values', toggle: true, onChange: this.handleChange, checked: this.state.value })
                )
            );
        }
    }]);

    return ReportForm;
}(_react.Component);

var TrueColorForm = function (_Component6) {
    _inherits(TrueColorForm, _Component6);

    function TrueColorForm(props) {
        _classCallCheck(this, TrueColorForm);

        return _possibleConstructorReturn(this, (TrueColorForm.__proto__ || Object.getPrototypeOf(TrueColorForm)).call(this, props));
    }

    _createClass(TrueColorForm, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_semanticUiReact.Form.Input, { value: this.props.valueMap.true_color ? this.props.valueMap.true_color : "", label: 'True Color', name: 'trueColor', placeholder: '', onChange: this.props.onChange });
        }
    }]);

    return TrueColorForm;
}(_react.Component);

var FalseColorForm = function (_Component7) {
    _inherits(FalseColorForm, _Component7);

    function FalseColorForm(props) {
        _classCallCheck(this, FalseColorForm);

        return _possibleConstructorReturn(this, (FalseColorForm.__proto__ || Object.getPrototypeOf(FalseColorForm)).call(this, props));
    }

    _createClass(FalseColorForm, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_semanticUiReact.Form.Input, { value: this.props.valueMap.false_color ? this.props.valueMap.false_color : "", label: 'False Color', name: 'falseColor', placeholder: '', onChange: this.props.onChange });
        }
    }]);

    return FalseColorForm;
}(_react.Component);

var LevelForm = function (_Component8) {
    _inherits(LevelForm, _Component8);

    function LevelForm(props) {
        _classCallCheck(this, LevelForm);

        var _this8 = _possibleConstructorReturn(this, (LevelForm.__proto__ || Object.getPrototypeOf(LevelForm)).call(this, props));

        _this8.initialState = {
            open: false,
            min_height: 0,
            max_height: 1,
            invalidFields: {}
        };

        _this8.state = Object.assign({}, _this8.initialState);

        _this8.handleOpen = _this8.handleOpen.bind(_this8);
        _this8.handleSelectData = _this8.handleSelectData.bind(_this8);
        _this8.handleSelectDataSpan = _this8.handleSelectDataSpan.bind(_this8);
        _this8.handleBoundsChange = _this8.handleBoundsChange.bind(_this8);
        _this8.calculateBounds = _this8.calculateBounds.bind(_this8);
        _this8.handleClose = _this8.handleClose.bind(_this8);
        _this8.getInvalidFields = _this8.getInvalidFields.bind(_this8);
        return _this8;
    }

    _createClass(LevelForm, [{
        key: 'handleOpen',
        value: function handleOpen(valueMap) {
            var state = {
                open: true,
                levelDataIndex: null,
                min_height: 0,
                max_height: 1,
                dataManipulated: false
            };

            if (valueMap.levelDataIndex || valueMap.levelDataIndex === 0) {
                state.levelDataIndex = valueMap.levelDataIndex;
                state.min_height = valueMap.min_height;
                state.max_height = valueMap.max_height;
                state.dataManipulated = true;
            }

            if (valueMap.levelDataSpan) {
                state.levelDataSpan = valueMap.levelDataSpan;
            }

            this.setState(state);
        }
    }, {
        key: 'handleSelectData',
        value: function handleSelectData(e, f) {
            var _this9 = this;

            this.setState(function (prevState) {
                var state = { levelDataIndex: f.value };

                if (!prevState.dataManipulated) {
                    var levelDataSpan = Math.min(prevState.levelDataSpan & prevState.levelDataSpan != 0 ? prevState.levelDataSpan : 1, _this9.props.data[0].length - f.value);
                    var heightDataBounds = _this9.calculateBounds(f.value, levelDataSpan);

                    state.min_height = heightDataBounds[0];
                    state.max_height = heightDataBounds[1];
                    state.levelDataSpan = levelDataSpan;
                }

                return state;
            });
        }
    }, {
        key: 'handleSelectDataSpan',
        value: function handleSelectDataSpan(e) {
            var _this10 = this;

            this.setState(function (prevState) {
                var state = { levelDataSpan: Math.min(e.value, _this10.props.data[0].length - prevState.levelDataIndex) };

                if (!prevState.dataManipulated) {
                    var heightDataBounds = _this10.calculateBounds(prevState.levelDataIndex, state.levelDataSpan);
                    state.min_height = heightDataBounds[0];
                    state.max_height = heightDataBounds[1];
                }

                return state;
            });
        }
    }, {
        key: 'handleBoundsChange',
        value: function handleBoundsChange(e, f, name) {
            this.setState(_defineProperty({}, name, f.value));
        }
    }, {
        key: 'handleClose',
        value: function handleClose(canceled) {
            var state = _extends({}, this.initialState);

            if (!canceled) {
                var invalidFields = this.getInvalidFields();

                if (invalidFields) {
                    this.setState({ invalidFields: invalidFields });
                    return;
                }

                var changedProps = {
                    min_height: this.state.min_height,
                    max_height: this.state.max_height,
                    levelDataIndex: this.state.levelDataIndex
                };

                if (this.state.levelDataSpan) {
                    changedProps.levelDataSpan = this.state.levelDataSpan;
                }

                this.props.onChange({}, changedProps, true);
                state.open = false;
            }

            this.setState(state);
        }
    }, {
        key: 'calculateBounds',
        value: function calculateBounds(levelDataIndex, levelDataSpan) {
            var _this11 = this;

            var data = [];
            if (this.props.validators.level_data.maxDims > 1) {
                var _loop = function _loop(j) {
                    data = data.concat(_this11.props.data.map(function (e) {
                        return e[levelDataIndex + j];
                    }));
                };

                for (var j = 0; j < levelDataSpan; j++) {
                    _loop(j);
                }
            } else {
                data = this.props.data.map(function (e) {
                    return e[levelDataIndex];
                });
            }

            return [Math.min.apply(Math, _toConsumableArray(data)), Math.max.apply(Math, _toConsumableArray(data))];
        }
    }, {
        key: 'getInvalidFields',
        value: function getInvalidFields() {
            var invalidFields = {};

            // Make sure data options are not blank
            if (!(this.state.levelDataIndex || this.state.levelDataIndex === 0)) {
                invalidFields.levelDataIndex = true;
            }

            if (this.props.validators.level_data.maxDims > 1) {
                if (!this.state.levelDataSpan) {
                    invalidFields.levelDataSpan = true;
                }
            }

            // Make sure bounds are valid
            if (!(this.state.min_height || this.state.min_height === 0)) {
                invalidFields.min_height = true;
            }

            if (!(this.state.max_height || this.state.max_height === 0)) {
                invalidFields.max_height = true;
            }

            if (Object.keys(invalidFields).length === 0) {
                return false;
            }

            return invalidFields;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this12 = this;

            // Determine if we are using a single or multiple dimensions
            var dims = 1;
            if (this.props.validators.level_data.maxDims > 1) {
                dims = 2;
            }

            var valueMap = this.props.valueMap;
            var externalSummary = LevelForm.summarize(valueMap, this.props.data, this.props.dataHeaderOptions, true);
            var internalSummary = LevelForm.summarize(this.state, this.props.data, this.props.dataHeaderOptions, this.state.dataManipulated);

            var invalidFields = this.state.invalidFields;

            return _react2.default.createElement(
                _semanticUiReact.Modal,
                { trigger: _react2.default.createElement(_semanticUiReact.Button, { content: "Level Data", style: { height: 70, width: "100%", textAlign: "center" }, label: { as: 'a', basic: true, pointing: 'left', content: externalSummary.dataSummary }, className: 'level-btn', onClick: function onClick() {
                            return _this12.handleOpen(valueMap);
                        } }), open: this.state.open },
                _react2.default.createElement(
                    _semanticUiReact.Modal.Content,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Form,
                        { onSubmit: function onSubmit(e) {
                                e.preventDefault();
                            } },
                        _react2.default.createElement(
                            _semanticUiReact.Form.Group,
                            { widths: '2' },
                            _react2.default.createElement(
                                _semanticUiReact.Form.Field,
                                null,
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    dims == 1 ? "Data Column" : "Data Column Start"
                                ),
                                _react2.default.createElement(_semanticUiReact.Dropdown, { error: invalidFields.levelDataIndex, placeholder: 'Select Data', search: true, selection: true, options: this.props.dataHeaderOptions,
                                    value: this.state.levelDataIndex || this.state.levelDataIndex === 0 ? this.state.levelDataIndex : '', onChange: function onChange(e, f) {
                                        return _this12.handleSelectData(e, f);
                                    } })
                            ),
                            _react2.default.createElement(_semanticUiReact.Form.Input, { label: '\xA0', placeholder: internalSummary.levelRange, readOnly: true })
                        ),
                        dims == 2 ? _react2.default.createElement(
                            _semanticUiReact.Form.Group,
                            { widths: '2' },
                            _react2.default.createElement(_semanticUiReact.Form.Field, { error: invalidFields.levelDataSpan, label: 'Data Column Span', name: 'dataSpan', control: _numberPicker2.default, disabled: this.state.levelDataIndex || this.state.levelDataIndex === 0 ? false : true, min: 1, value: this.state.levelDataSpan ? this.state.levelDataSpan : '1', onChange: this.handleSelectDataSpan }),
                            _react2.default.createElement(_semanticUiReact.Form.Input, { label: '\xA0', placeholder: internalSummary.spanSummary, readOnly: true })
                        ) : null,
                        _react2.default.createElement(
                            _semanticUiReact.Form.Group,
                            { widths: 'equal' },
                            _react2.default.createElement(_semanticUiReact.Form.Input, { error: invalidFields.min_height, label: 'Lower Bound', name: 'minHeight', value: this.state.min_height, type: "number", onChange: function onChange(e, f) {
                                    return _this12.handleBoundsChange(e, f, 'min_height');
                                } }),
                            _react2.default.createElement(_semanticUiReact.Form.Input, { error: invalidFields.max_height, label: 'Upper Bound', name: 'maxHeight', value: this.state.max_height, type: "number", onChange: function onChange(e, f) {
                                    return _this12.handleBoundsChange(e, f, 'max_height');
                                } })
                        )
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Modal.Actions,
                    null,
                    _react2.default.createElement(_semanticUiReact.Button, { content: 'Cancel', onClick: function onClick() {
                            return _this12.handleClose(true);
                        } }),
                    _react2.default.createElement(_semanticUiReact.Button, { content: 'Done', onClick: function onClick() {
                            return _this12.handleClose(false);
                        } })
                )
            );
        }
    }], [{
        key: 'summarize',
        value: function summarize(condition, allData, dataHeaders, useRangeForBounds) {
            var summary = {};
            var spanSummary = '';
            var dataSummary = '';
            var levelRange = '';

            if (condition.levelDataIndex || condition.levelDataIndex === 0) {
                var data = [];
                if (condition.levelDataSpan) {
                    var _loop2 = function _loop2(j) {
                        data = data.concat(allData.map(function (e) {
                            return e[condition.levelDataIndex + j];
                        }));
                    };

                    for (var j = 0; j < condition.levelDataSpan; j++) {
                        _loop2(j);
                    }
                } else {
                    data = allData.map(function (e) {
                        return e[condition.levelDataIndex];
                    });
                }

                var minVal = Math.min.apply(Math, _toConsumableArray(data));
                var maxVal = Math.max.apply(Math, _toConsumableArray(data));
                levelRange = 'Range: ' + minVal + " - " + maxVal;
                var levelDataName = dataHeaders[condition.levelDataIndex].text;

                var span = condition.levelDataSpan ? condition.levelDataSpan : 1;
                spanSummary = levelDataName + "..." + dataHeaders[condition.levelDataIndex + span - 1].text;

                var boundsSummary = useRangeForBounds ? minVal + " - " + maxVal : condition.min_height + " - " + condition.max_height;

                dataSummary = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        null,
                        condition.levelDataSpan ? spanSummary : levelDataName
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'minor-text' },
                        "(" + levelRange + ")"
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'minor-text' },
                        "Bounds: " + boundsSummary
                    )
                );
            }

            return { levelRange: levelRange, dataSummary: dataSummary, spanSummary: spanSummary };
        }
    }]);

    return LevelForm;
}(_react.Component);

var ColorDataForm = function (_Component9) {
    _inherits(ColorDataForm, _Component9);

    function ColorDataForm(props) {
        var _this13$state;

        _classCallCheck(this, ColorDataForm);

        var _this13 = _possibleConstructorReturn(this, (ColorDataForm.__proto__ || Object.getPrototypeOf(ColorDataForm)).call(this, props));

        _this13.state = (_this13$state = {
            open: false,
            colorSteps: 5,
            minColorValue: 0,
            maxColorValue: 1
        }, _defineProperty(_this13$state, 'colorSteps', 5), _defineProperty(_this13$state, 'color_scale', null), _this13$state);

        _this13.handleOpen = _this13.handleOpen.bind(_this13);
        _this13.handleStepChange = _this13.handleStepChange.bind(_this13);
        _this13.handleBoundsChange = _this13.handleBoundsChange.bind(_this13);
        _this13.handleSelectData = _this13.handleSelectData.bind(_this13);
        _this13.handleClose = _this13.handleClose.bind(_this13);
        return _this13;
    }

    _createClass(ColorDataForm, [{
        key: 'handleOpen',
        value: function handleOpen(valueMap) {
            var state = {
                open: true,
                colorDataIndex: null,
                minColorValue: 0,
                maxColorValue: 1,
                colorSteps: 5,
                color_scale: null,
                dataManipulated: false
            };

            if (valueMap.colorDataIndex) {
                state.colorDataIndex = valueMap.colorDataIndex;
                state.minColorValue = valueMap.minColorValue;
                state.maxColorValue = valueMap.maxColorValue;
                state.colorSteps = valueMap.colorSteps;
                state.color_scale = valueMap.color_scale;
                state.dataManipulated = true;
            }

            this.setState(state);
        }
    }, {
        key: 'handleSelectData',
        value: function handleSelectData(e, f) {
            var data = this.props.data;
            this.setState(function (prevState) {
                var state = { colorDataIndex: f.value };
                if (!prevState.dataManipulated) {
                    var colorData = data.map(function (e) {
                        return e[f.value];
                    });
                    state.minColorValue = Math.min.apply(Math, _toConsumableArray(colorData));
                    state.maxColorValue = Math.max.apply(Math, _toConsumableArray(colorData));
                }

                return state;
            });
        }
    }, {
        key: 'handleStepChange',
        value: function handleStepChange(e) {
            this.setState({
                colorSteps: e.value
            });
        }
    }, {
        key: 'handleBoundsChange',
        value: function handleBoundsChange(e, f, name) {
            this.setState(_defineProperty({}, name, f.value));
        }
    }, {
        key: 'handleClose',
        value: function handleClose(colors, canceled) {
            var state = { open: false };

            if (!canceled && colors) {
                var color_levels = [];
                var valueStep = Math.abs(this.state.minColorValue - this.state.maxColorValue) / this.state.colorSteps;
                for (var i = 1; i <= this.state.colorSteps; i++) {
                    color_levels.push(this.state.minColorValue + i * valueStep);
                }

                // Simulate a single form change that captures all variables
                var color_scale = colors;
                this.props.onChange({}, {
                    color_levels: color_levels,
                    colorSteps: this.state.colorSteps,
                    maxColorValue: this.state.maxColorValue,
                    minColorValue: this.state.minColorValue,
                    color_scale: color_scale
                }, true);

                state.color_scale = color_scale;
            }

            this.setState(state);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this14 = this;

            var colorSetButtons = colorSets.map(function (colorSet, i) {
                var colors = _chromaJs2.default.scale(colorSet.set).colors(_this14.state.colorSteps);
                return _react2.default.createElement(
                    _semanticUiReact.Button,
                    { className: 'color-set-btn', key: i, onClick: function onClick() {
                            return _this14.handleClose(colors, false);
                        } },
                    createColorButtonIcon(colors, colorSet.name)
                );
            });

            var valueMap = this.props.valueMap;
            var colorRange = 'Range: ';
            var colorSummary = '';

            if (this.state.colorDataIndex) {
                var data = this.props.data.map(function (e) {
                    return e[_this14.state.colorDataIndex];
                });
                var minVal = Math.min.apply(Math, _toConsumableArray(data));
                var maxVal = Math.max.apply(Math, _toConsumableArray(data));
                colorRange += minVal + " - " + maxVal;
                colorSummary = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        null,
                        this.props.dataHeaderOptions[this.state.colorDataIndex].text + " ",
                        _react2.default.createElement(
                            'span',
                            { className: 'minor-text' },
                            "(" + colorRange + ")"
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'minor-text' },
                        "Bounds: " + this.state.minColorValue + " - " + this.state.maxColorValue
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        this.state.color_scale ? createColorButtonIcon(this.state.color_scale) : null
                    )
                );
            }

            return _react2.default.createElement(
                _semanticUiReact.Modal,
                { trigger: _react2.default.createElement(_semanticUiReact.Button, { content: "Color Data", style: { height: 70, width: "100%", textAlign: "center" }, label: { as: 'a', basic: true, pointing: 'left', content: colorSummary }, className: 'color-scale-btn', onClick: function onClick() {
                            return _this14.handleOpen(valueMap);
                        } }), open: this.state.open },
                _react2.default.createElement(
                    _semanticUiReact.Modal.Content,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Form,
                        { onSubmit: function onSubmit(e) {
                                e.preventDefault();
                            } },
                        _react2.default.createElement(
                            _semanticUiReact.Form.Group,
                            { widths: 'equal' },
                            _react2.default.createElement(
                                _semanticUiReact.Form.Field,
                                null,
                                _react2.default.createElement(_semanticUiReact.Dropdown, { placeholder: 'Select Data', search: true, selection: true, options: this.props.dataHeaderOptions,
                                    value: this.state.colorDataIndex ? this.state.colorDataIndex : '', onChange: this.handleSelectData })
                            ),
                            _react2.default.createElement(_semanticUiReact.Form.Input, { placeholder: colorRange, readOnly: true })
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Form.Group,
                            { widths: 'equal' },
                            _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'Lower Bound', name: 'minColorValue',
                                value: this.state.minColorValue,
                                type: "number",
                                onChange: function onChange(e, f) {
                                    return _this14.handleBoundsChange(e, f, 'minColorValue');
                                } }),
                            _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'Upper Bound', name: 'maxColorValue',
                                value: this.state.maxColorValue,
                                type: "number",
                                onChange: function onChange(e, f) {
                                    return _this14.handleBoundsChange(e, f, 'maxColorValue');
                                } }),
                            _react2.default.createElement(_semanticUiReact.Form.Field, { control: _numberPicker2.default, name: 'colorSteps', label: 'Color Steps',
                                value: this.state.colorSteps,
                                onChange: function onChange(e) {
                                    return _this14.handleStepChange(e);
                                },
                                min: 2,
                                max: 10 })
                        )
                    ),
                    colorSetButtons
                ),
                _react2.default.createElement(
                    _semanticUiReact.Modal.Actions,
                    null,
                    _react2.default.createElement(_semanticUiReact.Button, { content: 'Cancel', onClick: function onClick() {
                            return _this14.handleClose(null, true);
                        } })
                )
            );
        }
    }]);

    return ColorDataForm;
}(_react.Component);

var colorSets = [{ name: "jet", set: ['#000080', '#0000ff', '#0063ff', '#00d4ff', '#4effa9', '#a9ff4e', '#ffe600', '#ff7d00', '#ff1400', '#800000'] }, { name: "viridis", set: ['#440154', '#482878', '#3e4989', '#31688e', '#26828e', '#1f9e89', '#35b779', '#6ece58', '#b5de2b', '#fde725'] }, { name: "plasma", set: ['#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26', '#f0f921'] }, { name: "inferno", set: ['#000004', '#1b0c41', '#4a0c6b', '#781c6d', '#a52c60', '#cf4446', '#ed6925', '#fb9b06', '#f7d13d', '#fcffa4'] }, { name: "magma", set: ['#000004', '#180f3d', '#440f76', '#721f81', '#9e2f7f', '#cd4071', '#f1605d', '#fd9668', '#feca8d', '#fcfdbf'] }, { name: "greys", set: ['#ffffff', '#f2f2f2', '#dedede', '#c6c6c6', '#a7a7a7', '#868686', '#686868', '#484848', '#212121', '#000000'] }, { name: "blues", set: ['#f7fbff', '#e1edf8', '#cbdff1', '#abd0e6', '#82badb', '#59a2cf', '#3787c0', '#1b6aaf', '#084d97', '#08306b'] }, { name: "greens", set: ['#f7fcf5', '#e7f6e2', '#ceecc7', '#aedea7', '#88cd86', '#5db96b', '#37a055', '#1b843f', '#00682a', '#00441b'] }, { name: "oranges", set: ['#fff5eb', '#fee8d1', '#fdd5ac', '#fdb97d', '#fd9c51', '#f87d2a', '#e95e0d', '#ce4401', '#a23403', '#7f2704'] }, { name: "reds", set: ['#fff5f0', '#fee2d5', '#fcc3ac', '#fca082', '#fb7c5c', '#f6553d', '#e32f27', '#c3161b', '#9e0d14', '#67000d'] }, { name: "ylorbr", set: ['#ffffe5', '#fff8c1', '#fee79b', '#fece65', '#feac3a', '#f68720', '#e1640e', '#c14702', '#933204', '#662506'] }, { name: "copper", set: ['#000000', '#23160e', '#462c1c', '#69422a', '#8c5938', '#af6f46', '#d28555', '#f59b63', '#ffb171', '#ffc77f'] }, { name: "cool", set: ['#00ffff', '#1ce3ff', '#39c6ff', '#55aaff', '#718eff', '#8e71ff', '#aa55ff', '#c639ff', '#e31cff', '#ff00ff'] }, { name: "hot", set: ['#0b0000', '#550000', '#9f0000', '#ea0000', '#ff3500', '#ff8000', '#ffca00', '#ffff20', '#ffff8f', '#ffffff'] }];

function createColorButtonIcon(colors, name) {
    var icons = [];

    for (var i = 0; i < colors.length; i++) {
        icons.push(_react2.default.createElement('div', { style: { background: colors[i], display: "inline-block" }, className: "color-set-div", key: i }));
    }

    return _react2.default.createElement(
        'div',
        { key: -1 },
        name ? _react2.default.createElement(
            'div',
            null,
            name
        ) : null,
        _react2.default.createElement(
            'div',
            null,
            icons
        )
    );
}

var formGroupMap = [[{ name: "data", tag: DataForm }], [{ name: "level_data", tag: LevelForm }], [{ name: "color_data", tag: ColorDataForm }], [{ name: "description", tag: DescriptionForm }, { name: "unit", tag: UnitForm }], [{ name: "opacity", tag: OpacityForm }, { name: "report", tag: ReportForm }], [{ name: "true_color", tag: TrueColorForm }, { name: "false_color", tag: FalseColorForm }]];

function getFormFromArgs(args, data, _onChange, valueMap, dataHeaderOptions, validators) {
    var fieldCount = 0;

    var fields = formGroupMap.map(function (formGroup, i) {
        var fieldIncluded = false;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = formGroup[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var field = _step.value;

                if (args.includes(field.name)) {
                    fieldIncluded = true;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (fieldIncluded) {
            var fieldGroup = formGroup.map(function (form) {
                if (args.includes(form.name)) {
                    var _ret3 = function () {
                        var arg = form.name;
                        return {
                            v: _react2.default.createElement(form.tag, { key: arg, valueMap: valueMap, validators: validators, data: data, dataHeaderOptions: dataHeaderOptions, onChange: function onChange(e, f, argOverride) {
                                    return _onChange(e, f, arg, argOverride);
                                } })
                        };
                    }();

                    if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
                } else {
                    return false;
                }
            }).filter(function (arg) {
                if (arg) {
                    return true;
                } else {
                    return false;
                }
            });

            return _react2.default.createElement(
                _semanticUiReact.Form.Group,
                { key: i, widths: 2 },
                fieldGroup
            );
        }

        return null;
    });

    return fields;
}
exports.default = getFormFromArgs;