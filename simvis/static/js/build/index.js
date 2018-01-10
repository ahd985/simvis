'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _simvis = require('./containers/simvis.jsx');

var _simvis2 = _interopRequireDefault(_simvis);

var _index = require('./reducers/index.jsx');

var _index2 = _interopRequireDefault(_index);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { whyDidYouUpdate } from 'why-did-you-update'
//whyDidYouUpdate(React);

var store = (0, _redux.createStore)(_index2.default);
(0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_simvis2.default, null)
), document.getElementById('simvis-container'));