"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconWidth = 50;
var iconHeight = 50;
var iconViewBox = "0 0 100 100";

var staticLevelIcon = _react2.default.createElement(
    "svg",
    { viewBox: iconViewBox, width: iconWidth, height: iconHeight },
    _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement("rect", { style: { fill: "#cccccc", stroke: "#000000", strokeWidth: "1.99999988" }, width: "100", height: "100", x: "0", y: "0" }),
        _react2.default.createElement("rect", { style: { fill: "#999999", strokeWidth: "1" }, width: "98", height: "49", x: "1", y: "50" }),
        _react2.default.createElement("path", { style: { fill: "none", stroke: "#000000", strokeWidth: "1px" }, d: "m 0,50 100,0" }),
        _react2.default.createElement("path", { style: { fill: "none", stroke: "#000000", strokeWidth: "2px" }, d: "m 50,50 0,-20 m -8,8 8,-8 8,8" }),
        _react2.default.createElement("path", { d: "m 50,50 0,20 m 8,-8 -8,8 -8,-8", style: { fill: "none", stroke: "#000000", strokeWidth: "2px" } })
    )
);

var dynamicLevelIcon = _react2.default.createElement(
    "svg",
    { viewBox: iconViewBox, width: iconWidth, height: iconHeight },
    _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement(
            "g",
            null,
            _react2.default.createElement("rect", { style: { fill: "#cccccc", stroke: "#000000", strokeWidth: "1.99999988" }, width: "100", height: "100", x: "0", y: "0" }),
            _react2.default.createElement("rect", { style: { fill: "#999999", strokeWidth: "1" }, width: "98", height: "49", x: "1", y: "50" }),
            _react2.default.createElement("path", { style: { fill: "none", stroke: "#000000", strokeWidth: "1px" }, d: "m 0,50 100,0" }),
            _react2.default.createElement("path", { style: { fill: "none", stroke: "#000000", strokeWidth: "2px" }, d: "m 50,50 0,-20 m -8,8 8,-8 8,8" }),
            _react2.default.createElement("path", { d: "m 50,50 0,20 m 8,-8 -8,8 -8,-8", style: { fill: "none", stroke: "#000000", strokeWidth: "2px" } })
        ),
        _react2.default.createElement(
            "g",
            { transform: "translate(0,-334.76203)" },
            _react2.default.createElement(
                "g",
                { transform: "matrix(0.05869933,0,0,0.05870033,56.878226,400.892)" },
                " ",
                _react2.default.createElement("polygon", { points: "245.962,292.371 150.215,284.105 133.827,300.478 116.999,362.057 124.279,369.339 185.841,352.493 " }),
                " ",
                _react2.default.createElement("path", { d: "M 467.156,19.18 C 454.863,6.9 438.222,0 420.854,0 403.484,0 386.827,6.885 374.549,19.162 l -30.539,30.522 -2.506,-2.509 c -19.815,-19.812 -51.951,-19.812 -71.779,0 -9.519,9.535 -14.865,22.432 -14.865,35.899 0,9.44 2.765,18.528 7.617,26.443 L 94.757,277.235 c -2,2.002 -3.444,4.477 -4.188,7.202 l -29.568,108.14 c -1.541,5.633 0.063,11.645 4.186,15.768 l 12.787,12.787 c 3.094,3.093 7.232,4.76 11.485,4.76 1.427,0 2.868,-0.189 4.282,-0.574 l 108.14,-29.568 c 2.728,-0.745 5.202,-2.188 7.2,-4.185 l 167.688,-167.69 c 19.56,12.01 45.432,9.662 62.373,-7.266 9.52,-9.532 14.865,-22.43 14.865,-35.898 0,-13.466 -5.346,-26.379 -14.865,-35.896 l -2.52,-2.524 30.521,-30.504 c 25.573,-25.571 25.573,-67.039 0.013,-92.607 z m -277.998,346.367 -94.116,25.73 25.731,-94.117 163.561,-163.562 68.401,68.368 -163.577,163.581 z" })
            )
        )
    )
);

var backgroundIcon = _react2.default.createElement(
    "svg",
    { viewBox: iconViewBox, width: iconWidth, height: iconHeight },
    _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement("rect", { y: "0", x: "0", height: "100", width: "100", style: { fill: "#cccccc", stroke: "#000000", strokeWidth: "1.99999988" } })
    )
);

