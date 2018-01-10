'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Path = exports.Ellipse = exports.Circle = exports.StaticText = exports.EditableText = exports.Rect = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _svgpath = require('svgpath');

var _svgpath2 = _interopRequireDefault(_svgpath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rect = exports.Rect = function (_PureComponent) {
    _inherits(Rect, _PureComponent);

    function Rect(props) {
        _classCallCheck(this, Rect);

        return _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this, props));
    }

    _createClass(Rect, [{
        key: 'render',
        value: function render() {
            var _props$objectBBox = this.props.objectBBox,
                x0 = _props$objectBBox.x0,
                y0 = _props$objectBBox.y0,
                h0 = _props$objectBBox.h0,
                w0 = _props$objectBBox.w0;
            var _props$dObject = this.props.dObject,
                dX = _props$dObject.dX,
                dY = _props$dObject.dY,
                scale = _props$dObject.scale;

            var height = this.props.height * scale;
            var width = this.props.width * scale;
            var x = this.props.x * scale;
            var y = this.props.y * scale;

            var x1 = x + width;
            var y1 = y + height;
            var dDX = dX * (x1 - x0) / w0;
            var dDY = dY * (y1 - y0) / h0;

            // Calculate split fraction to adjust x / width and y / height
            var xFrac = (x - x0) / (x1 - x0);
            var yFrac = (y - y0) / (y1 - y0);

            x = x + xFrac * dDX;
            y = y + yFrac * dDY;
            width = width + (1 - xFrac) * dDX;
            height = height + (1 - yFrac) * dDY;

            var attr = {
                x: x,
                y: y,
                rx: this.props.rx,
                ry: this.props.ry,
                height: height,
                width: width
            };

            return _react2.default.createElement('rect', _extends({}, attr, { id: this.props.id, className: (this.props.ignore ? "ignore" : "") + ' ' + (this.props.static ? "static" : "") }));
        }
    }]);

    return Rect;
}(_react.PureComponent);

Rect.propTypes = {
    x: _react2.default.PropTypes.any.isRequired,
    y: _react2.default.PropTypes.any.isRequired,
    height: _react2.default.PropTypes.any.isRequired,
    width: _react2.default.PropTypes.any.isRequired
};

Rect.defaultProps = {
    rx: 0,
    ry: 0
};

var EditableText = exports.EditableText = function (_PureComponent2) {
    _inherits(EditableText, _PureComponent2);

    function EditableText(props) {
        _classCallCheck(this, EditableText);

        return _possibleConstructorReturn(this, (EditableText.__proto__ || Object.getPrototypeOf(EditableText)).call(this, props));
    }

    _createClass(EditableText, [{
        key: 'render',
        value: function render() {
            var _props$objectBBox2 = this.props.objectBBox,
                x0 = _props$objectBBox2.x0,
                y0 = _props$objectBBox2.y0,
                h0 = _props$objectBBox2.h0,
                w0 = _props$objectBBox2.w0;
            var _props$dObject2 = this.props.dObject,
                dX = _props$dObject2.dX,
                dY = _props$dObject2.dY,
                scale = _props$dObject2.scale;

            var height = this.props.height * scale;
            var width = this.props.width * scale;
            var x = this.props.x * scale;
            var y = this.props.y * scale;

            var x1 = x + width;
            var y1 = y + height;
            var dDX = dX * (x1 - x0) / w0;
            var dDY = dY * (y1 - y0) / h0;

            // Calculate split fraction to adjust x / width and y / height
            var xFrac = (x - x0) / (x1 - x0);
            var yFrac = (y - y0) / (y1 - y0);

            x = x + xFrac * dDX;
            y = y + yFrac * dDY;
            width = width + (1 - xFrac) * dDX;
            height = height + (1 - yFrac) * dDY;

            var text = void 0;
            this.props.text ? text = this.props.text : text = "Text";

            return _react2.default.createElement(
                'g',
                { transform: 'translate(' + x + ', ' + y + ')', className: (this.props.ignore ? "ignore" : "") + ' ' + (this.props.static ? "static" : "") },
                _react2.default.createElement('rect', { x: 0, y: 0, height: height, width: width }),
                _react2.default.createElement(
                    'foreignObject',
                    { style: { overflow: "visible" }, width: width },
                    _react2.default.createElement(
                        'div',
                        { className: 'text-container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'text', xmlns: 'http://www.w3.org/1999/xhtml', style: { lineHeight: height + "px", fontSize: scale * 100 + '%' }, contentEditable: this.props.editActive, suppressContentEditableWarning: true },
                            text
                        )
                    )
                )
            );
        }
    }]);

    return EditableText;
}(_react.PureComponent);

