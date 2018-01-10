"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.summarizeCondition = summarizeCondition;

var _chromaJs = require("chroma-js");

var _chromaJs2 = _interopRequireDefault(_chromaJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function summarizeCondition(condition, data, dataHeaders) {
    var summary = {};

    if (condition.level_data) {
        var _data = [];
        if (condition.levelDataSpan) {
            var _loop = function _loop(j) {
                _data = _data.concat(_data.map(function (e) {
                    return e[condition.levelDataIndex + j];
                }));
            };

            for (var j = 0; j < condition.levelDataSpan; j++) {
                _loop(j);
            }
        } else {
            _data = this.props.data.map(function (e) {
                return e[condition.levelDataIndex];
            });
        }

        var minVal = Math.min.apply(Math, _toConsumableArray(_data));
        var maxVal = Math.max.apply(Math, _toConsumableArray(_data));
        levelRange += minVal + " - " + maxVal;
        var levelDataName = this.props.dataHeaderOptions[condition.levelDataIndex].text;

        var span = condition.levelDataSpan ? condition.levelDataSpan : 1;
        dataSpanSummary = levelDataName + "..." + dataHeaders[condition.levelDataIndex + span - 1].text;

        levelSummary = React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                null,
                dims > 1 ? dataSpanSummary : levelDataName,
                React.createElement(
                    "span",
                    { className: "minor-text" },
                    "(" + levelRange + ")"
                )
            ),
            React.createElement(
                "div",
                { className: "minor-text" },
                "Bounds: " + valueMap.minHeight + " - " + valueMap.maxHeight
            )
        );

        summary.level_data = {};
    }

    if (condition.color_data) {}

    return summary;
}

