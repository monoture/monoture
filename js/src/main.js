// Globals
window.$ = window.jQuery = require('jquery');
window.Tether = require('tether');

require('traceur/bin/traceur-runtime');
require('bootstrap');

// Monoture Components
require('./components/editor');
require('./components/dashboard-list');
