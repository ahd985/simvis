'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _modelForm = require('./modelForm.jsx');

var _modelForm2 = _interopRequireDefault(_modelForm);

var _conditionPickerModal = require('./conditionPickerModal.jsx');

var _conditionPickerModal2 = _interopRequireDefault(_conditionPickerModal);

var _modelIcons = require('./modelIcons.jsx');

var _conditionIcons = require('./conditionIcons.jsx');

var _conditionIcons2 = _interopRequireDefault(_conditionIcons);

var _ssvMin = require('../../ssv.min.js');

var _ssvMin2 = _interopRequireDefault(_ssvMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModelPickerModal = function (_Component) {
    _inherits(ModelPickerModal, _Component);

    function ModelPickerModal(props) {
        _classCallCheck(this, ModelPickerModal);

        var _this = _possibleConstructorReturn(this, (ModelPickerModal.__proto__ || Object.getPrototypeOf(ModelPickerModal)).call(this, props));

        _this.defaultState = {
            open: false,
            modelRequirements: null,
            form: {
                ids: _this.props.ids,
                conditions: []
            }
        };

        _this.state = _extends({}, _this.defaultState);

        _this.iconOrder = ["cell", "heatmap", "line", "toggle", "legend", "report", "table"];

        _this.requirements = _ssvMin2.default.get_type_requirements();
        _this.options = _this.generate_options(_this.requirements);

        _this.handleOpen = _this.handleOpen.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.editCondition = _this.editCondition.bind(_this);
        _this.handleFormChange = _this.handleFormChange.bind(_this);
        _this.validateForm = _this.validateForm.bind(_this);
        _this.handleRemoveModel = _this.handleRemoveModel.bind(_this);
        return _this;
    }

    _createClass(ModelPickerModal, [{
        key: 'generate_options',
        value: function generate_options(requirements) {
            var options = [];

            var keys = Object.keys(requirements).sort();
            keys.map(function (key) {
                options.push({ key: key, value: key, text: key });
            });

            return options;
        }
    }, {
        key: 'handleOpen',
        value: function handleOpen() {
            if (this.props.model) {
                this.setState({
                    open: true,
                    form: this.props.model,
                    modelRequirements: this.requirements[this.props.model.type]
                });
            } else {
                this.setState({ open: true });
            }
        }
    }, {
        key: 'handleClose',
        value: function handleClose(canceled) {
            if (!canceled) {
                if (!this.validateForm()) {
                    return;
                }
                this.props.setShapeModel(this.state.form);
            }

            this.setState(_extends({}, this.defaultState));
        }
    }, {
        key: 'handleRemoveModel',
        value: function handleRemoveModel() {
            this.setState(_extends({}, this.defaultState, {
                open: true
            }));
        }
    }, {
        key: 'handleClick',
        value: function handleClick(type) {
            var _this2 = this;

            this.setState(function (prevState) {
                return {
                    modelRequirements: _this2.requirements[type],
                    form: _extends({
                        type: type
                    }, prevState.form)
                };
            });
        }
    }, {
        key: 'editCondition',
        value: function editCondition(condition, index) {
            this.setState(function (prevState) {
                var form = _extends({}, prevState.form, {
                    conditions: prevState.form.conditions.slice()
                });

                if (index != null) {
                    form.conditions[index] = condition;
                } else {
                    form.conditions.push(condition);
                }

                return { form: form };
            });
        }
    }, {
        key: 'handleFormChange',
        value: function handleFormChange(e, f, arg) {
            e.persist();

            this.setState(function (prevState) {
                return {
                    form: _extends({}, prevState.form, _defineProperty({}, arg, f.value ? f.value : null))
                };
            });
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var modelSelection = null;
            var modelForm = null;
            var modelConditions = null;

            if (this.state.modelRequirements) {
                var name = this.state.form.type[0].toUpperCase() + this.state.form.type.substring(1);

                modelSelection = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h3',
                            null,
                            name
                        )
                    ),
                    _modelIcons.modelIconMap[this.state.form.type],
                    _react2.default.createElement(
                        'div',
                        { style: { position: "absolute", top: "5px", right: "5px" } },
                        _react2.default.createElement(
                            _semanticUiReact.Button,
                            { icon: true, onClick: this.handleRemoveModel },
                            _react2.default.createElement(_semanticUiReact.Icon, { name: 'erase' })
                        )
                    )
                );

                var args = Object.keys(this.state.modelRequirements.args);
                var onChange = function onChange(e, f, arg, argOverride) {
                    _this3.handleFormChange(e, f, arg);
                };

                var modelFormArgs = (0, _modelForm2.default)(args, null, onChange, this.state.form);

                modelForm = _react2.default.createElement(
                    _semanticUiReact.Form,
                    { onSubmit: function onSubmit(e) {
                            e.preventDefault();
                        } },
                    modelFormArgs
                );

                modelConditions = _react2.default.createElement(
                    _semanticUiReact.Grid,
                    { container: true, columns: 6 },
                    this.state.form.conditions.map(function (condition, i) {
                        return _react2.default.createElement(
                            _semanticUiReact.Grid.Column,
                            { key: i },
                            _react2.default.createElement(_conditionPickerModal2.default, { triggerIcon: _conditionIcons2.default[condition.type], conditionIndex: i, condition: condition, conditionRequirements: _this3.state.modelRequirements.conditions, editCondition: _this3.editCondition, data: _this3.props.data, dataHeaders: _this3.props.dataHeaders })
                        );
                    })
                );
            } else {
                (function () {
                    var allowedModels = _this3.props.allowedModels;
                    modelSelection = _react2.default.createElement(
                        _semanticUiReact.Grid,
                        { container: true, columns: 4 },
                        _this3.iconOrder.filter(function (e) {
                            if (allowedModels && allowedModels.indexOf(e) > -1) {
                                return true;
                            };
                            return false;
                        }).map(function (e, i) {
                            var name = e[0].toUpperCase() + e.substring(1);
                            return _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { key: i },
                                _react2.default.createElement(
                                    _semanticUiReact.Button,
                                    { onClick: function onClick() {
                                            return _this3.handleClick(e);
                                        } },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _modelIcons.animatedModelIconMap[e]
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        name
                                    )
                                )
                            );
                        })
                    );
                })();
            }

            return _react2.default.createElement(
                _semanticUiReact.Modal,
                { trigger: _react2.default.createElement(
                        _semanticUiReact.Button,
                        { onClick: this.handleOpen },
                        "Add/Edit Model"
                    ), open: this.state.open },
                _react2.default.createElement(
                    _semanticUiReact.Modal.Header,
                    null,
                    modelSelection
                ),
                _react2.default.createElement(
                    _semanticUiReact.Modal.Content,
                    null,
                    modelForm,
                    modelConditions ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _semanticUiReact.Segment,
                            { attached: true },
                            _react2.default.createElement(
                                _semanticUiReact.Label,
                                { attached: 'top' },
                                'Conditions'
                            ),
                            modelConditions
                        ),
                        _react2.default.createElement(_conditionPickerModal2.default, { allowedConditions: this.props.allowedConditions, conditionRequirements: this.state.modelRequirements.conditions, editCondition: this.editCondition, data: this.props.data, dataHeaders: this.props.dataHeaders })
                    ) : null
                ),
                _react2.default.createElement(
                    _semanticUiReact.Modal.Actions,
                    null,
                    _react2.default.createElement(_semanticUiReact.Button, { content: 'Cancel', onClick: function onClick() {
                            return _this3.handleClose(true);
                        } }),
                    _react2.default.createElement(_semanticUiReact.Button, { content: 'Done', onClick: function onClick() {
                            return _this3.handleClose(false);
                        } })
                )
            );
        }
    }]);

    return ModelPickerModal;
}(_react.Component);

exports.default = ModelPickerModal;