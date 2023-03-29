import config from "config"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()





async function connect(){
    const MONGODB_URI = config.get<string>("MONGODB_URI")  //Repare que com typescript  para a gente pegar os elementos do dotenv a gente tem que tipar, e utilizar o config é uma otima alternativa para isso
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("connection succesfull")
    } catch (error) {
        console.log("Não foi possivel conectar " + error)
        process.exit(1)    //Sempre bom utilizar este comando para caso o banco de dados não seja conectado o aplicativo não continuar a executar
    }
}




export default connect