var LevelForm = function (_Component) {
    _inherits(LevelForm, _Component);

    function LevelForm(props) {
        _classCallCheck(this, LevelForm);

        var _this = _possibleConstructorReturn(this, (LevelForm.__proto__ || Object.getPrototypeOf(LevelForm)).call(this, props));

        _this.initialState = {
            open: false,
            minHeight: 0,
            maxHeight: 1
        };

        _this.state = Object.assign({}, _this.initialState);

        _this.handleOpen = _this.handleOpen.bind(_this);
        _this.handleSelectData = _this.handleSelectData.bind(_this);
        _this.handleSelectDataSpan = _this.handleSelectDataSpan.bind(_this);
        _this.handleBoundsChange = _this.handleBoundsChange.bind(_this);
        _this.calculateBounds = _this.calculateBounds.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        return _this;
    }

    _createClass(LevelForm, [{
        key: "handleOpen",
        value: function handleOpen(valueMap) {
            var state = {
                open: true,
                levelDataIndex: null,
                minHeight: 0,
                maxHeight: 1,
                dataManipulated: false
            };

            if (valueMap.levelDataIndex) {
                state.levelDataIndex = valueMap.levelDataIndex;
                state.minHeight = valueMap.min_height;
                state.maxHeight = valueMap.max_height;
                state.dataManipulated = true;
            }

            this.setState(state);
        }
    }, {
        key: "handleSelectData",
        value: function handleSelectData(e, f) {
            var _this2 = this;

            this.setState(function (prevState) {
                var state = { levelDataIndex: f.value };

                if (!prevState.dataManipulated) {
                    var levelDataSpan = Math.min(prevState.levelDataSpan ? prevState.levelDataSpan : 1, _this2.props.data[0].length - f.value);
                    var heightDataBounds = _this2.calculateBounds(f.value, levelDataSpan);

                    state.minHeight = heightDataBounds[0];
                    state.maxHeight = heightDataBounds[1];
                    state.levelDataSpan = levelDataSpan;
                }

                return state;
            });
        }
    }, {
        key: "handleSelectDataSpan",
        value: function handleSelectDataSpan(e) {
            var _this3 = this;

            this.setState(function (prevState) {
                var state = { levelDataSpan: Math.min(e.value, _this3.props.data[0].length - prevState.levelDataIndex) };

                if (!prevState.dataManipulated) {
                    var heightDataBounds = _this3.calculateBounds(e.value, state.levelDataSpan);
                    state.minHeight = heightDataBounds[0];
                    state.maxHeight = heightDataBounds[1];
                }

                return state;
            });
        }
    }, {
        key: "handleBoundsChange",
        value: function handleBoundsChange(e, f, name) {
            this.setState(_defineProperty({}, name, f.value));
        }
    }, {
        key: "handleClose",
        value: function handleClose(canceled) {
            if (!canceled) {
                this.props.onChange({}, {
                    min_height: this.state.minHeight,
                    max_height: this.state.maxHeight,
                    levelDataIndex: this.state.levelDataIndex
                }, true);

                this.setState({ open: false });
            } else {
                this.setState(this.initialState);
            }
        }
    }, {
        key: "calculateBounds",
        value: function calculateBounds(levelDataIndex, levelDataSpan) {
            var _this4 = this;

            var data = [];
            if (this.props.validators.level_data.maxDims > 1) {
                var _loop2 = function _loop2(j) {
                    data = data.concat(_this4.props.data.map(function (e) {
                        return e[levelDataIndex + j];
                    }));
                };

                for (var j = 0; j < levelDataSpan; j++) {
                    _loop2(j);
                }
            } else {
                data = this.props.data.map(function (e) {
                    return e[levelDataIndex];
                });
            }

            return [Math.min.apply(Math, _toConsumableArray(data)), Math.max.apply(Math, _toConsumableArray(data))];
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            // Determine if we are using a single or multiple dimensions
            var dims = 1;
            if (this.props.validators.level_data.maxDims > 1) {
                dims = 2;
            }

            var valueMap = this.props.valueMap;
            var levelRange = 'Range: ';
            var levelSummary = '';
            var selectedCols = '';
            var dataSpanSummary = '';
            if (valueMap.levelDataIndex) {
                var data = [];
                if (dims > 1) {
                    var _loop3 = function _loop3(j) {
                        data = data.concat(_this5.props.data.map(function (e) {
                            return e[valueMap.levelDataIndex + j];
                        }));
                    };

                    for (var j = 0; j < valueMap.levelDataSpan; j++) {
                        _loop3(j);
                    }
                } else {
                    data = this.props.data.map(function (e) {
                        return e[valueMap.levelDataIndex];
                    });
                }

                var minVal = Math.min.apply(Math, _toConsumableArray(data));
                var maxVal = Math.max.apply(Math, _toConsumableArray(data));
                levelRange += minVal + " - " + maxVal;
                var levelDataName = this.props.dataHeaderOptions[valueMap.levelDataIndex].text;

                var span = valueMap.levelDataSpan ? valueMap.levelDataSpan : 1;
                dataSpanSummary = levelDataName + "..." + this.props.dataHeaderOptions[valueMap.levelDataIndex + span - 1].text;

                levelSummary = React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        null,
                        dims > 1 ? dataSpanSummary : levelDataName,
                        React.createElement(
                            "span",
                            { className: "minor-text" },
                            "(" + levelRange + ")"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "minor-text" },
                        "Bounds: " + valueMap.minHeight + " - " + valueMap.maxHeight
                    )
                );
            }

            return React.createElement(
                Modal,
                { trigger: React.createElement(Button, { content: "Level Data", style: { height: 70, width: "100%", textAlign: "center" }, label: { as: 'a', basic: true, pointing: 'left', content: levelSummary }, className: "level-btn", onClick: function onClick() {
                            return _this5.handleOpen(valueMap);
                        } }), open: this.state.open },
                React.createElement(
                    Modal.Content,
                    null,
                    React.createElement(
                        Form,
                        { onSubmit: function onSubmit(e) {
                                e.preventDefault();
                            } },
                        React.createElement(
                            Form.Group,
                            { widths: "2" },
                            React.createElement(
                                Form.Field,
                                null,
                                React.createElement(
                                    "label",
                                    null,
                                    dims == 1 ? "Data Column" : "Data Column Start"
                                ),
                                React.createElement(Dropdown, { placeholder: "Select Data", search: true, selection: true, options: this.props.dataHeaderOptions,
                                    value: this.state.levelDataIndex ? this.state.levelDataIndex : '', onChange: function onChange(e, f) {
                                        return _this5.handleSelectData(e, f);
                                    } })
                            ),
                            React.createElement(Form.Input, { label: "\xA0", placeholder: levelRange, readOnly: true })
                        ),
                        dims == 2 ? React.createElement(
                            Form.Group,
                            { widths: "2" },
                            React.createElement(Form.Field, { label: "Data Column Span", name: "dataSpan", control: NumberPicker, disabled: this.state.levelDataIndex ? false : true, min: 1, value: this.state.levelDataSpan ? this.state.levelDataSpan : '1', onChange: this.handleSelectDataSpan }),
                            React.createElement(Form.Input, { label: "\xA0", placeholder: dataSpanSummary, readOnly: true })
                        ) : null,
                        React.createElement(
                            Form.Group,
                            { widths: "equal" },
                            React.createElement(Form.Input, { label: "Lower Bound", name: "minHeight", value: this.state.minHeight, type: "number", onChange: function onChange(e, f) {
                                    return _this5.handleBoundsChange(e, f, 'minHeight');
                                } }),
                            React.createElement(Form.Input, { label: "Upper Bound", name: "maxHeight", value: this.state.maxHeight, type: "number", onChange: function onChange(e, f) {
                                    return _this5.handleBoundsChange(e, f, 'maxHeight');
                                } })
                        )
                    )
                ),
                React.createElement(
                    Modal.Actions,
                    null,
                    React.createElement(Button, { content: "Cancel", onClick: function onClick() {
                            return _this5.handleClose(true);
                        } }),
                    React.createElement(Button, { content: "Done", onClick: function onClick() {
                            return _this5.handleClose(false);
                        } })
                )
            );
        }
    }]);

    return LevelForm;
}(Component);

