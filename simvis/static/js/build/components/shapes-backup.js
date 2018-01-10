'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shapeElements = require('./shapeElements.jsx');

var _shapeElements2 = _interopRequireDefault(_shapeElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultBBox = { x0: 0, y0: 0, w0: 100, h0: 100 };

var Rectangle = function (_Component) {
    _inherits(Rectangle, _Component);

    function Rectangle(props) {
        _classCallCheck(this, Rectangle);

        return _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, props));
    }

    _createClass(Rectangle, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: defaultBBox, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Rect, { x: 0, y: 0, height: 100, width: 100, id: "element" }),
                _react2.default.createElement(_shapeElements.StaticText, { x: 50, y: 50, height: 100, width: 100, id: "element", text: 'CELL', style: { stroke: "black", strokeWidth: 1, fontSize: 18 }, ignore: true })
            );
        }
    }]);

    return Rectangle;
}(_react.Component);

var CircleSimple = function (_Component2) {
    _inherits(CircleSimple, _Component2);

    function CircleSimple(props) {
        _classCallCheck(this, CircleSimple);

        return _possibleConstructorReturn(this, (CircleSimple.__proto__ || Object.getPrototypeOf(CircleSimple)).call(this, props));
    }

    _createClass(CircleSimple, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: defaultBBox, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Circle, { cx: 50, cy: 50, r: 50, id: "element" }),
                _react2.default.createElement(_shapeElements.StaticText, { x: 50, y: 50, height: 100, width: 100, id: "element", text: 'CELL', style: { stroke: "black", strokeWidth: 1, fontSize: 18 }, ignore: true })
            );
        }
    }]);

    return CircleSimple;
}(_react.Component);

var defaultTextBBox = { x0: 0, y0: 0, w0: 40, h0: 40 };

var TextBox = function (_Component3) {
    _inherits(TextBox, _Component3);

    function TextBox(props) {
        _classCallCheck(this, TextBox);

        return _possibleConstructorReturn(this, (TextBox.__proto__ || Object.getPrototypeOf(TextBox)).call(this, props));
    }

    _createClass(TextBox, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: defaultTextBBox, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.EditableText, { x: 0, y: 0, height: 40, width: 40, id: "element", editActive: this.props.editActive })
            );
        }
    }]);

    return TextBox;
}(_react.Component);

var Content = function (_Component4) {
    _inherits(Content, _Component4);

    function Content(props) {
        _classCallCheck(this, Content);

        return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));
    }

    _createClass(Content, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: defaultBBox, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Rect, { x: 0, y: 0, height: 100, width: 100, ignore: true }),
                _react2.default.createElement(_shapeElements.Path, { style: { fill: "none" }, ignore: true, d: 'm 70.004212,85.994758 20.996948,0 0,4.99886 -20.996948,0 z m 0,-13.996807 20.996948,0 0,4.998861 -20.996948,0 z m 0,-13.996807 20.996948,0 0,4.99886 -20.996948,0 z m -11.998255,27.993614 4.999273,0 0,4.99886 -4.999273,0 z m 0,-13.996807 4.999273,0 0,4.998861 -4.999273,0 z m 0,-13.996807 4.999273,0 0,4.99886 -4.999273,0 z M 57.50603,8.2142781 l 34.994911,0 0,4.7971309 -34.994911,0 z m 23.496584,5.7969019 0,27.993614 M 69.004358,14.01118 l 0,27.993614 M 57.5,33.006846 l 34.501014,0 M 57.5,23.009128 l 34.501014,0 m -34.494984,-9.497834 34.994911,0 0,28.993386 -34.994911,0 z m -42.479582,69.484049 18.970563,0 m -18.970563,-3.999088 18.970563,0 m -18.970563,-3.999088 18.970563,0 m -18.980827,-3.999088 18.970564,0 m -23.973814,-12.996931 22.996657,0 0,5.998628 0,-5.998628 5.999128,5.998628 -5.999128,0 5.999128,0 0,25.994074 -28.995785,0 z m 24.996367,-42.990196 4.999272,0 0,4.99886 m -26.996074,16.996122 11.998255,-16.996122 4.999273,4.998859 9.998546,-9.997719 m -29.995639,-4.99886 0,29.993157 29.995639,0 M 50.514502,1.0203109 50.514295,98.985627 M 1.0152345,49.503085 l 97.4694825,0 M 1.0142426,1.0141452 l 97.9857524,0 0,97.9776478 -97.9857524,0 0,-97.9776478' })
            );
        }
    }]);

    return Content;
}(_react.Component);

