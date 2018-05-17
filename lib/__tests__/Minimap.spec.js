'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMinimap = require('../react-minimap');

var _reactMinimap2 = _interopRequireDefault(_reactMinimap);

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

describe('Minimap', function () {

  it('should mount without any warning', function () {
    // react writes to console.error on a PropType error :(
    var errors = [];
    _sinon2.default.stub(console, 'error').callsFake(function (error) {
      errors.push(error);
    });

    (0, _enzyme.render)(_react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactMinimap2.default,
        { selector: '.subject' },
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            'Hello ',
            _react2.default.createElement(
              'span',
              { className: 'subject' },
              'Minimap'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            'Hello ',
            _react2.default.createElement(
              'span',
              { className: 'subject' },
              'World'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            'Hello ',
            _react2.default.createElement(
              'span',
              { className: 'subject' },
              'Blah'
            )
          )
        )
      )
    ));
    expect(errors).toEqual([]);
  });
});