var StaticText = exports.StaticText = function (_PureComponent3) {
    _inherits(StaticText, _PureComponent3);

    function StaticText(props) {
        _classCallCheck(this, StaticText);

        return _possibleConstructorReturn(this, (StaticText.__proto__ || Object.getPrototypeOf(StaticText)).call(this, props));
    }

    _createClass(StaticText, [{
        key: 'render',
        value: function render() {
            var _props$objectBBox3 = this.props.objectBBox,
                x0 = _props$objectBBox3.x0,
                y0 = _props$objectBBox3.y0,
                h0 = _props$objectBBox3.h0,
                w0 = _props$objectBBox3.w0;
            var _props$dObject3 = this.props.dObject,
                dX = _props$dObject3.dX,
                dY = _props$dObject3.dY,
                scale = _props$dObject3.scale;

            var height = this.props.height * scale;
            var width = this.props.width * scale;
            var x = this.props.x * scale;
            var y = this.props.y * scale;

            var x1 = x + width;
            var y1 = y + height;
            var dDX = dX * (x1 - x0) / w0;
            var dDY = dY * (y1 - y0) / h0;

            // Calculate split fraction to adjust x / width and y / height
            var xFrac = (x - x0) / (x1 - x0);
            var yFrac = (y - y0) / (y1 - y0);

            x = x + xFrac * dDX;
            y = y + yFrac * dDY;

            return _react2.default.createElement(
                'g',
                { transform: 'translate(' + x + ', ' + y + ')', style: this.props.style, className: (this.props.ignore ? "ignore" : "") + ' ' + (this.props.static ? "static" : "") },
                _react2.default.createElement(
                    'text',
                    { style: { textAnchor: "middle", transform: 'scale(' + scale + ',' + scale + ')', alignmentBaseline: "middle" } },
                    this.props.text
                )
            );
        }
    }]);

    return StaticText;
}(_react.PureComponent);

Rect.propTypes = {
    x: _react2.default.PropTypes.any.isRequired,
    y: _react2.default.PropTypes.any.isRequired,
    height: _react2.default.PropTypes.any.isRequired,
    width: _react2.default.PropTypes.any.isRequired
};

Rect.defaultProps = {
    rx: 0,
    ry: 0
};

var Circle = exports.Circle = function (_PureComponent4) {
    _inherits(Circle, _PureComponent4);

    function Circle(props) {
        _classCallCheck(this, Circle);

        return _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, props));
    }

    _createClass(Circle, [{
        key: 'render',
        value: function render() {
            var _props$objectBBox4 = this.props.objectBBox,
                x0 = _props$objectBBox4.x0,
                y0 = _props$objectBBox4.y0,
                h0 = _props$objectBBox4.h0,
                w0 = _props$objectBBox4.w0;
            var _props$dObject4 = this.props.dObject,
                dX = _props$dObject4.dX,
                dY = _props$dObject4.dY,
                scale = _props$dObject4.scale;

            var r = this.props.r * scale;
            var cx = this.props.cx * scale;
            var cy = this.props.cy * scale;

            var x1 = cx + r;
            var y1 = cy + r;
            var dDX = dX * (x1 - x0) / w0;
            var dDY = dY * (y1 - y0) / h0;

            // Calculate split fraction to adjust x / width and y / height
            var xFrac = (cx - r - x0) / (x1 - x0);
            xFrac = xFrac + (1 - xFrac) / 2;
            var yFrac = (cy - r - y0) / (y1 - y0);
            yFrac = yFrac + (1 - yFrac) / 2;

            cx = cx + xFrac * dDX;
            cy = cy + yFrac * dDY;
            r = r + Math.min((1 - xFrac) * dDX, (1 - yFrac) * dDY);

            var attr = {
                cx: cx,
                cy: cy,
                r: r
            };

            return _react2.default.createElement('circle', _extends({}, attr, { style: this.props.style, id: this.props.id, className: (this.props.ignore ? "ignore" : "") + ' ' + (this.props.static ? "static" : "") }));
        }
    }]);

    return Circle;
}(_react.PureComponent);

Circle.propTypes = {
    cx: _react2.default.PropTypes.any.isRequired,
    cy: _react2.default.PropTypes.any.isRequired,
    r: _react2.default.PropTypes.any.isRequired
};

var Ellipse = exports.Ellipse = function (_PureComponent5) {
    _inherits(Ellipse, _PureComponent5);

    function Ellipse(props) {
        _classCallCheck(this, Ellipse);

        return _possibleConstructorReturn(this, (Ellipse.__proto__ || Object.getPrototypeOf(Ellipse)).call(this, props));
    }

    _createClass(Ellipse, [{
        key: 'render',
        value: function render() {
            var _props$objectBBox5 = this.props.objectBBox,
                x0 = _props$objectBBox5.x0,
                y0 = _props$objectBBox5.y0,
                h0 = _props$objectBBox5.h0,
                w0 = _props$objectBBox5.w0;
            var _props$dObject5 = this.props.dObject,
                dX = _props$dObject5.dX,
                dY = _props$dObject5.dY,
                scale = _props$dObject5.scale;

            var rx = this.props.rx * scale;
            var ry = this.props.ry * scale;
            var cx = this.props.cx * scale;
            var cy = this.props.cy * scale;

            var x1 = cx + rx;
            var y1 = cy + ry;
            var dDX = dX * (x1 - x0) / w0;
            var dDY = dY * (y1 - y0) / h0;

            // Calculate split fraction to adjust x / width and y / height
            var xFrac = (cx - rx - x0) / (x1 - x0);
            xFrac = xFrac + (1 - xFrac) / 2;
            var yFrac = (cy - ry - y0) / (y1 - y0);
            yFrac = yFrac + (1 - yFrac) / 2;

            cx = cx + xFrac * dDX;
            cy = cy + yFrac * dDY;
            rx = rx + (1 - xFrac) * dDX;
            ry = ry + (1 - yFrac) * dDY;

            var attr = {
                cx: cx,
                cy: cy,
                rx: rx,
                ry: ry
            };

            return _react2.default.createElement('ellipse', _extends({}, attr, { id: this.props.id, style: this.props.style, className: (this.props.ignore ? "ignore" : "") + ' ' + (this.props.static ? "static" : "") }));
        }
    }]);

    return Ellipse;
}(_react.PureComponent);

Ellipse.propTypes = {
    cx: _react2.default.PropTypes.any.isRequired,
    cy: _react2.default.PropTypes.any.isRequired,
    rx: _react2.default.PropTypes.any.isRequired,
    ry: _react2.default.PropTypes.any.isRequired
};