var zonalYIcon = _react2.default.createElement(
    "svg",
    { viewBox: iconViewBox, width: iconWidth, height: iconHeight },
    _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement("rect", { y: "0", x: "0", height: "100", width: "100", style: { fill: "#cccccc", stroke: "#000000", strokeWidth: "1.99999988" } }),
        _react2.default.createElement("rect", { y: "1", x: "1", height: "33", width: "98", style: { fill: "#4d4d4d", strokeWidth: "1" } }),
        _react2.default.createElement("path", { d: "m 0,34 100,0", style: { fill: "none", stroke: "#000000", strokeWidth: "1px" } }),
        _react2.default.createElement("rect", { style: { fill: "#999999", strokeWidth: "1" }, width: "98", height: "33", x: "1", y: "34" }),
        _react2.default.createElement("path", { style: { fill: "none", stroke: "#000000", strokeWidth: "1px" }, d: "m 0,67 100,0" })
    )
);

var rectIcon = _react2.default.createElement(
    "svg",
    { viewBox: iconViewBox, width: iconWidth, height: iconHeight },
    _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement(
            "g",
            null,
            _react2.default.createElement("rect", { style: { fill: "#cccccc", stroke: "#000000", strokeWidth: "1.99999988" }, width: "100", height: "100", x: "0", y: "0" }),
            _react2.default.createElement("path", { d: "m 0,50 100,0", style: { fill: "none", stroke: "#000000", strokeWidth: "1px" } }),
            _react2.default.createElement("path", { d: "m 50,0 0,100", style: { fill: "none", stroke: "#000000", strokeWidth: "1px" } })
        )
    )
);

var equalYIcon = _react2.default.createElement(
    "svg",
    { viewBox: iconViewBox, width: iconWidth, height: iconHeight },
    _react2.default.createElement(
        "g",
        { style: { strokeWidth: "10" } },
        _react2.default.createElement("rect", { style: { fill: "#f5f5f5", stroke: "#020202", strokeWidth: "1" }, y: "0", height: "100", width: "40", x: "30" }),
        _react2.default.createElement("path", { style: { fill: "#d1d1d1", stroke: "#c0c0c0", strokeWidth: "10" }, d: "m 50,0 0,25" }),
        _react2.default.createElement("path", { style: { fill: "none", stroke: "#979797", strokeWidth: "10" }, d: "m 50,25 0,25" }),
        _react2.default.createElement("path", { style: { fill: "none", stroke: "#3e2d2d", strokeWidth: "10" }, d: "m 50,50 0,25" }),
        _react2.default.createElement("path", { style: { fill: "none", stroke: "#acacac", strokeWidth: "10" }, d: "m 50,75 0,25" })
    )
);

var colorScaleIcon = _react2.default.createElement(
    "svg",
    { viewBox: iconViewBox, width: iconWidth, height: iconHeight },
    _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement("rect", { style: { fill: "#f5f5f5", stroke: "#020202" }, y: "0", height: "75", width: "100", x: "0" }),
        _react2.default.createElement("path", { d: "m 0,25 25,0", style: { fill: "#d1d1d1", stroke: "#c0c0c0", strokeWidth: "25" } }),
        _react2.default.createElement("path", { d: "m 25,25 25,0", style: { fill: "none", stroke: "#979797", strokeWidth: "25" } }),
        _react2.default.createElement("path", { d: "m 50,25 25,0", style: { fill: "none", stroke: "#3e2d2d", strokeWidth: "25" } }),
        _react2.default.createElement("path", { d: "m 75,25 25,0", style: { fill: "none", stroke: "#acacac", strokeWidth: "25" } }),
        _react2.default.createElement(
            "text",
            { style: { fill: "#000000", stroke: "none", strokeWidth: "1px" }, x: "0", y: "60" },
            _react2.default.createElement(
                "tspan",
                { x: "0", y: "60" },
                "1"
            )
        ),
        _react2.default.createElement(
            "text",
            { style: { fill: "#000000", stroke: "none", strokeWidth: "1px" }, x: "25", y: "60" },
            _react2.default.createElement(
                "tspan",
                { x: "25", y: "60" },
                "2"
            )
        ),
        _react2.default.createElement(
            "text",
            { style: { fill: "#000000", stroke: "none", strokeWidth: "1px" }, x: "50", y: "60" },
            _react2.default.createElement(
                "tspan",
                { x: "50", y: "60" },
                "3"
            )
        ),
        _react2.default.createElement(
            "text",
            { style: { fill: "#000000", stroke: "none", strokeWidth: "1px" }, x: "75", y: "60" },
            _react2.default.createElement(
                "tspan",
                { x: "75", y: "60" },
                "4"
            ),
            _react2.default.createElement("circle", { r: "50", cy: "50", cx: "50" })
        )
    )
);

