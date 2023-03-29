"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var userController_1 = require("../controller/userController");
var existingUser_1 = require("../middlewares/existingUser");
//Rota de criação de usuário
router.post("/create", existingUser_1.checkiingEmail, existingUser_1.checkingexistingCpf, userController_1.default.CreateUser);
//Pegando extrato do usuário pelo cpf
router.get("/getUser", userController_1.default.getUser);
//realizar um deposito
router.post("/deposit", userController_1.default.deposit);
//Realizar saque
router.post("/saque", userController_1.default.saque);
//Verificar os extratos dos usuários
router.get("/getExtract", userController_1.default.getExtract);
//update user
router.put("/updateUser", userController_1.default.updateUser);
//Delete User
router.delete("/deleteUser", userController_1.default.deleteUser);
//getBalance
router.get("/getBalance", userController_1.default.getBalance);
exports.default = router;
