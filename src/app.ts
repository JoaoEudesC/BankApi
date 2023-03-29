import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express()

//Middlewares
app.use(express.json())
const PORT = process.env.PORT


//Importando db de conexão do banco de dados
import connect from "../config/db"
connect()



//Importação do morgan




//Importação do roteador
import router from "./Router/router"
app.use('/users' , router)



//Porta do servidor
app.listen(PORT , async() =>{
    console.log(`O servidor está rodando em http://localhost:${PORT}`)
})