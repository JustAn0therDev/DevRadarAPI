"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

const app = _express2.default.call(void 0, );

var _usersjs = require('./controllers/users.js'); var _usersjs2 = _interopRequireDefault(_usersjs);

app.use(_cors2.default.call(void 0, ));
app.use('/users', _usersjs2.default);

app.listen(9000);