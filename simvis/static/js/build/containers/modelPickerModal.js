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

var _conditionPickerModal = require('../components/conditionPickerModal');

var _conditionPickerModal2 = _interopRequireDefault(_conditionPickerModal);

var _modelButtons = require('../components/modelButtons');

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
            model: null,
            modelRequirements: null,
            form: {
                ids: _this.props.ids,
                conditions: []
            }
        };

        _this.state = _extends({}, _this.defaultState);

        _this.requirements = _ssvMin2.default.get_type_requirements();
        _this.options = _this.generate_options(_this.requirements);

        _this.handleOpen = _this.handleOpen.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.addCondition = _this.addCondition.bind(_this);
        _this.handleFormChange = _this.handleFormChange.bind(_this);
        _this.validateForm = _this.validateForm.bind(_this);
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
            this.setState({ open: true });
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

            this.setState({ open: false });
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
        key: 'addCondition',
        value: function addCondition(condition) {
            this.setState(function (prevState) {
                return {
                    form: _extends({}, prevState.form, {
                        conditions: prevState.form.conditions.slice().concat(condition)
                    })
                };
            });
        }
    }, {
        key: 'handleFormChange',
        value: function handleFormChange(e, arg) {
            e.persist();
            this.setState(function (prevState) {
                return {
                    form: _extends({}, prevState.form, _defineProperty({}, arg, e.target ? e.target.value : null))
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

            var modelForm = null;
            var modelConditions = null;
            if (this.state.modelRequirements) {
                var modelFormArgs = Object.keys(this.state.modelRequirements.args).map(function (arg) {
                    var form = (0, _modelForm2.default)(arg);
                    if (form) {
                        return _react2.default.createElement(form.tag, { key: arg, onChange: function onChange(e) {
                                _this3.handleFormChange(e, arg);
                            } });
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

                modelForm = _react2.default.createElement(
                    _semanticUiReact.Form,
                    { onSubmit: function onSubmit(e) {
                            e.preventDefault();
                        } },
                    modelFormArgs
                );

                var formConditions = this.state.form.conditions.map(function (d) {
                    return _react2.default.createElement(
                        _semanticUiReact.Table.Row,
                        { key: d.name },
                        _react2.default.createElement(
                            _semanticUiReact.Table.Cell,
                            { key: d.name + "-2" },
                            'd.name'
                        )
                    );
                });

                modelConditions = _react2.default.createElement(
                    _semanticUiReact.Table,
                    { compact: true, celled: true, definition: true },
                    _react2.default.createElement(
                        _semanticUiReact.Table.Header,
                        null,
                        _react2.default.createElement(
                            _semanticUiReact.Table.Row,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Table.HeaderCell,
                                null,
                                'Condition'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Table.Body,
                        null,
                        formConditions
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Table.Footer,
                        { fullWidth: true },
                        _react2.default.createElement(
                            _semanticUiReact.Table.Row,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Table.HeaderCell,
                                null,
                                _react2.default.createElement(_conditionPickerModal2.default, { conditions: this.state.modelRequirements.conditions, addCondition: this.addCondition, data: this.props.data, dataHeaders: this.props.dataHeaders })
                            )
                        )
                    )
                );
            }

            return _react2.default.createElement(
                _semanticUiReact.Modal,
                { trigger: _react2.default.createElement(
                        _semanticUiReact.Button,
                        { onClick: this.handleOpen },
                        "Add Model"
                    ), open: this.state.open },
                _react2.default.createElement(
                    _semanticUiReact.Modal.Content,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Grid,
                        { container: true },
                        _react2.default.createElement(
                            _semanticUiReact.Grid.Row,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Button,
                                    { onClick: function onClick() {
                                            return _this3.handleClick("Cell");
                                        } },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _modelButtons.cellButtonIcon
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Cell'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Button,
                                    { onClick: function onClick() {
                                            return _this3.handleClick("Heatmap");
                                        } },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _modelButtons.heatmapButtonIcon
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Heatmap'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Button,
                                    { onClick: function onClick() {
                                            return _this3.handleClick("Line");
                                        } },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _modelButtons.lineButtonIcon
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Line'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Button,
                                    { onClick: function onClick() {
                                            return _this3.handleClick("Toggle");
                                        } },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _modelButtons.toggleButtonIcon
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Toggle'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Grid.Row,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Button,
                                    { onClick: function onClick() {
                                            return _this3.handleClick("Legend");
                                        } },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _modelButtons.legendButtonIcon
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Legend'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Button,
                                    { onClick: function onClick() {
                                            return _this3.handleClick("Report");
                                        } },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _modelButtons.reportButtonIcon
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Report'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Button,
                                    { onClick: function onClick() {
                                            return _this3.handleClick("Table");
                                        } },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _modelButtons.tableButtonIcon
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Table'
                                    )
                                )
                            )
                        )
                    ),
                    modelForm,
                    modelConditions
                ),
                _react2.default.createElement(
                    _semanticUiReact.Modal.Actions,
                    null,
                    _react2.default.createElement(_semanticUiReact.Button, { content: 'Cancel', onClick: function onClick() {
                            return _this3.handleClose(true);
                        } })
                )
            );
        }
    }]);

    return ModelPickerModal;
}(_react.Component);

exports.default = ModelPickerModal;