var logicalIcon = _react2.default.createElement(
    "svg",
    { viewBox: iconViewBox, width: iconWidth, height: iconHeight },
    _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement("circle", { r: "50", style: { fill: "#d1d1d1", stroke: "#000000", strokeWidth: "2" }, cx: "50", cy: "50" }),
        _react2.default.createElement(
            "g",
            null,
            _react2.default.createElement(
                "text",
                null,
                _react2.default.createElement(
                    "tspan",
                    null,
                    "ON/OFF"
                )
            )
        )
    )
);

var showHideIcon = _react2.default.createElement(
    "svg",
    { viewBox: iconViewBox, width: iconWidth, height: iconHeight },
    _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement(
            "g",
            null,
            _react2.default.createElement("circle", { r: "50", style: { fill: "#d1d1d1", stroke: "#000000", strokeWidth: "2" }, cx: "50", cy: "50" })
        ),
        _react2.default.createElement(
            "g",
            null,
            _react2.default.createElement(
                "g",
                { transform: "translate(19,19)" },
                _react2.default.createElement("path", { d: "m 11.285,41.39 c 0.184,0.146 0.404,0.218 0.623,0.218 0.294,0 0.585,-0.129 0.783,-0.377 0.344,-0.432 0.273,-1.061 -0.159,-1.405 -0.801,-0.638 -1.577,-1.331 -2.305,-2.06 l -7.398,-7.398 7.629,-7.629 c 7.334,-7.333 18.003,-9.836 27.839,-6.534 0.523,0.173 1.09,-0.107 1.267,-0.63 0.175,-0.523 -0.106,-1.091 -0.63,-1.267 C 28.372,10.763 16.918,13.451 9.044,21.324 L 0,30.368 8.812,39.18 c 0.781,0.782 1.614,1.525 2.473,2.21 z" }),
                " ",
                _react2.default.createElement("path", { d: "m 50.237,21.325 c -1.348,-1.348 -2.826,-2.564 -4.394,-3.616 -0.458,-0.307 -1.081,-0.185 -1.388,0.273 -0.308,0.458 -0.185,1.08 0.273,1.388 1.46,0.979 2.838,2.113 4.094,3.369 l 7.398,7.398 -7.629,7.629 c -7.385,7.385 -18.513,9.882 -28.352,6.356 -0.52,-0.187 -1.093,0.084 -1.279,0.604 -0.186,0.52 0.084,1.092 0.604,1.279 3.182,1.14 6.49,1.693 9.776,1.693 7.621,0 15.124,-2.977 20.665,-8.518 l 9.043,-9.043 -8.811,-8.812 z" }),
                " ",
                _react2.default.createElement("path", { d: "m 30.539,41.774 c -2.153,0 -4.251,-0.598 -6.07,-1.73 -0.467,-0.29 -1.084,-0.148 -1.377,0.321 -0.292,0.469 -0.148,1.085 0.321,1.377 2.135,1.33 4.6,2.032 7.126,2.032 7.444,0 13.5,-6.056 13.5,-13.5 0,-2.685 -0.787,-5.279 -2.275,-7.502 -0.308,-0.459 -0.93,-0.582 -1.387,-0.275 -0.459,0.308 -0.582,0.929 -0.275,1.387 1.267,1.893 1.937,4.102 1.937,6.39 0,6.342 -5.159,11.5 -11.5,11.5 z" }),
                " ",
                _react2.default.createElement("path", { d: "m 30.539,18.774 c 2.065,0 4.089,0.553 5.855,1.6 0.474,0.281 1.088,0.125 1.37,-0.351 0.281,-0.475 0.125,-1.088 -0.351,-1.37 -2.074,-1.229 -4.451,-1.879 -6.875,-1.879 -7.444,0 -13.5,6.056 -13.5,13.5 0,2.084 0.462,4.083 1.374,5.941 0.174,0.354 0.529,0.56 0.899,0.56 0.147,0 0.298,-0.033 0.439,-0.102 0.496,-0.244 0.701,-0.843 0.458,-1.338 -0.776,-1.582 -1.17,-3.284 -1.17,-5.06 0.001,-6.342 5.16,-11.501 11.501,-11.501 z" }),
                " ",
                _react2.default.createElement("path", { d: "m 54.621,5.567 c -0.391,-0.391 -1.023,-0.391 -1.414,0 l -46.5,46.5 c -0.391,0.391 -0.391,1.023 0,1.414 0.195,0.195 0.451,0.293 0.707,0.293 0.256,0 0.512,-0.098 0.707,-0.293 l 46.5,-46.5 c 0.391,-0.39 0.391,-1.023 0,-1.414 z" })
            )
        )
    )
);

