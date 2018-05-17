'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Child = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../react-minimap.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Child = exports.Child = function (_React$Component) {
  (0, _inherits3.default)(Child, _React$Component);

  function Child() {
    (0, _classCallCheck3.default)(this, Child);
    return (0, _possibleConstructorReturn3.default)(this, (Child.__proto__ || (0, _getPrototypeOf2.default)(Child)).apply(this, arguments));
  }

  (0, _createClass3.default)(Child, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          left = _props.left,
          top = _props.top;

      return _react2.default.createElement('div', {
        style: {
          position: 'absolute',
          width: width,
          height: height,
          left: left,
          top: top
        },
        className: 'minimap-children'
      });
    }
  }]);
  return Child;
}(_react2.default.Component);

Child.propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  top: _propTypes2.default.number.isRequired,
  left: _propTypes2.default.number.isRequired,
  node: _propTypes2.default.any
};
exports.default = Child;