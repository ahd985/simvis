'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _dataImport = require('./dataImport.jsx');

var _dataImport2 = _interopRequireDefault(_dataImport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopMenu = function (_Component) {
    _inherits(TopMenu, _Component);

    function TopMenu(props) {
        _classCallCheck(this, TopMenu);

        var _this = _possibleConstructorReturn(this, (TopMenu.__proto__ || Object.getPrototypeOf(TopMenu)).call(this, props));

        _this.state = {};

        _this.zoomLevels = [25, 50, 75, 100, 200, 300];
        _this.zoomLevelOptions = _this.zoomLevels.map(function (e, i) {
            return { key: i, value: e, text: e.toString() + "%" };
        });

        _this.handleSubmitClick = _this.handleSubmitClick.bind(_this);
        _this.handleZoom = _this.handleZoom.bind(_this);
        _this.handleHistoryChange = _this.handleHistoryChange.bind(_this);
        _this.handleLayerChange = _this.handleLayerChange.bind(_this);
        _this.handleDelete = _this.handleDelete.bind(_this);
        return _this;
    }

    _createClass(TopMenu, [{
        key: 'getCleanedSVG',
        value: function getCleanedSVG(el) {
            if (el.children.length > 0) {
                for (var i = el.children.length - 1; i >= 0; i--) {
                    var child = el.children[i];
                    if (child.classList.contains("ignore")) {
                        child.remove();
                    } else {
                        this.getCleanedSVG(child);
                    }
                }
            }

            // Remove unwanted classes
            el.removeAttribute('class');

            return el;
        }
    }, {
        key: 'handleSubmitClick',
        value: function handleSubmitClick() {
            // Grab and clean svg layout
            var svg = document.getElementById("draw-svg");
            var svgClone = svg.cloneNode(true);
            svgClone = this.getCleanedSVG(svgClone);
            svgClone.setAttribute("viewBox", '0 0 1000 666');

            // Grab model details
            var compiledModels = this.props.shapes.filter(function (shapeData) {
                if (shapeData.model) {
                    return true;
                } else {
                    return false;
                }
            }).map(function (shapeData) {
                return shapeData.model;
            });

            var output = _extends({
                elements: compiledModels,
                tree: svgClone.outerHTML,
                xSeriesIndex: this.props.xSeriesIndex
            }, this.props.overview);

            var csrftoken = _jsCookie2.default.get('csrftoken');

            // Async call for validation
            var self = this;
            (0, _axios2.default)({
                method: 'post',
                url: '/draw/validate_model',
                data: { output: output },
                headers: { "X-CSRFToken": csrftoken }
            }).then(function (response) {
                if (response.data.success) {
                    console.log(response.data);
                } else {
                    console.log(response.data.message);
                    self.setState({ message: "Lack of model data." });
                }
            }).catch(function (error) {
                self.setState({ message: "Bad server response.  Please try again." });
            });

            //var form = document.getElementById("ssv-submit");
            //var field = document.createElement("input");
            //field.setAttribute("name", "model");
            //field.setAttribute("value", JSON.stringify(output));
            //form.appendChild(field);
            //form.submit();
        }
    }, {
        key: 'handleZoom',
        value: function handleZoom(type, value) {
            var scale = this.props.layout.scale;
            if (type === "delta") {
                var i = this.zoomLevels.indexOf(scale);
                i = Math.max(Math.min(i + value, this.zoomLevels.length - 1), 0);
                this.props.setLayout("scale", this.zoomLevels[i]);
            } else {
                this.props.setLayout("scale", value);
            }
        }
    }, {
        key: 'handleHistoryChange',
        value: function handleHistoryChange(type) {
            if (type == 'undo') {
                this.props.undo();
            } else {
                this.props.redo();
            }
        }
    }, {
        key: 'handleLayerChange',
        value: function handleLayerChange(type) {
            if (type == 'up') {
                this.props.reorderShapes(1);
            } else {
                this.props.reorderShapes(-1);
            }
        }
    }, {
        key: 'handleDelete',
        value: function handleDelete() {
            this.props.removeShapes();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var message = void 0;
            if (this.state.message) {
                message = _react2.default.createElement(
                    _semanticUiReact.Message,
                    { id: 'submit-error-message', negative: true, attached: 'bottom', floating: true, onDismiss: function onDismiss() {
                            _this2.setState({ message: null });
                        }, compact: true },
                    _react2.default.createElement(
                        _semanticUiReact.Message.Header,
                        null,
                        'Error submitting file:'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        this.state.message
                    )
                );
            }

            return _react2.default.createElement(
                'div',
                null,
                message,
                _react2.default.createElement(
                    _semanticUiReact.Menu,
                    { inverted: true, id: 'header-container' },
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Menu,
                        { name: 'importOrEditData' },
                        _react2.default.createElement(_dataImport2.default, null)
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Menu,
                        { position: 'right' },
                        _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'submitData', onClick: this.handleSubmitClick })
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Menu,
                    { id: 'top-sidebar', size: 'mini' },
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        { name: 'zoomLevel' },
                        _react2.default.createElement(_semanticUiReact.Dropdown, { text: this.props.layout.scale.toString() + "%",
                            options: this.zoomLevelOptions,
                            onChange: function onChange(e, d) {
                                return _this2.handleZoom("select", d.value);
                            } })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        { className: 'no-border', name: 'zoomIn', onClick: function onClick() {
                                return _this2.handleZoom("delta", +1);
                            } },
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'zoom' })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        { name: 'zoomOut', onClick: function onClick() {
                                return _this2.handleZoom("delta", -1);
                            } },
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'zoom out' })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        { className: 'no-border', name: 'undo', onClick: function onClick() {
                                return _this2.handleHistoryChange("undo");
                            } },
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'undo' })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        { name: 'redo', onClick: function onClick() {
                                return _this2.handleHistoryChange("redo");
                            } },
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'flipped undo' })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        { className: 'no-border', name: 'layerUp', onClick: function onClick() {
                                return _this2.handleLayerChange("up");
                            } },
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'level up' })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        { name: 'layerDown', onClick: function onClick() {
                                return _this2.handleLayerChange("down");
                            } },
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'level down' })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        { name: 'delete', onClick: function onClick() {
                                return _this2.handleDelete();
                            } },
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'trash' })
                    )
                )
            );
        }
    }]);

    return TopMenu;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var shapeCollection = _ref.shapeCollection;
    return {
        shapes: shapeCollection.present.shapes,
        xSeriesIndex: shapeCollection.present.xSeriesIndex,
        overview: shapeCollection.present.overview,
        layout: shapeCollection.present.layout
    };
};

var mapDispatchToProps = {
    setLayout: _actions.setLayout,
    reorderShapes: _actions.reorderShapes,
    removeShapes: _actions.removeShapes,
    undo: _actions.undo,
    redo: _actions.redo
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TopMenu);