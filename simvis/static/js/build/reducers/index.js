'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _shapeCollection = require('./shapeCollection.jsx');

var _shapeCollection2 = _interopRequireDefault(_shapeCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simvisApp = (0, _redux.combineReducers)({
  shapeCollection: _shapeCollection2.default
});

exports.default = simvisApp;