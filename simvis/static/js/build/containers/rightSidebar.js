'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _numberPicker = require('../components/numberPicker');

var _numberPicker2 = _interopRequireDefault(_numberPicker);

var _colorPickerModal = require('../components/colorPickerModal');

var _colorPickerModal2 = _interopRequireDefault(_colorPickerModal);

var _modelPickerModal = require('../components/modelPickerModal');

var _modelPickerModal2 = _interopRequireDefault(_modelPickerModal);

var _dataImport = require('./dataImport.jsx');

var _dataImport2 = _interopRequireDefault(_dataImport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RightSideBarMenu = function (_Component) {
    _inherits(RightSideBarMenu, _Component);

    function RightSideBarMenu(props) {
        _classCallCheck(this, RightSideBarMenu);

        var _this = _possibleConstructorReturn(this, (RightSideBarMenu.__proto__ || Object.getPrototypeOf(RightSideBarMenu)).call(this, props));

        _this.state = {
            visible: true,
            activeItem: 'model'
        };

        _this.handleTabClick = _this.handleTabClick.bind(_this);
        _this.handleStrokeWidthChange = _this.handleStrokeWidthChange.bind(_this);
        _this.handleFontSizeChange = _this.handleFontSizeChange.bind(_this);
        _this.handleOverviewChange = _this.handleOverviewChange.bind(_this);
        _this.handlePositionChange = _this.handlePositionChange.bind(_this);
        _this.handleDimChange = _this.handleDimChange.bind(_this);
        return _this;
    }

    _createClass(RightSideBarMenu, [{
        key: 'handleTabClick',
        value: function handleTabClick(e, _ref) {
            var name = _ref.name;

            this.setState({ activeItem: name });
        }
    }, {
        key: 'handleStrokeWidthChange',
        value: function handleStrokeWidthChange(e) {
            this.props.setShapeStyle({ strokeWidth: e.value + '' });
        }
    }, {
        key: 'handleFontSizeChange',
        value: function handleFontSizeChange(e) {
            this.props.setShapeStyle({ fontSize: e.value + '' });
        }
    }, {
        key: 'handleOverviewChange',
        value: function handleOverviewChange(e, arg) {
            e.persist ? e.persist() : null;
            this.props.setOverview(_extends({}, this.props.overview, _defineProperty({}, arg, e.value ? e.value : e.target.value)));
        }
    }, {
        key: 'handlePositionChange',
        value: function handlePositionChange(prop, val) {
            var deltaShapeSize = { x: 0, y: 0, width: 0, height: 0 };
            deltaShapeSize[prop] = val;
            this.props.resizeShapes(deltaShapeSize);
        }
    }, {
        key: 'handleDimChange',
        value: function handleDimChange(prop, val) {
            var deltaShapeSize = { x: 0, y: 0, width: 0, height: 0 };
            deltaShapeSize[prop] = val;
            this.props.resizeShapes(deltaShapeSize);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var visible = this.state.visible;
            var activeItem = this.state.activeItem;


            var style = { width: this.props.rightSideBarWidth, right: 0, textAlign: "center" };

            var styleEditable = true;
            var fillEditable = true;
            var modelEditable = true;
            var textEditable = true;
            var selectedShape = null;

            // Loop through shapes and see if any shape is not editable for style or text
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.shapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var shapeData = _step.value;

                    if (this.props.selectedShapes.indexOf(shapeData.uuid) > -1) {
                        var shape = shapeData.shape;
                        if (shape.editable) {
                            if (shape.editable.style == false) {
                                styleEditable = false;
                            }
                            if (shape.editable.fill == false) {
                                fillEditable = false;
                            }
                            if (shape.editable.text == false) {
                                textEditable = false;
                            }
                            if (shape.editable.model == false) {
                                modelEditable = false;
                            }
                        }
                        selectedShape = shapeData;
                    }
                }

                // Greater than one shape and we can't edit model
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

            if (this.props.selectedShapes.length > 1) {
                modelEditable = false;
            }

            // TODO - this isn't perfect
            activeItem == 'model' && modelEditable == false ? activeItem = 'style' : null;
            activeItem == 'style' && styleEditable == false ? activeItem = 'model' : null;
            activeItem == 'text' && textEditable == false ? activeItem = 'model' : null;

            var submenu = void 0,
                menu = void 0;
            if (!this.props.selectedShapes.length) {
                submenu = null;
                menu = _react2.default.createElement(
                    'div',
                    { id: 'right-sidebar', style: style },
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        { size: 'mini', attached: true },
                        'Overview'
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Form,
                        { size: 'small', style: { padding: 5 } },
                        _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'Title', name: 'title', type: 'text', placeholder: 'My Simulation', value: this.props.overview.title, onChange: function onChange(e) {
                                return _this2.handleOverviewChange(e, "title");
                            } }),
                        _react2.default.createElement(
                            _semanticUiReact.Form.Group,
                            { widths: 'equal' },
                            _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'X Series Unit', name: 'x_series_unit', type: 'text', placeholder: 'e.g., Hrs', value: this.props.overview.x_series_unit, onChange: function onChange(e) {
                                    return _this2.handleOverviewChange(e, "x_series_unit");
                                } }),
                            _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'Font Size', name: 'font_size', type: 'number', value: this.props.overview.font_size, onChange: function onChange(e) {
                                    return _this2.handleOverviewChange(e, "font_size");
                                }, min: 1, max: 72 })
                        )
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        { size: 'mini', attached: true },
                        'Layout'
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Form,
                        { size: 'small', style: { padding: 5 } },
                        _react2.default.createElement(
                            _semanticUiReact.Label,
                            { attached: 'top' },
                            'Width x Height'
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Form.Group,
                            { widths: 'equal' },
                            _react2.default.createElement(
                                _semanticUiReact.Form.Field,
                                null,
                                _react2.default.createElement(_semanticUiReact.Input, { labelPosition: 'right', label: 'px', name: 'diagram_width', type: 'number', value: this.props.diagramWidth, onChange: function onChange(e) {
                                        return _this2.props.setLayout("diagramWidth", parseInt(e.target.value));
                                    }, min: 1, max: 10000 })
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Form.Field,
                                null,
                                _react2.default.createElement(_semanticUiReact.Input, { labelPosition: 'right', label: 'px', name: 'diagram_height', type: 'number', value: this.props.diagramHeight, onChange: function onChange(e) {
                                        return _this2.props.setLayout("diagramHeight", parseInt(e.target.value));
                                    }, min: 1, max: 10000 })
                            )
                        )
                    )
                );
            } else {
                if (activeItem === 'model') {
                    if (!this.props.data) {
                        submenu = _react2.default.createElement(
                            _semanticUiReact.Segment,
                            { attached: 'bottom', className: 'shapes-selected-menu' },
                            _react2.default.createElement(
                                _semanticUiReact.Form,
                                { size: 'small', style: { padding: 5 }, as: 'none' },
                                _react2.default.createElement(
                                    _semanticUiReact.Form.Group,
                                    { widths: 'equal' },
                                    _react2.default.createElement(
                                        _semanticUiReact.Form.Field,
                                        null,
                                        _react2.default.createElement(_dataImport2.default, { asForm: true })
                                    )
                                )
                            )
                        );
                    } else {
                        // TODO - check for conflicting models
                        var selectedShapes = this.props.shapes.filter(function (shape) {
                            if (_this2.props.selectedShapes.includes(shape.uuid)) {
                                return true;
                            }

                            return false;
                        });

                        var selectedShapeData = selectedShapes[0];
                        var selectedModel = selectedShapeData.model;
                        var allowedModels = selectedShapeData.shape.allowedModels;
                        var allowedConditions = selectedShapeData.shape.allowedConditions;

                        submenu = _react2.default.createElement(
                            _semanticUiReact.Segment,
                            { attached: 'bottom', className: 'shapes-selected-menu' },
                            _react2.default.createElement(
                                _semanticUiReact.Form,
                                { size: 'small', style: { padding: 5 }, as: 'none' },
                                _react2.default.createElement(_modelPickerModal2.default, { allowedModels: allowedModels, allowedConditions: allowedConditions, model: selectedModel, setShapeModel: this.props.setShapeModel, ids: this.props.selectedShapes, data: this.props.data, dataHeaders: this.props.dataHeaders })
                            )
                        );
                    }
                } else if (activeItem === 'style') {
                    submenu = _react2.default.createElement(
                        _semanticUiReact.Segment,
                        { attached: 'bottom', className: 'shapes-selected-menu' },
                        _react2.default.createElement(
                            _semanticUiReact.Form,
                            { size: 'small', style: { padding: 5 }, as: 'none' },
                            _react2.default.createElement(
                                _semanticUiReact.Form.Group,
                                { widths: 'equal' },
                                fillEditable ? _react2.default.createElement(
                                    _semanticUiReact.Form.Field,
                                    null,
                                    _react2.default.createElement(_colorPickerModal2.default, { color: this.props.selectedStyle.fill,
                                        setShapeStyle: this.props.setShapeStyle, desc: 'Fill', attr: 'fill' })
                                ) : null,
                                _react2.default.createElement(
                                    _semanticUiReact.Form.Field,
                                    null,
                                    _react2.default.createElement(_colorPickerModal2.default, { color: this.props.selectedStyle.stroke, setShapeStyle: this.props.setShapeStyle, desc: 'Stroke', attr: 'stroke' })
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Form.Group,
                                { widths: '10' },
                                _react2.default.createElement(_semanticUiReact.Form.Field, { width: '10', control: _numberPicker2.default, label: 'Stroke-Width',
                                    name: "strokeWidthPicker",
                                    value: this.props.selectedStyle.strokeWidth ? this.props.selectedStyle.strokeWidth : 0,
                                    onChange: this.handleStrokeWidthChange,
                                    min: 0 })
                            )
                        )
                    );
                } else if (activeItem === 'text') {
                    submenu = _react2.default.createElement(
                        _semanticUiReact.Segment,
                        { attached: 'bottom', className: 'shapes-selected-menu' },
                        _react2.default.createElement(
                            _semanticUiReact.Form,
                            { size: 'small', style: { padding: 5 }, as: 'none' },
                            _react2.default.createElement(
                                _semanticUiReact.Form.Group,
                                { widths: 'equal' },
                                _react2.default.createElement(
                                    _semanticUiReact.Form.Field,
                                    null,
                                    _react2.default.createElement(_colorPickerModal2.default, { color: this.props.selectedStyle.color, setShapeStyle: this.props.setShapeStyle, desc: 'Color', attr: 'color' })
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Form.Group,
                                { widths: '10' },
                                _react2.default.createElement(_semanticUiReact.Form.Field, { width: '10', control: _numberPicker2.default, label: 'Font-Size',
                                    name: "fontSizePicker",
                                    value: this.props.selectedStyle.fontSize ? this.props.selectedStyle.fontSize : 0,
                                    onChange: this.handleFontSizeChange,
                                    min: 0 })
                            )
                        )
                    );
                } else if (activeItem === 'dimension') {
                    (function () {
                        var x = selectedShape.position.x;
                        var y = selectedShape.position.y;
                        var width = selectedShape.dims.width + selectedShape.deltaDims.width;
                        var height = selectedShape.dims.height + selectedShape.deltaDims.height;
                        submenu = _react2.default.createElement(
                            _semanticUiReact.Segment,
                            { attached: 'bottom', className: 'shapes-selected-menu' },
                            _react2.default.createElement(
                                _semanticUiReact.Form,
                                { size: 'small', style: { padding: 5 } },
                                _react2.default.createElement(
                                    _semanticUiReact.Form.Group,
                                    { widths: 6 },
                                    _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'X', type: 'number', value: x, onChange: function onChange(e, f) {
                                            return _this2.handlePositionChange('x', f.value - x);
                                        } }),
                                    _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'Y', type: 'number', value: y, onChange: function onChange(e, f) {
                                            return _this2.handlePositionChange('y', f.value - y);
                                        } })
                                ),
                                _react2.default.createElement(
                                    _semanticUiReact.Form.Group,
                                    { widths: 6 },
                                    _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'Width', name: 'width', type: 'number', value: width, onChange: function onChange(e, f) {
                                            return _this2.handleDimChange('width', f.value - width);
                                        } }),
                                    _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'Height', name: 'height', type: 'number', value: height, onChange: function onChange(e, f) {
                                            return _this2.handleDimChange('height', f.value - height);
                                        } })
                                )
                            )
                        );
                    })();
                }

                menu = _react2.default.createElement(
                    'div',
                    { id: 'right-sidebar', style: style },
                    _react2.default.createElement(
                        _semanticUiReact.Menu,
                        { attached: 'top', tabular: true },
                        modelEditable ? _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'model', active: activeItem === 'model', onClick: this.handleTabClick }) : null,
                        styleEditable ? _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'style', active: activeItem === 'style', onClick: this.handleTabClick }) : null,
                        textEditable ? _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'text', active: activeItem === 'text', onClick: this.handleTabClick }) : null,
                        this.props.selectedShapes.length == 1 ? _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'dims', active: activeItem === 'dims', onClick: this.handleTabClick }) : null
                    ),
                    submenu
                );
            }

            return this.props.rightSideBarPresent ? menu : null;
        }
    }]);

    return RightSideBarMenu;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref2) {
    var shapeCollection = _ref2.shapeCollection;
    return {
        selectedShapes: shapeCollection.present.selectedShapes,
        shapes: shapeCollection.present.shapes,
        selectedStyle: shapeCollection.present.selectedStyle,
        dataHeaders: shapeCollection.present.dataHeaders,
        data: shapeCollection.present.data,
        rightSideBarWidth: shapeCollection.present.layout.rightSideBarWidth,
        rightSideBarPresent: shapeCollection.present.layout.rightSideBarPresent,
        overview: shapeCollection.present.overview,
        diagramWidth: shapeCollection.present.layout.diagramWidth,
        diagramHeight: shapeCollection.present.layout.diagramHeight
    };
};

var mapDispatchToProps = {
    setShapeStyle: _actions.setShapeStyle,
    setShapeModel: _actions.setShapeModel,
    setOverview: _actions.setOverview,
    setLayout: _actions.setLayout,
    resizeShapes: _actions.resizeShapes
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RightSideBarMenu);