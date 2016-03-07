'use strict';
/* global describe, it, beforeEach */

var helper = require('../testHelpers/jsdomHelper');
helper();

var unexpected = require('unexpected');
var unexpectedDom = require('unexpected-dom');
var unexpectedSinon = require('unexpected-sinon');
var sinon = require('sinon');

var expect = unexpected
	.clone()
	.installPlugin(unexpectedSinon)
	.installPlugin(unexpectedDom);

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var OPTION = { label: 'TEST-LABEL', value: 'TEST-VALUE' };

var Value = require('../src/Tag');
