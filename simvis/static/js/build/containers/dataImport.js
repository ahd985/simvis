'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _reactRedux = require('react-redux');

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

require('superagent-django-csrf');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Handsontable from 'handsontable/dist/handsontable.full'

var ImportDataModal = function (_Component) {
    _inherits(ImportDataModal, _Component);

    function ImportDataModal(props) {
        _classCallCheck(this, ImportDataModal);

        var _this = _possibleConstructorReturn(this, (ImportDataModal.__proto__ || Object.getPrototypeOf(ImportDataModal)).call(this, props));

        _this.state = {
            firstModalOpen: false,
            secondModalOpen: false,
            data: null,
            //hot:null,
            xSeriesIndex: _this.props.xSeriesIndex ? _this.props.xSeriesIndex : 0
        };

        _this.onDrop = _this.onDrop.bind(_this);
        _this.openFirstModal = _this.openFirstModal.bind(_this);
        _this.openSecondModal = _this.openSecondModal.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.addData = _this.addData.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleErase = _this.handleErase.bind(_this);
        return _this;
    }

    _createClass(ImportDataModal, [{
        key: 'onDrop',
        value: function onDrop(files) {
            var data = new FormData();
            data.append('file', files[0], files[0].name);

            var addData = this.addData;

            var req = _superagent2.default.post('data-upload').send(data).end(function (err, res) {
                // TODO - error catching
                addData(res.body.data);
            });

            this.openSecondModal();
        }
    }, {
        key: 'openFirstModal',
        value: function openFirstModal() {
            if (this.state.data) {
                this.setState({
                    firstModalOpen: true,
                    secondModalOpen: true
                });
            } else {
                this.setState({
                    firstModalOpen: true
                });
            }
        }
    }, {
        key: 'openSecondModal',
        value: function openSecondModal() {
            this.setState({
                secondModalOpen: true
            });
        }
    }, {
        key: 'close',
        value: function close(data) {
            if (data) {
                this.props.setData(data.slice(1), data[0], this.state.xSeriesIndex);
            }

            this.setState({
                secondModalOpen: false,
                firstModalOpen: false
            });
        }
    }, {
        key: 'addData',
        value: function addData(data) {
            this.setState({
                data: data
            });
        }
    }, {
        key: 'handleClick',
        value: function handleClick(index) {
            this.setState({ xSeriesIndex: index });
        }
    }, {
        key: 'handleErase',
        value: function handleErase() {
            this.props.clearData();
            this.setState({
                data: null,
                xSeriesIndex: 0,
                secondModalOpen: false,
                firstModalOpen: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                firstModalOpen = _state.firstModalOpen,
                secondModalOpen = _state.secondModalOpen,
                data = _state.data;

            //let secondModalContent = <div id="hot-container"></div>;

            var secondModalContent = null;
            //var self = this;
            if (this.state.data) {
                (function () {
                    var selectedHeader = "XAxis";
                    var nonSelectedHeader = "YData";
                    var selectedCellClass = "selected-cell";
                    var nonSelectedCellClass = "non-selected-cell";
                    var rowLen = _this2.state.data[0].length;

                    secondModalContent = _react2.default.createElement(
                        'div',
                        { id: 'data-table' },
                        _react2.default.createElement(
                            _semanticUiReact.Table,
                            { celled: true },
                            _react2.default.createElement(
                                _semanticUiReact.Table.Header,
                                null,
                                _react2.default.createElement(
                                    _semanticUiReact.Table.Row,
                                    { textAlign: 'center' },
                                    _react2.default.createElement(_semanticUiReact.Table.HeaderCell, null),
                                    _this2.state.data[0].map(function (e, i) {
                                        return _react2.default.createElement(
                                            _semanticUiReact.Table.HeaderCell,
                                            { key: i },
                                            _react2.default.createElement(
                                                _semanticUiReact.Button,
                                                { className: 'xaxis-btn', onClick: function onClick() {
                                                        return _this2.handleClick(i);
                                                    } },
                                                i == _this2.state.xSeriesIndex ? selectedHeader : nonSelectedHeader
                                            )
                                        );
                                    })
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Table.Body,
                                null,
                                _this2.state.data.map(function (row, i) {
                                    var rowDescription = void 0;
                                    if (i == 0) {
                                        rowDescription = "Data";
                                    } else if (i == 1) {
                                        rowDescription = "Min Val";
                                    } else if (i == 2) {
                                        rowDescription = "Max Val";
                                    }

                                    return _react2.default.createElement(
                                        _semanticUiReact.Table.Row,
                                        { key: i },
                                        _react2.default.createElement(
                                            _semanticUiReact.Table.Cell,
                                            null,
                                            _react2.default.createElement(
                                                _semanticUiReact.Header,
                                                null,
                                                rowDescription
                                            )
                                        ),
                                        row.map(function (e, j) {
                                            return _react2.default.createElement(
                                                _semanticUiReact.Table.Cell,
                                                { key: j, active: j == _this2.state.xSeriesIndex },
                                                e
                                            );
                                        })
                                    );
                                })
                            )
                        )
                    );

                    /*
                    if (!this.state.hot) {
                        const container = document.getElementById('hot-container');
                        this.state.hot = new Handsontable(container, {
                            data:data,
                            rowHeaders: true,
                            colHeaders: (col) => {
                                return "<button id=\"colIndex\" value=\"" + col + "\">" + col + "</button>";
                            },
                            stretchH: "all",
                            contextMenu: {
                                callback: function (key, options) {
                                    if (key === 'header_add') {
                                        var selected_row = self.state.hot.getSelected()[0];
                                        var header = self.state.hot.getDataAtRow(0);
                                        var header_add = self.state.hot.getDataAtRow(selected_row);
                                        header = header.map(function(e, i) {
                                            return header_add[i] != "" ? e + ", " + header_add[i] : e
                                        });
                                         self.state.hot.alter('remove_row', selected_row);
                                        header.map(function(e, i) {
                                            self.state.hot.setDataAtCell(0, i, e)
                                        });
                                    }
                                },
                                items: {
                                    "header_add": {
                                        name: 'Add to header',
                                        disabled: function () {
                                            // if first row, disable this option
                                            return self.state.hot.getSelected()[0] === 0;
                                        }
                                    }
                                }
                            },
                            cells: function (row, col, prop) {
                                var cellProperties = {};
                                 if (row > 0) {
                                    cellProperties.readOnly = true;
                                }
                                 if (col == self.state.xSeriesIndex) {
                                    this.renderer = function(instance, td) {
                                        Handsontable.renderers.TextRenderer.apply(this, arguments);
                                        td.style.backgroundColor = 'green';
                                    }
                                } else {
                                    this.renderer = function(instance, td) {
                                        Handsontable.renderers.TextRenderer.apply(this, arguments);
                                        td.style.backgroundColor = null;
                                    }
                                }
                                 return cellProperties;
                            }
                        });
                         Handsontable.Dom.addEvent(container, 'click', function (event) {
                            if (event.target.id == 'colIndex') {
                                self.setState({
                                    xSeriesIndex:event.target.value
                                });
                                self.state.hot.render();
                            }
                        })
                    }
                    */
                })();
            }

            var trigger = void 0;
            if (this.props.asForm) {
                trigger = _react2.default.createElement(
                    _semanticUiReact.Button,
                    { onClick: this.openFirstModal },
                    'Import Data'
                );
            } else {
                trigger = _react2.default.createElement(
                    _semanticUiReact.Menu.Item,
                    { onClick: this.openFirstModal },
                    'Import or Edit Data'
                );
            }

            return _react2.default.createElement(
                _semanticUiReact.Modal,
                { trigger: trigger, size: 'small', open: firstModalOpen, onClose: function onClose() {
                        return _this2.close(null);
                    } },
                _react2.default.createElement(
                    _semanticUiReact.Modal.Header,
                    null,
                    'Import Data'
                ),
                _react2.default.createElement(
                    _semanticUiReact.Modal.Content,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Modal.Description,
                        null,
                        _react2.default.createElement(
                            _reactDropzone2.default,
                            { onDrop: this.onDrop, multiple: false, className: 'dropzone' },
                            _react2.default.createElement(
                                'div',
                                { className: 'dropzone-area' },
                                'Try dropping some files here, or click to select files to upload.'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Modal.Actions,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Modal,
                        { dimmer: false, open: secondModalOpen, onOpen: this.openSecondModal, size: 'small' },
                        _react2.default.createElement(
                            _semanticUiReact.Modal.Header,
                            null,
                            'Data Manipulation',
                            _react2.default.createElement(
                                _semanticUiReact.Button,
                                { icon: true, floated: 'right', onClick: this.handleErase },
                                _react2.default.createElement(_semanticUiReact.Icon, { name: 'erase' })
                            )
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Modal.Content,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Message,
                                null,
                                _react2.default.createElement(
                                    _semanticUiReact.Message.Header,
                                    null,
                                    'We did our best to import your data as intended.  Select the column that represents your X-Series Data.'
                                )
                            ),
                            secondModalContent
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Modal.Actions,
                            null,
                            _react2.default.createElement(_semanticUiReact.Button, { content: 'All Done', onClick: function onClick() {
                                    return _this2.close(_this2.state.data);
                                } })
                        )
                    )
                )
            );
        }
    }]);

    return ImportDataModal;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var shapeCollection = _ref.shapeCollection;
    return {
        xSeriesIndex: shapeCollection.present.xSeriesIndex
    };
};

var mapDispatchToProps = {
    setData: _actions.setData,
    clearData: _actions.clearData
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImportDataModal);