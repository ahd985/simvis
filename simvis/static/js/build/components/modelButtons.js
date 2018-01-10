"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tableButtonIcon = exports.reportButtonIcon = exports.legendButtonIcon = exports.toggleButtonIcon = exports.lineButtonIcon = exports.heatmapButtonIcon = exports.cellButtonIcon = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cellButtonIcon = exports.cellButtonIcon = _react2.default.createElement(
    "svg",
    { viewBox: "0 0 100 100", width: "100", height: "100" },
    _react2.default.createElement("rect", { height: "100",
        style: { opacity: 1, fill: "url(#cell-btn-pattern)", fillOpacity: 1, stroke: "#000000" },
        width: "100", x: "0", y: "0" }),
    _react2.default.createElement(
        "defs",
        null,
        _react2.default.createElement(
            "pattern",
            { id: "cell-btn-pattern", x: "0", y: "0", width: "100%", height: "100%", patternContentUnits: "userSpaceOnUse" },
            _react2.default.createElement("rect", { x: "0", width: "100%", height: "100%", y: "0", style: { fill: "#EEEEEE", opacity: 1 } }),
            _react2.default.createElement(
                "rect",
                { x: "0", width: "100", height: "100", y: "80", style: { opacity: 1, fill: "#FFF8E1" } },
                _react2.default.createElement("animate", { attributeName: "y", values: "70;30;70", dur: "3s", repeatCount: "indefinite" }),
                _react2.default.createElement("animate", { attributeName: "height", values: "30;70;30", dur: "3s", repeatCount: "indefinite" }),
                _react2.default.createElement("animate", { attributeName: "fill", values: "#90CAF9;#64B5F6;#90CAF9", dur: "3s", repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "rect",
                { x: "0", width: "100", height: "1", y: "80", style: { opacity: 1, fill: "#ffffff" } },
                _react2.default.createElement("animate", { attributeName: "y", values: "70;30;70", dur: "3s", repeatCount: "indefinite" })
            )
        )
    )
);

var heatmapButtonIcon = exports.heatmapButtonIcon = _react2.default.createElement(
    "svg",
    { viewBox: "0 0 100 100", width: "100", height: "100" },
    _react2.default.createElement("rect", { height: "33", width: "33", x: "0", y: "0", fill: "url(#heatmap-btn-pattern-1)", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "33", width: "33", x: "33", y: "0", fill: "url(#heatmap-btn-pattern-2)", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "34", width: "33", x: "66", y: "0", fill: "url(#heatmap-btn-pattern-1)", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "33", width: "33", x: "0", y: "33", fill: "url(#heatmap-btn-pattern-2)", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "33", width: "33", x: "33", y: "33", fill: "url(#heatmap-btn-pattern-2)", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "33", width: "33", x: "66", y: "33", fill: "url(#heatmap-btn-pattern-2)", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "33", width: "33", x: "0", y: "66", fill: "url(#heatmap-btn-pattern-1)", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "33", width: "33", x: "33", y: "66", fill: "url(#heatmap-btn-pattern-2)", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "34", width: "33", x: "66", y: "66", fill: "url(#heatmap-btn-pattern-1)", stroke: "#000000" }),
    _react2.default.createElement(
        "defs",
        null,
        _react2.default.createElement(
            "pattern",
            { id: "heatmap-btn-pattern-1", x: "0", y: "0", width: "100%", height: "100%", patternContentUnits: "userSpaceOnUse" },
            _react2.default.createElement(
                "rect",
                { x: "0", width: "100%", height: "100%", y: "0" },
                _react2.default.createElement("animate", { attributeName: "fill", values: "#FFF176;#FDD835;#F57F17;#FDD835;#FFF176", dur: "5s", repeatCount: "indefinite" })
            )
        ),
        _react2.default.createElement(
            "pattern",
            { id: "heatmap-btn-pattern-2", x: "0", y: "0", width: "100%", height: "100%", patternContentUnits: "userSpaceOnUse" },
            _react2.default.createElement(
                "rect",
                { x: "0", width: "100%", height: "100%", y: "0" },
                _react2.default.createElement("animate", { attributeName: "fill", values: "#FDD835;#F57F17;#BF360C;#F57F17;#FDD835", dur: "5s", repeatCount: "indefinite" })
            )
        )
    )
);

var lineButtonIcon = exports.lineButtonIcon = _react2.default.createElement(
    "svg",
    { viewBox: "0 0 100 100", width: "100", height: "100" },
    _react2.default.createElement("line", { x1: "0", y1: "50", x2: "100", y2: "50.01", stroke: "url(#line-btn-pattern)", strokeWidth: 3 }),
    _react2.default.createElement(
        "defs",
        null,
        _react2.default.createElement(
            "pattern",
            { id: "line-btn-pattern", x: "0", y: "0", width: "100%", height: "100%", patternContentUnits: "userSpaceOnUse" },
            _react2.default.createElement("rect", { x: "0", width: "25", height: "100%", y: "0" }),
            _react2.default.createElement(
                "rect",
                { x: "25", width: "25", height: "100%", y: "0" },
                _react2.default.createElement("animate", { attributeName: "fill", values: "#66BB6A;#43A047;#1B5E20;#43A047;#66BB6A", dur: "2s", repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "rect",
                { x: "50", width: "25", height: "100%", y: "0" },
                _react2.default.createElement("animate", { attributeName: "fill", values: "#66BB6A;#43A047;#1B5E20;#43A047;#66BB6A", dur: "2s", repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "rect",
                { x: "75", width: "25", height: "100%", y: "0" },
                _react2.default.createElement("animate", { attributeName: "fill", values: "#A5D6A7;#66BB6A;#43A047;#66BB6A;#A5D6A7", dur: "2s", repeatCount: "indefinite" })
            )
        )
    )
);

var toggleButtonIcon = exports.toggleButtonIcon = _react2.default.createElement(
    "svg",
    { viewBox: "0 0 100 100", width: "100", height: "100" },
    _react2.default.createElement(
        "circle",
        { cx: "50", cy: "50", r: "45", stroke: "#000000", strokeWidth: "5" },
        _react2.default.createElement("animate", { attributeName: "fill", values: "#4CAF50;#F44336", dur: "4s", repeatCount: "indefinite", calcMode: "discrete" })
    )
);

var legendButtonIcon = exports.legendButtonIcon = _react2.default.createElement(
    "svg",
    { viewBox: "0 0 100 100", width: "100", height: "100" },
    _react2.default.createElement("rect", { height: "15", width: "25", x: "0", y: "35", fill: "#ffffb2", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "15", width: "25", x: "25", y: "35", fill: "#fecc5c", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "15", width: "25", x: "50", y: "35", fill: "#fd8d3c", stroke: "#000000" }),
    _react2.default.createElement("rect", { height: "15", width: "25", x: "75", y: "35", fill: "#e31a1c", stroke: "#000000" }),
    _react2.default.createElement(
        "text",
        { x: "3", y: "62" },
        "1"
    ),
    _react2.default.createElement(
        "text",
        { x: "28", y: "62" },
        "2"
    ),
    _react2.default.createElement(
        "text",
        { x: "53", y: "62" },
        "3"
    ),
    _react2.default.createElement(
        "text",
        { x: "78", y: "62" },
        "4"
    )
);

var reportButtonIcon = exports.reportButtonIcon = _react2.default.createElement(
    "svg",
    { width: "100", height: "100", viewBox: "0 0 100 100" },
    _react2.default.createElement("rect", { width: "100", alignmentBaseline: "after-edge", height: "24", x: "0", y: "0", fill: "#616161" }),
    _react2.default.createElement(
        "text",
        { width: "100", textAnchor: "middle", x: "50", y: "21", fontSize: "13", fill: "#ffc107" },
        "Quench Tank"
    ),
    _react2.default.createElement("rect", { width: "100", alignmentBaseline: "after-edge", height: "24", x: "0", y: "25", fill: "#616161" }),
    _react2.default.createElement(
        "text",
        { width: "100", textAnchor: "middle", x: "30", y: "40", fontSize: "10", fill: "#00bfa5" },
        "Vapor Temp"
    ),
    _react2.default.createElement(
        "text",
        { width: "100", textAnchor: "middle", x: "75", y: "40", fontSize: "10", fill: "#ffeb3b" },
        "320.0"
    ),
    _react2.default.createElement(
        "text",
        { width: "100", textAnchor: "middle", x: "93", y: "40", fontSize: "10", fill: "#ffffff" },
        "K"
    ),
    _react2.default.createElement("rect", { width: "100", alignmentBaseline: "after-edge", height: "24", x: "0", y: "50", fill: "#616161" }),
    _react2.default.createElement(
        "text",
        { width: "100", textAnchor: "middle", x: "30", y: "65", fontSize: "10", fill: "#00bfa5" },
        "Water Temp"
    ),
    _react2.default.createElement(
        "text",
        { width: "100", textAnchor: "middle", x: "75", y: "65", fontSize: "10", fill: "#ffeb3b" },
        "305.0"
    ),
    _react2.default.createElement(
        "text",
        { width: "100", textAnchor: "middle", x: "93", y: "65", fontSize: "10", fill: "#ffffff" },
        "K"
    ),
    _react2.default.createElement("rect", { width: "100", alignmentBaseline: "after-edge", height: "24", x: "0", y: "75", fill: "#616161" }),
    _react2.default.createElement(
        "text",
        { width: "100", textAnchor: "middle", x: "30", y: "90", fontSize: "10", fill: "#00bfa5" },
        "Water Mass"
    ),
    _react2.default.createElement(
        "text",
        { width: "100", textAnchor: "middle", x: "75", y: "90", fontSize: "10", fill: "#ffeb3b" },
        "11.0"
    ),
    _react2.default.createElement(
        "text",
        { width: "100", textAnchor: "middle", x: "93", y: "90", fontSize: "10", fill: "#ffffff" },
        "T"
    )
);

var tableButtonIcon = exports.tableButtonIcon = _react2.default.createElement(
    "svg",
    { width: "100", height: "100", viewBox: "0 0 100 100" },
    _react2.default.createElement(
        "foreignObject",
        { width: "100", height: "100" },
        _react2.default.createElement(
            "table",
            { width: "100", height: "100" },
            _react2.default.createElement(
                "thead",
                { style: { fontSize: 18 } },
                _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "th",
                        null,
                        "H1"
                    ),
                    _react2.default.createElement(
                        "th",
                        null,
                        "H2"
                    ),
                    _react2.default.createElement(
                        "th",
                        null,
                        "H3"
                    )
                )
            ),
            _react2.default.createElement(
                "tbody",
                { style: { fontSize: 10 } },
                _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    )
                ),
                _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    )
                ),
                _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    )
                ),
                _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        "..."
                    )
                )
            )
        )
    )
);