var VerticalTank = function (_Component5) {
    _inherits(VerticalTank, _Component5);

    function VerticalTank(props) {
        _classCallCheck(this, VerticalTank);

        return _possibleConstructorReturn(this, (VerticalTank.__proto__ || Object.getPrototypeOf(VerticalTank)).call(this, props));
    }

    _createClass(VerticalTank, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: { x0: 0, y0: 0, w0: 50, h0: 100 }, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Path, { id: "element", d: 'M0 73.1L0 26.8C0 12 11.2 0 25 0 38.8 0 50 12.1 50 26.9L50 71.8C50 89 38.5 99.8 25 100 11.2 100.2 0 88 0 73.1Z' })
            );
        }
    }]);

    return VerticalTank;
}(_react.Component);

var HorizontalTank = function (_Component6) {
    _inherits(HorizontalTank, _Component6);

    function HorizontalTank(props) {
        _classCallCheck(this, HorizontalTank);

        return _possibleConstructorReturn(this, (HorizontalTank.__proto__ || Object.getPrototypeOf(HorizontalTank)).call(this, props));
    }

    _createClass(HorizontalTank, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: { x0: 0, y0: 0, w0: 100, h0: 50 }, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Path, { id: "element", d: 'M 73.149 50 L 26.848 50 C 12.028 50 0 38.787 0 25.022 C 0 11.236 12.052 0.024 26.873 0.024 L 71.751 0 C 89.011 0.035 99.755 11.542 99.996 25 C 100.245 38.784 87.969 49.975 73.149 50 Z' })
            );
        }
    }]);

    return HorizontalTank;
}(_react.Component);

var Pump = function (_Component7) {
    _inherits(Pump, _Component7);

    function Pump(props) {
        _classCallCheck(this, Pump);

        return _possibleConstructorReturn(this, (Pump.__proto__ || Object.getPrototypeOf(Pump)).call(this, props));
    }

    _createClass(Pump, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: { x0: 0, y0: 0, w0: 100, h0: 90 }, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Path, { id: "element", d: 'm 57,45.00006 c -10e-7,6.627417 -5.372583,12 -12,12 -6.627417,0 -11.999999,-5.372583 -12,-12 10e-7,-6.627417 5.372583,-12 12,-12 6.627417,0 11.999999,5.372583 12,12 z M 87,45 C 87,68.19596 68.195959,87 45,87 21.804041,87 3,68.19596 3,45 3,21.80404 21.804041,3 45,3 l 0,3e-5 52,0 L 97,45 70,45 Z' })
            );
        }
    }]);

    return Pump;
}(_react.Component);

var Valve = function (_Component8) {
    _inherits(Valve, _Component8);

    function Valve(props) {
        _classCallCheck(this, Valve);

        return _possibleConstructorReturn(this, (Valve.__proto__ || Object.getPrototypeOf(Valve)).call(this, props));
    }

    _createClass(Valve, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: { x0: 0, y0: 0, w0: 100, h0: 50 }, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Path, { 'static': true, d: 'M 99.493626,0.00117876 67,16.828379 l 0,16.8272 32.493626,15.8373 M 32.177961,33.655579 0.5,49.492879 0.5,0.00117876 32.177961,16.828379 Z m 67.315665,-33.65440024 0,49.49170024' }),
                _react2.default.createElement(_shapeElements.Circle, { id: "element", cx: 50, cy: 25, r: 20.5 })
            );
        }
    }]);

    return Valve;
}(_react.Component);

