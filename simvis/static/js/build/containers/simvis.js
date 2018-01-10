'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _semanticUiReact = require('semantic-ui-react');

var _index = require('../actions/index.jsx');

var _drawContainer = require('./drawContainer.jsx');

var _drawContainer2 = _interopRequireDefault(_drawContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimVis = function (_Component) {
    _inherits(SimVis, _Component);

    function SimVis(props) {
        _classCallCheck(this, SimVis);

        var _this = _possibleConstructorReturn(this, (SimVis.__proto__ || Object.getPrototypeOf(SimVis)).call(this, props));

        _this.handleKeyDown = _this.handleKeyDown.bind(_this);

        document.addEventListener("keydown", _this.handleKeyDown);
        return _this;
    }

    _createClass(SimVis, [{
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var key = e.keyCode || e.charCode;

            if (!this.props.editActive) {
                // Allow shape deleting if delete or backspace is pressed
                if (key == 8 || key == 46) {
                    this.props.removeShapes();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_drawContainer2.default, {
                shapes: this.props.shapes,
                selectedShapes: this.props.selectedShapes,
                selectedStyle: this.props.selectedStyle });
        }
    }]);

    return SimVis;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var shapeCollection = _ref.shapeCollection;
    return {
        shapes: shapeCollection.present.shapes,
        selectedShapes: shapeCollection.present.selectedShapes,
        selectedStyle: shapeCollection.present.selectedStyle,
        editActive: shapeCollection.present.editActive
    };
};

var mapDispatchToProps = {
    removeShapes: _index.removeShapes
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SimVis);