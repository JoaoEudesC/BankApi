import  express, { Router } from "express";

const router = express.Router()
import userController from "../controller/userController";
import {checkiingEmail , checkingexistingCpf} from "../middlewares/existingUser"




//Rota de criação de usuário
router.post("/create" , checkiingEmail , checkingexistingCpf, userController.CreateUser)
 
//Pegando extrato do usuário pelo cpf
router.get("/getUser" , userController.getUser)

//realizar um deposito
router.post("/deposit" , userController.deposit)

//Realizar saque
router.post("/saque" , userController.saque)

//Verificar os extratos dos usuários
router.get("/getExtract" , userController.getExtract)

//update user
router.put("/updateUser" , userController.updateUser)

//Delete User
router.delete("/deleteUser" , userController.deleteUser )

//getBalance
router.get("/getBalance" , userController.getBalance)











export default router