var VerticalBarrier = function (_Component9) {
    _inherits(VerticalBarrier, _Component9);

    function VerticalBarrier(props) {
        _classCallCheck(this, VerticalBarrier);

        return _possibleConstructorReturn(this, (VerticalBarrier.__proto__ || Object.getPrototypeOf(VerticalBarrier)).call(this, props));
    }

    _createClass(VerticalBarrier, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: { x0: 0, y0: 0, w0: 1, h0: 100 }, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Path, { d: 'M 0.1,0.1 l 0.1,100' })
            );
        }
    }]);

    return VerticalBarrier;
}(_react.Component);

var HorizontalBarrier = function (_Component10) {
    _inherits(HorizontalBarrier, _Component10);

    function HorizontalBarrier(props) {
        _classCallCheck(this, HorizontalBarrier);

        return _possibleConstructorReturn(this, (HorizontalBarrier.__proto__ || Object.getPrototypeOf(HorizontalBarrier)).call(this, props));
    }

    _createClass(HorizontalBarrier, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: { x0: 0, y0: 0, w0: 100, h0: 1 }, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Path, { d: 'M 0.1,0.1 l 100,0.1' })
            );
        }
    }]);

    return HorizontalBarrier;
}(_react.Component);

var skewedRoundBBox = { x0: 0, y0: 0, w0: 100, h0: 50 };

var SkewedRound = function (_Component11) {
    _inherits(SkewedRound, _Component11);

    function SkewedRound(props) {
        _classCallCheck(this, SkewedRound);

        return _possibleConstructorReturn(this, (SkewedRound.__proto__ || Object.getPrototypeOf(SkewedRound)).call(this, props));
    }

    _createClass(SkewedRound, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: skewedRoundBBox, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Ellipse, { cx: 50, cy: 25, rx: 50, ry: 25, id: "element" })
            );
        }
    }]);

    return SkewedRound;
}(_react.Component);

var lineBBox = { x0: 0, y0: 0, w0: 100, h0: 1 };

var Line = function (_Component12) {
    _inherits(Line, _Component12);

    function Line(props) {
        _classCallCheck(this, Line);

        return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, props));
    }

    _createClass(Line, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: defaultBBox, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Path, { d: 'M5,5 L90,0 0,90 -90,0 0,-90' })
            );
        }
    }]);

    return Line;
}(_react.Component);

var circleInBox = function (_Component13) {
    _inherits(circleInBox, _Component13);

    function circleInBox(props) {
        _classCallCheck(this, circleInBox);

        return _possibleConstructorReturn(this, (circleInBox.__proto__ || Object.getPrototypeOf(circleInBox)).call(this, props));
    }

    _createClass(circleInBox, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: defaultBBox, dObject: this.props.dObject },
                _react2.default.createElement(_shapeElements.Rect, { x: 0, y: 0, height: 100, width: 100 }),
                _react2.default.createElement(_shapeElements.Circle, { cx: 25, cy: 50, r: 25 })
            );
        }
    }]);

    return circleInBox;
}(_react.Component);

var pathInBox = function (_Component14) {
    _inherits(pathInBox, _Component14);

    function pathInBox(props) {
        _classCallCheck(this, pathInBox);

        return _possibleConstructorReturn(this, (pathInBox.__proto__ || Object.getPrototypeOf(pathInBox)).call(this, props));
    }

    _createClass(pathInBox, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _shapeElements2.default,
                { objectBBox: defaultBBox, dObject: this.props.dObject, editActive: this.props.editActive },
                _react2.default.createElement(_shapeElements.Rect, { x: 0, y: 0, height: 100, width: 100 }),
                _react2.default.createElement(_shapeElements.Path, { d: 'M0,50 l25,0 25,25 50,-75' })
            );
        }
    }]);

    return pathInBox;
}(_react.Component);

var defaultModelPlacementOpts = {
    style: { fill: "#BDBDBD", stroke: "black", strokeWidth: 1, cursor: "move", color: "black", fontSize: 12, fillOpacity: 0.3 }
};

