"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
const router = _express.Router.call(void 0, );

//Query Params: Parâmetros enviados pela URL, acessados por: req.query
//Route Params: Parâmetro enviados diretamente na rota. Ex: /users/:id. Acessados por: req.params
//Body: Corpo da requisição. Acessado por: req.body
router.post('/', (req, res) => {
    let user = req.body.user;
    res.json({ success: true, message: "Successfully requested users!", sentUser: user });
});

exports. default = router;