/*
const cellIcon = <svg viewBox={iconViewBox}>
        <g>
            <rect y="0" x="0" height={iconHeight} width={iconWidth} style={{fill:"#cccccc",stroke:"#000000",strokeWidth:"1.99999988"}} />
            <rect y="50" x="1" height="49" width="98" style={{fill:"#999999",strokeWidth:"1"}} />
            <path d="m 0,50 100,0" style={{fill:"none",stroke:"#000000",strokeWidth:"1px"}} />
        </g>
    </svg>;

const reportIcon = <svg viewBox={iconViewBox}>
        <g transform="matrix(1.7241379,0,0,1.7241379,0,0)" >
            <g >
                <rect x="9" y="12" width="40" height="2" />
                <rect x="9" y="28" width="40" height="2" />
                <rect x="9" y="44" width="40" height="2" />
                <path d="M 0,0 0,58 58,58 58,0 0,0 Z M 56,56 2,56 2,2 56,2 56,56 Z" />
            </g>
        </g>
    </svg>;

const heatmapIcon = <svg viewBox={iconViewBox}>
        <g>
            <rect style={{fill:"none",stroke:"#020202",strokeWidth:"2"}} width={iconWidth} height={iconHeight} x="0" y="0" />
            <rect style={{fill:"#d1d1d1",stroke:"#020202",strokeWidth:"1"}} width="33" height="33" x="0" y="0" />
            <rect y="0" x="33" height="33" width="33" style={{fill:"#999999",stroke:"#020202",strokeWidth:"1"}} />
            <rect style={{fill:"#d1d1d1",stroke:"#020202",strokeWidth:"1"}} width="34" height="33" x="66" y="0" />
            <rect y="33" x="0" height="33" width="33" style={{fill:"#999999",stroke:"#020202",strokeWidth:"1"}} />
            <rect style={{fill:"#d1d1d1",stroke:"#020202",strokeWidth:"1"}} width="33" height="33" x="33" y="33" />
            <rect y="33" x="66" height="33" width="34" style={{fill:"#999999",stroke:"#020202",strokeWidth:"1"}} />
            <rect style={{fill:"#d1d1d1",stroke:"#020202",strokeWidth:"1"}} width="33" height="34" x="0" y="66" />
            <rect y="66" x="33" height="34" width="33" style={{fill:"#999999",stroke:"#020202",strokeWidth:"1"}} />
            <rect style={{fill:"#d1d1d1",stroke:"#020202",strokeWidth:"1"}} width="34" height="34" x="66" y="66" />
        </g>
    </svg>;

const lineIcon = <svg viewBox={iconViewBox}>
        <g style={{strokeWidth:"10"}}>
            <rect x="30" width="40" height={iconHeight} y="0" style={{fill:"#f5f5f5",stroke:"#020202",strokeWidth:"1"}} />
            <path d="m 50,0 0,25" style={{fill:"#d1d1d1",stroke:"#000000",strokeWidth:"10"}} />
            <path d="m 50,25 0,25" style={{fill:"none",stroke:"#000000",strokeWidth:"10"}} />
            <path d="m 50,50 0,25" style={{fill:"none",stroke:"#000000",strokeWidth:"10"}} />
            <path d="m 50,75 0,25" style={{fill:"none",stroke:"#000000",strokeWidth:"10"}} />
        </g>
    </svg>;

const tableIcon = <svg viewBox={iconViewBox}>
        <g style={{fill:"#393636"}} transform="matrix(0.21048998,0,0,0.24876179,0,0)">
            <g style={{fill:"#393636"}} >
                <path style={{fill:"#393636"}} d="M 461.667,49.963 C 452.718,41.016 441.969,36.545 429.402,36.545 l -383.72,0 C 33.12,36.545 22.365,41.016 13.418,49.963 4.473,58.912 0,69.663 0,82.228 L 0,392.86 c 0,12.566 4.473,23.309 13.418,32.261 8.947,8.949 19.701,13.415 32.264,13.415 l 383.72,0 c 12.566,0 23.315,-4.466 32.265,-13.415 8.945,-8.952 13.415,-19.701 13.415,-32.261 l 0,-310.632 c 0,-12.565 -4.47,-23.319 -13.415,-32.265 z M 146.183,392.85 c 0,2.673 -0.859,4.856 -2.574,6.571 -1.712,1.711 -3.899,2.562 -6.567,2.562 l -91.36,0 c -2.662,0 -4.853,-0.852 -6.567,-2.562 -1.713,-1.715 -2.568,-3.898 -2.568,-6.571 l 0,-54.82 c 0,-2.669 0.855,-4.853 2.568,-6.56 1.714,-1.719 3.905,-2.574 6.567,-2.574 l 91.363,0 c 2.667,0 4.858,0.855 6.567,2.574 1.711,1.707 2.57,3.891 2.57,6.56 l 0,54.82 z m 0,-109.629 c 0,2.663 -0.859,4.854 -2.574,6.564 -1.712,1.714 -3.899,2.569 -6.567,2.569 l -91.36,0 c -2.662,0 -4.853,-0.855 -6.567,-2.569 -1.713,-1.711 -2.568,-3.901 -2.568,-6.564 l 0,-54.819 c 0,-2.664 0.855,-4.854 2.568,-6.567 1.714,-1.709 3.905,-2.565 6.567,-2.565 l 91.363,0 c 2.667,0 4.854,0.855 6.567,2.565 1.711,1.713 2.57,3.903 2.57,6.567 l 0,54.819 z m 0,-109.634 c 0,2.666 -0.859,4.853 -2.574,6.567 -1.712,1.709 -3.899,2.568 -6.567,2.568 l -91.36,0 c -2.662,0 -4.853,-0.859 -6.567,-2.568 -1.713,-1.715 -2.568,-3.901 -2.568,-6.567 l 0,-54.817 c 0,-2.666 0.855,-4.856 2.568,-6.567 1.714,-1.713 3.905,-2.568 6.567,-2.568 l 91.363,0 c 2.667,0 4.854,0.855 6.567,2.568 1.711,1.711 2.57,3.901 2.57,6.567 l 0,54.817 z M 292.362,392.85 c 0,2.673 -0.855,4.856 -2.563,6.571 -1.711,1.711 -3.9,2.562 -6.57,2.562 l -91.369,0 c -2.663,0 -4.853,-0.852 -6.567,-2.562 -1.713,-1.715 -2.568,-3.898 -2.568,-6.571 l 0,-54.82 c 0,-2.669 0.855,-4.853 2.568,-6.56 1.714,-1.719 3.904,-2.574 6.567,-2.574 l 91.365,0 c 2.669,0 4.859,0.855 6.57,2.574 1.704,1.707 2.56,3.891 2.56,6.56 l 0,54.819 0.007,0 z m 0,-109.629 c 0,2.663 -0.855,4.854 -2.563,6.564 -1.711,1.714 -3.9,2.569 -6.57,2.569 l -91.369,0 c -2.663,0 -4.853,-0.855 -6.567,-2.569 -1.713,-1.711 -2.568,-3.901 -2.568,-6.564 l 0,-54.819 c 0,-2.664 0.855,-4.854 2.568,-6.567 1.714,-1.709 3.904,-2.565 6.567,-2.565 l 91.365,0 c 2.669,0 4.859,0.855 6.57,2.565 1.704,1.713 2.56,3.903 2.56,6.567 l 0,54.819 0.007,0 z m 0,-109.634 c 0,2.666 -0.855,4.853 -2.563,6.567 -1.711,1.709 -3.9,2.568 -6.57,2.568 l -91.369,0 c -2.663,0 -4.853,-0.859 -6.567,-2.568 -1.713,-1.715 -2.568,-3.901 -2.568,-6.567 l 0,-54.817 c 0,-2.666 0.855,-4.856 2.568,-6.567 1.714,-1.713 3.904,-2.568 6.567,-2.568 l 91.365,0 c 2.669,0 4.859,0.855 6.57,2.568 1.704,1.711 2.56,3.901 2.56,6.567 l 0,54.817 0.007,0 z M 438.536,392.85 c 0,2.673 -0.855,4.856 -2.562,6.571 -1.718,1.711 -3.908,2.562 -6.571,2.562 l -91.354,0 c -2.673,0 -4.862,-0.852 -6.57,-2.562 -1.711,-1.715 -2.56,-3.898 -2.56,-6.571 l 0,-54.82 c 0,-2.669 0.849,-4.853 2.56,-6.56 1.708,-1.719 3.897,-2.574 6.57,-2.574 l 91.354,0 c 2.663,0 4.854,0.855 6.571,2.574 1.707,1.707 2.562,3.891 2.562,6.56 l 0,54.82 z m 0,-109.629 c 0,2.663 -0.855,4.854 -2.562,6.564 -1.718,1.714 -3.908,2.569 -6.571,2.569 l -91.354,0 c -2.673,0 -4.862,-0.855 -6.57,-2.569 -1.711,-1.711 -2.56,-3.901 -2.56,-6.564 l 0,-54.819 c 0,-2.664 0.849,-4.854 2.56,-6.567 1.708,-1.709 3.897,-2.565 6.57,-2.565 l 91.354,0 c 2.663,0 4.854,0.855 6.571,2.565 1.707,1.713 2.562,3.903 2.562,6.567 l 0,54.819 z m 0,-109.634 c 0,2.666 -0.855,4.853 -2.562,6.567 -1.718,1.709 -3.908,2.568 -6.571,2.568 l -91.354,0 c -2.673,0 -4.862,-0.859 -6.57,-2.568 -1.711,-1.715 -2.56,-3.901 -2.56,-6.567 l 0,-54.817 c 0,-2.666 0.849,-4.856 2.56,-6.567 1.708,-1.713 3.897,-2.568 6.57,-2.568 l 91.354,0 c 2.663,0 4.854,0.855 6.571,2.568 1.707,1.711 2.562,3.901 2.562,6.567 l 0,54.817 z" />
            </g>
        </g>
    </svg>;


const reportIcon = <svg viewBox={iconViewBox}>
        <g>
            <rect x="0" width="75" height={iconHeight} y="0" style={{fill:"#f5f5f5",stroke:"#020202"}} />
            <path style={{fill:"#d1d1d1",stroke:"#c0c0c0",strokeWidth:"25"}} d="m 15,3 0,20" />
            <path style={{fill:"none",stroke:"#979797",strokeWidth:"25"}} d="m 15,28 0,20" />
            <path style={{fill:"none",stroke:"#3e2d2d",strokeWidth:"25"}} d="m 15,53 0,20" />
            <path style={{fill:"none",stroke:"#acacac",strokeWidth:"25"}} d="m 15,78 0,20" /><text><tspan>A</tspan></text><text><tspan>B</tspan></text><text><tspan>C</tspan></text><text><tspan>D</tspan><circle cx="50" cy="50" r="50" /></text>
        </g>
    </svg>;

const toggleIcon = <svg viewBox={iconViewBox}>
        <g style={{strokeWidth:"6"}}>
            <g style={{strokeWidth:"6"}} >
                <circle cy="50" cx="50" style={{fill:"#d1d1d1",stroke:"#000000",strokeWidth:"6"}} r="50" />
            </g>
        </g>
    </svg>;

*/

exports.default = {
    staticLevel: staticLevelIcon,
    dynamicLevel: dynamicLevelIcon,
    background: backgroundIcon,
    zonalY: zonalYIcon,
    rect: rectIcon,
    equalY: equalYIcon,
    colorScale: colorScaleIcon,
    logical: logicalIcon,
    showHide: showHideIcon
};