function createShape(bbox, svgElements) {
    return _react2.default.createElement(
        _shapeElements2.default,
        { objectBBox: defaultBBox },
        svgElements.map(function (e, i) {
            var TagName = e.tag;
            return _react2.default.createElement(TagName, _extends({}, e, { key: 'i' }));
        })
    );
}

var zz = createShape(defaultBBox, [{ tag: _shapeElements.Rect, x: 0, y: 0, height: 100, width: 100 }]);
console.log(zz);

exports.default = [{ name: "Nodes", shapes: [_extends({ name: "Rectangle", tag: zz, bbox: defaultBBox, ratioLock: false, description: "A simple rectangle.", allowedModels: ['cell'], editable: { text: false, fill: false } }, defaultModelPlacementOpts), _extends({ name: "Circle", tag: CircleSimple, bbox: defaultBBox, ratioLock: true, description: "A simple circle.", allowedModels: ['cell'], editable: { text: false, fill: false } }, defaultModelPlacementOpts)] }, { name: "Annotation", shapes: [{ name: "Text", tag: TextBox, bbox: defaultTextBBox, ratioLock: false, description: "A text box.", style: { stroke: "none", fill: "none", fontSize: 12 }, iconStyle: { stroke: "none", fill: "none" }, editable: { model: false } }, _extends({ name: "Content", tag: Content, bbox: defaultBBox, ratioLock: false, description: "Legend, table, or reports.", allowedModels: ['report', 'table', 'legend'], editable: { text: false, style: false } }, defaultModelPlacementOpts)] }, { name: "Equipment", shapes: [_extends({ name: "Vertical Tank", tag: VerticalTank, bbox: { x0: 0, y0: 0, w0: 50, h0: 100 }, ratioLock: false, description: "A simple vertical tank.", allowedModels: ['cell'], editable: { text: false, fill: false } }, defaultModelPlacementOpts), _extends({ name: "Horizontal Tank", tag: HorizontalTank, bbox: { x0: 0, y0: 0, w0: 100, h0: 50 }, ratioLock: false, description: "A simple horizontal tank.", allowedModels: ['cell'], editable: { text: false, fill: false } }, defaultModelPlacementOpts), _extends({ name: "Pump", tag: Pump, bbox: { x0: 0, y0: 0, w0: 100, h0: 90 }, ratioLock: true, description: "A simple pump.", allowedModels: ['cell'], editable: { text: false, fill: false } }, defaultModelPlacementOpts), _extends({ name: "Valve", tag: Valve, bbox: { x0: 0, y0: 0, w0: 100, h0: 50 }, ratioLock: true, description: "A simple valve.", allowedModels: ['cell'], editable: { text: false, fill: false } }, defaultModelPlacementOpts)] }, { name: "Barriers", shapes: [{ name: "Vertical Barrier", tag: VerticalBarrier, bbox: { x0: 0, y0: 0, w0: 0, h0: 100 }, moveHorizontal: false, description: "A simple vertical barrier.", lineOutline: true }, { name: "Horizontal Barrier", tag: HorizontalBarrier, bbox: { x0: 0, y0: 0, w0: 100, h0: 0 }, moveVertical: false, description: "A simple horizontal barrier.", lineOutline: true }] }, { name: "Pipes", shapes: [{ name: "Vertical Pipe", tag: Rectangle, bbox: defaultBBox, ratioLock: false, description: "A simple vertical pipe." }, { name: "Horizontal Pipe", tag: Rectangle, bbox: defaultBBox, ratioLock: false, description: "A simple horizontal pipe." }] }, { name: "Heatmaps", shapes: [{ name: "Rectangular Heatmap", tag: Rectangle, bbox: defaultBBox, ratioLock: false, description: "A rectangular heatmap." }] }, { name: "Indicators", shapes: [{ name: "Toggle", tag: Rectangle, bbox: defaultBBox, ratioLock: false, description: "A two-state toggle." }, { name: "Fire", tag: Rectangle, bbox: defaultBBox, ratioLock: false, description: "A fire." }] }];