var ColorDataForm = function (_Component2) {
    _inherits(ColorDataForm, _Component2);

    function ColorDataForm(props) {
        var _this6$state;

        _classCallCheck(this, ColorDataForm);

        var _this6 = _possibleConstructorReturn(this, (ColorDataForm.__proto__ || Object.getPrototypeOf(ColorDataForm)).call(this, props));

        _this6.state = (_this6$state = {
            open: false,
            colorSteps: 5,
            minColorValue: 0,
            maxColorValue: 1
        }, _defineProperty(_this6$state, "colorSteps", 5), _defineProperty(_this6$state, "color_scale", null), _this6$state);

        _this6.handleOpen = _this6.handleOpen.bind(_this6);
        _this6.handleStepChange = _this6.handleStepChange.bind(_this6);
        _this6.handleBoundsChange = _this6.handleBoundsChange.bind(_this6);
        _this6.handleSelectData = _this6.handleSelectData.bind(_this6);
        _this6.handleClose = _this6.handleClose.bind(_this6);
        return _this6;
    }

    _createClass(ColorDataForm, [{
        key: "handleOpen",
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
        key: "handleSelectData",
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
        key: "handleStepChange",
        value: function handleStepChange(e) {
            this.setState({
                colorSteps: e.value
            });
        }
    }, {
        key: "handleBoundsChange",
        value: function handleBoundsChange(e, f, name) {
            this.setState(_defineProperty({}, name, f.value));
        }
    }, {
        key: "handleClose",
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
        key: "render",
        value: function render() {
            var _this7 = this;

            var colorSetButtons = colorSets.map(function (colorSet, i) {
                var colors = _chromaJs2.default.scale(colorSet.set).colors(_this7.state.colorSteps);
                return React.createElement(
                    Button,
                    { key: i, onClick: function onClick() {
                            return _this7.handleClose(colors, false);
                        } },
                    createColorButtonIcon(colors, colorSet.name)
                );
            });

            var valueMap = this.props.valueMap;
            var colorRange = 'Range: ';
            var colorSummary = '';

            if (this.state.colorDataIndex) {
                var data = this.props.data.map(function (e) {
                    return e[_this7.state.colorDataIndex];
                });
                var minVal = Math.min.apply(Math, _toConsumableArray(data));
                var maxVal = Math.max.apply(Math, _toConsumableArray(data));
                colorRange += minVal + " - " + maxVal;
                colorSummary = React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        null,
                        this.props.dataHeaderOptions[this.state.colorDataIndex].text + " ",
                        React.createElement(
                            "span",
                            { className: "minor-text" },
                            "(" + colorRange + ")"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "minor-text" },
                        "Bounds: " + this.state.minColorValue + " - " + this.state.maxColorValue
                    ),
                    React.createElement(
                        "div",
                        null,
                        this.state.color_scale ? createColorButtonIcon(this.state.color_scale) : null
                    )
                );
            }

            return React.createElement(
                Modal,
                { trigger: React.createElement(Button, { content: "Color Data", style: { height: 70, width: "100%", textAlign: "center" }, label: { as: 'a', basic: true, pointing: 'left', content: colorSummary }, className: "color-scale-btn", onClick: function onClick() {
                            return _this7.handleOpen(valueMap);
                        } }), open: this.state.open },
                React.createElement(
                    Modal.Content,
                    null,
                    React.createElement(
                        Form,
                        { onSubmit: function onSubmit(e) {
                                e.preventDefault();
                            } },
                        React.createElement(
                            Form.Group,
                            { widths: "equal" },
                            React.createElement(
                                Form.Field,
                                null,
                                React.createElement(Dropdown, { placeholder: "Select Data", search: true, selection: true, options: this.props.dataHeaderOptions,
                                    value: this.state.colorDataIndex ? this.state.colorDataIndex : '', onChange: this.handleSelectData })
                            ),
                            React.createElement(Form.Input, { placeholder: colorRange, readOnly: true })
                        ),
                        React.createElement(
                            Form.Group,
                            { widths: "equal" },
                            React.createElement(Form.Input, { label: "Lower Bound", name: "minColorValue",
                                value: this.state.minColorValue,
                                type: "number",
                                onChange: function onChange(e, f) {
                                    return _this7.handleBoundsChange(e, f, 'minColorValue');
                                } }),
                            React.createElement(Form.Input, { label: "Upper Bound", name: "maxColorValue",
                                value: this.state.maxColorValue,
                                type: "number",
                                onChange: function onChange(e, f) {
                                    return _this7.handleBoundsChange(e, f, 'maxColorValue');
                                } }),
                            React.createElement(Form.Field, { control: NumberPicker, name: "colorSteps", label: "Color Steps",
                                value: this.state.colorSteps,
                                onChange: function onChange(e) {
                                    return _this7.handleStepChange(e);
                                },
                                min: 2,
                                max: 10 })
                        )
                    ),
                    colorSetButtons
                ),
                React.createElement(
                    Modal.Actions,
                    null,
                    React.createElement(Button, { content: "Cancel", onClick: function onClick() {
                            return _this7.handleClose(null, true);
                        } })
                )
            );
        }
    }]);

    return ColorDataForm;
}(Component);

var colorSets = [{ name: "pee", set: ['lightyellow', 'navy'] }, { name: "rainbow", set: 'RdYlBu' }];

function createColorButtonIcon(colors, name) {
    var icons = [];

    for (var i = 0; i < colors.length; i++) {
        icons.push(React.createElement("div", { style: { background: colors[i], display: "inline-block" }, className: "color-set-div", key: i }));
    }

    return React.createElement(
        "div",
        { key: -1 },
        name ? React.createElement(
            "div",
            null,
            name
        ) : null,
        React.createElement(
            "div",
            null,
            icons
        )
    );
}

var formGroupMap = [[{ name: "data", tag: DataForm }], [{ name: "level_data", tag: LevelForm }], [{ name: "color_data", tag: ColorDataForm }], [{ name: "description", tag: DescriptionForm }, { name: "unit", tag: UnitForm }], [{ name: "opacity", tag: OpacityForm }, { name: "report", tag: ReportForm }], [{ name: "true_color", tag: TrueColorForm }, { name: "false_color", tag: FalseColorForm }]];

function getFormFromArgs(args, data, _onChange, valueMap, dataHeaderOptions, validators) {
    var fieldCount = 0;

    console.log("val", validators);

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
                    var _ret4 = function () {
                        var arg = form.name;
                        return {
                            v: React.createElement(form.tag, { key: arg, valueMap: valueMap, validators: validators, data: data, dataHeaderOptions: dataHeaderOptions, onChange: function onChange(e, f, argOverride) {
                                    return _onChange(e, f, arg, argOverride);
                                } })
                        };
                    }();

                    if ((typeof _ret4 === "undefined" ? "undefined" : _typeof(_ret4)) === "object") return _ret4.v;
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

            return React.createElement(
                Form.Group,
                { key: i, widths: 2 },
                fieldGroup
            );
        }

        return null;
    });

    return fields;
}
exports.default = getFormFromArgs;