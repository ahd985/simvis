'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _modelForm = require('../components/modelForm');

var _modelForm2 = _interopRequireDefault(_modelForm);

var _conditionIcons = require('./conditionIcons.jsx');

var _conditionIcons2 = _interopRequireDefault(_conditionIcons);

var _validators = require('../utility/validators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConditionPickerModal = function (_Component) {
    _inherits(ConditionPickerModal, _Component);

    function ConditionPickerModal(props) {
        _classCallCheck(this, ConditionPickerModal);

        var _this = _possibleConstructorReturn(this, (ConditionPickerModal.__proto__ || Object.getPrototypeOf(ConditionPickerModal)).call(this, props));

        _this.defaultState = {
            open: false,
            conditionSelected: null,
            form: {
                report: false,
                opacity: 1
            }
        };

        _this.state = _extends({}, _this.defaultState);

        _this.iconOrder = ["staticLevel", "dynamicLevel", "background", "zonalY", "rect", "equalY", "colorScale", "logical", "showHide"];

        _this.handleOpen = _this.handleOpen.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleFormChange = _this.handleFormChange.bind(_this);
        _this.handleRemoveCondition = _this.handleRemoveCondition.bind(_this);
        _this.validateForm = _this.validateForm.bind(_this);
        return _this;
    }

    _createClass(ConditionPickerModal, [{
        key: 'handleOpen',
        value: function handleOpen() {
            if (this.props.condition) {
                this.setState({
                    open: true,
                    conditionSelected: this.props.conditionRequirements[this.props.condition.type],
                    form: this.props.condition
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

                if (this.props.conditionIndex != null) {
                    this.props.editCondition(this.state.form, this.props.conditionIndex);
                } else {
                    this.props.editCondition(this.state.form);
                }
            }

            this.setState({ open: false });
        }
    }, {
        key: 'handleClick',
        value: function handleClick(type) {
            var _this2 = this;

            this.setState(function (prevState) {
                return {
                    conditionSelected: _this2.props.conditionRequirements[type],
                    form: _extends({}, prevState.form, {
                        type: type
                    })
                };
            });
        }
    }, {
        key: 'handleFormChange',
        value: function handleFormChange(e, f, arg, argOverride) {
            e.persist ? e.persist() : null;
            this.setState(function (prevState) {
                if (argOverride) {
                    return {
                        form: _extends({}, prevState.form, f)
                    };
                } else {
                    return {
                        form: _extends({}, prevState.form, _defineProperty({}, arg, f.value ? f.value : null))
                    };
                }
            });
        }
    }, {
        key: 'handleRemoveCondition',
        value: function handleRemoveCondition() {
            this.setState(_extends({}, this.defaultState, {
                open: true
            }));
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

            var conditionSelection = null;
            var conditionForm = null;
            if (this.state.conditionSelected) {
                var name = this.state.form.type[0].toUpperCase() + this.state.form.type.substring(1);

                var dataHeaderOptions = this.props.dataHeaders.map(function (header, i) {
                    return { key: i, value: i, text: header };
                });

                conditionSelection = _react2.default.createElement(
                    _semanticUiReact.Grid,
                    { container: true, columns: 1, verticalAlign: "bottom", centered: true, padded: 'vertically', textAlign: "center" },
                    _react2.default.createElement(
                        _semanticUiReact.Grid.Column,
                        { style: { paddingLeft: 0 } },
                        _react2.default.createElement(
                            'div',
                            { className: 'condition-icon' },
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    name
                                )
                            ),
                            _conditionIcons2.default[this.state.form.type]
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: { position: "absolute", top: "5px", right: "5px" } },
                        _react2.default.createElement(
                            _semanticUiReact.Button,
                            { icon: true, onClick: this.handleRemoveCondition },
                            _react2.default.createElement(_semanticUiReact.Icon, { name: 'erase' })
                        )
                    )
                );

                var args = Object.keys(this.state.conditionSelected.args);
                var data = this.props.data;
                var onChange = this.handleFormChange;
                var validators = (0, _validators.unwrapValidators)(this.state.conditionSelected.validators);

                var conditionArgs = (0, _modelForm2.default)(args, data, onChange, this.state.form, dataHeaderOptions, validators);

                conditionForm = _react2.default.createElement(
                    _semanticUiReact.Form,
                    { onSubmit: function onSubmit(e) {
                            e.preventDefault();
                        } },
                    conditionArgs
                );
            } else {
                (function () {
                    var allowedConditions = _this3.props.conditionRequirements;

                    conditionSelection = _react2.default.createElement(
                        _semanticUiReact.Grid,
                        { container: true, columns: 4 },
                        _this3.iconOrder.filter(function (e) {
                            if (allowedConditions.hasOwnProperty(e.toLowerCase())) {
                                return true;
                            }

                            return false;
                        }).map(function (e, i) {
                            var name = e[0].toUpperCase() + e.substring(1);
                            return _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { key: i },
                                _react2.default.createElement(
                                    _semanticUiReact.Button,
                                    { onClick: function onClick() {
                                            return _this3.handleClick(e.toLowerCase());
                                        } },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _conditionIcons2.default[e]
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

            var trigger = _react2.default.createElement(
                _semanticUiReact.Button,
                { attached: 'bottom', icon: true, onClick: this.handleOpen },
                _react2.default.createElement(_semanticUiReact.Icon, { name: 'add circle' })
            );
            if (this.props.triggerIcon) {
                trigger = _react2.default.createElement(
                    _semanticUiReact.Button,
                    { onClick: this.handleOpen },
                    _react2.default.createElement(
                        'a',
                        null,
                        this.props.triggerIcon
                    )
                );
            }

            return _react2.default.createElement(
                _semanticUiReact.Modal,
                { trigger: trigger, open: this.state.open },
                _react2.default.createElement(
                    _semanticUiReact.Modal.Content,
                    null,
                    conditionSelection,
                    conditionForm
                ),
                _react2.default.createElement(
                    _semanticUiReact.Modal.Actions,
                    null,
                    _react2.default.createElement(_semanticUiReact.Button, { content: 'Cancel', onClick: function onClick() {
                            return _this3.handleClose(true);
                        } }),
                    _react2.default.createElement(_semanticUiReact.Button, { content: 'Done', onClick: function onClick() {
                            return _this3.handleClose();
                        } })
                )
            );
        }
    }]);

    return ConditionPickerModal;
}(_react.Component);

exports.default = ConditionPickerModal;