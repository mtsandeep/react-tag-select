'use strict';
/* eslint react/jsx-boolean-value: 0 */

// Emulating the DOM here, only so that if this test file gets
// included first, then React thinks there's a DOM, so the other tests
// (e.g. Select-test.js) that do require a DOM work correctly

var jsdomHelper = require('../testHelpers/jsdomHelper');
jsdomHelper();
var unexpected = require('unexpected');
var unexpectedReact = require('unexpected-react');
var unexpectedSinon = require('unexpected-sinon');
var expect = unexpected
	.clone()
	.installPlugin(unexpectedReact)
	.installPlugin(unexpectedSinon);

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var sinon = require('sinon');


var Select = require('../src/ReactTagSelect');