var Path = exports.Path = function (_PureComponent6) {
    _inherits(Path, _PureComponent6);

    function Path(props) {
        _classCallCheck(this, Path);

        return _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).call(this, props));
    }

    _createClass(Path, [{
        key: 'render',
        value: function render() {
            var _props$objectBBox6 = this.props.objectBBox,
                x0 = _props$objectBBox6.x0,
                y0 = _props$objectBBox6.y0,
                h0 = _props$objectBBox6.h0,
                w0 = _props$objectBBox6.w0;
            var _props$dObject6 = this.props.dObject,
                dX = _props$dObject6.dX,
                dY = _props$dObject6.dY,
                scale = _props$dObject6.scale;

            var d = this.props.d;

            d = (0, _svgpath2.default)(d).rel();
            var x1 = void 0,
                x2 = void 0,
                y1 = void 0,
                y2 = void 0,
                xLoc = void 0,
                yLoc = void 0;

            // Get height/width
            d.iterate(function (segment, index, xs, ys) {
                if (index == 1) {
                    x1 = xs;
                    y1 = ys;
                    x2 = xs;
                    y2 = ys;
                } else if (index < d.segments.length - 1) {
                    x1 = Math.min(x1, xs);
                    x2 = Math.max(x2, xs);
                    y1 = Math.min(y1, ys);
                    y2 = Math.max(y2, ys);
                } else if (index > 1) {
                    var posX = xs,
                        posY = ys;
                    switch (segment[0]) {
                        case 'h':
                            posX += segment[1];
                            break;
                        case 'H':
                            posX = segment[1];
                            break;
                        case 'v':
                            posY += segment[2];
                            break;
                        case 'V':
                            posY = segment[2];
                            break;
                        case 'z':
                        case 'Z':
                            posX += 0;
                            posY += 0;
                            break;
                        case 'M':
                        case 'L':
                        case 'A':
                        case 'Q':
                        case 'C':
                        case 'T':
                        case 'S':
                            posX = segment[segment.length - 2];
                            posY = segment[segment.length - 1];
                            break;
                        default:
                            posX += segment[segment.length - 2];
                            posY += segment[segment.length - 1];
                            break;
                    }
                    x1 = Math.min(x1, posX);
                    x2 = Math.max(x2, posX);
                    y1 = Math.min(y1, posY);
                    y2 = Math.max(y2, posY);
                }
            });

            var width = x2 - x1;
            var height = y2 - y1;

            // Calculate split fraction to adjust x / width and y / height
            var xFrac = (x1 - x0) / (x1 + width - x0);
            var yFrac = (y1 - y0) / (y1 + height - y0);

            d = d.scale((1 + (1 - xFrac) * dX / w0) * scale, (1 + (1 - yFrac) * dY / h0) * scale).toString();

            var attr = { d: d };

            // Add in a second no-stroke path for clicking purposes
            return _react2.default.createElement(
                'g',
                null,
                _react2.default.createElement('path', _extends({}, attr, { stroke: 'none', strokeWidth: '10' })),
                _react2.default.createElement('path', _extends({}, attr, { id: this.props.id, style: this.props.style, className: (this.props.ignore ? "ignore" : "") + ' ' + (this.props.static ? "static" : "") }))
            );
        }
    }]);

    return Path;
}(_react.PureComponent);

Path.propTypes = {
    d: _react2.default.PropTypes.any.isRequired
};

var elementMap = {
    Rect: Rect,
    EditableText: EditableText,
    StaticText: StaticText,
    Circle: Circle,
    Ellipse: Ellipse,
    Path: Path
};

var Shape = function (_PureComponent7) {
    _inherits(Shape, _PureComponent7);

    function Shape(props) {
        _classCallCheck(this, Shape);

        return _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).call(this, props));
    }

    _createClass(Shape, [{
        key: 'render',
        value: function render() {
            var _this8 = this;

            var elements = this.props.elements;

            var renderedElements = elements.map(function (e, i) {
                var Tag = elementMap[e.tag];
                var key = e.d;
                return _react2.default.createElement(Tag, _extends({ objectBBox: _this8.props.objectBBox, dObject: _this8.props.dObject, editActive: _this8.props.editActive, key: key }, e));
            });

            return _react2.default.createElement(
                'g',
                null,
                renderedElements
            );
        }
    }]);

    return Shape;
}(_react.PureComponent);

exports.default = Shape;


Shape.propTypes = {
    objectBBox: _react2.default.PropTypes.object.isRequired,
    dObject: _react2.default.PropTypes.object,
    elements: _react2.default.PropTypes.array
};

Shape.defaultProps = {
    dObject: { dX: 0, dY: 0, scale: 1 }
};