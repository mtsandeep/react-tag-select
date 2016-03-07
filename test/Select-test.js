'use strict';
/* global describe, it, beforeEach */
/* eslint react/jsx-boolean-value: 0 */

var jsdomHelper = require('../testHelpers/jsdomHelper');

var sinon = require('sinon');
var unexpected = require('unexpected');
var unexpectedDom = require('unexpected-dom');
var unexpectedSinon = require('unexpected-sinon');
var expect = unexpected
	.clone()
	.installPlugin(unexpectedDom)
	.installPlugin(unexpectedSinon)
	.installPlugin(require('../testHelpers/nodeListType'));

jsdomHelper();

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var Select = require('../src/ReactTagSelect');

// The displayed text of the currently selected item, when items collapsed
var DISPLAYED_SELECTION_SELECTOR = '.Select-value';
var FORM_VALUE_SELECTOR = '.Select > input';
var PLACEHOLDER_SELECTOR = '.Select-placeholder';
