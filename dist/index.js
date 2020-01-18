"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _websocket = require('./websocket'); var _websocket2 = _interopRequireDefault(_websocket);

const app = _express2.default.call(void 0, );

//Criamos um servidor http passando o aplicativo express como argumento
const server = _http2.default.Server(app);

//e configuramos o WebSocket passando o proprio servidor.
_websocket2.default.call(void 0, server);

_mongoose2.default.connect('mongodb+srv://omnistack:omnistack@cluster0-3ablg.mongodb.net/week10', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//O express precisa usar o json() para entender que as requisições estão sendo efetivamente feitas em JSON.
app.use(_express2.default.json());
app.use(_cors2.default.call(void 0, ));
app.use(_bodyparser2.default.urlencoded({ extended: false }));
app.use(_routes2.default);

server.listen(3333);