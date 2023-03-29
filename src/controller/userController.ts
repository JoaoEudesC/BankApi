import { Request , Response } from "express"
import UserBank from "../models/userSchema"


const userController = {
    //Criação de conta
    CreateUser:(req:Request , res:Response<{statusCode:number, message:string , data?:any}>): void => {},//Caso eu prefira, posso passar a função diretamente dentro das chaves, mas separando é mais organizado
    //Pegar extrato do usuário
    getUser:(req:Request , res:Response):void => {},
    //Realizar deposito
    deposit:(req:Request , res:Response):void => {},
    //Realização de saque
    saque:(req:Request , res:Response):void => {},
    //Buscar extrato bancário do usuário atrvés da data
    getExtract:(req:Request , res:Response):void => {},
    //Update User
    updateUser:(req:Request , res:Response):void =>{},
    //GetAllData
    getAllData:(req:Request , res:Response):void =>{},
    //DeleteUser
    deleteUser:(req:Request , res:Response):void =>{},
    //Get balance
    getBalance:(req:Request , res:Response):void =>{}
}


//Função de criar uma conta
userController.CreateUser = async (req , res) =>{
    try {

        const {name , cpf , Email} = req.body;
        const newUser = new UserBank({name:name , cpf:cpf , Email:Email })
        const savedUser = await newUser.save() //Repare que aqui eu estou dizendo que o meu novo usuário vai ser igual, ao meu schema, que será passado no body da requisição
        res.status(201).json({
            statusCode:201,
            message:"Usuário criado com sucesso",
            data:savedUser
        })
    } catch (error) {
        res.status(500).json({
            statusCode:500,
            message:`Erro no seu codigo ` + error
        })
    }
}

//Buscar o extrato bancário do cliente através do cpf
userController.getUser = async (req , res) =>{
    try {
        const cpf = req.headers.cpf //Estou pedindo para que ele encontre o cpf passado no headers no banco de dados e se encontrar peço o retorno
        const user = await UserBank.findOne({ cpf:cpf })   //Eu utilizo os headers quando quero buscar usuários pelo id , enviar tokens e etc, tudo isso vai diretamente no header da requisição e não no body, e muito menos na url como params
        //Repare que eu utilizei este if , para fazer uma validação para que se o cpf não estiver no banco de dados ele retorne erro
        if(!user){
            return res.status(400).json({
                statusCode:400,
                message:"User not found"
            })
        }
            //Sempre lembrar de utilizar um return em um if , para que não de o erro de que esta sendo enviado o headers depois para o usuário
            return res.status(200).json({
                statusCode:200, 
                message:"Usuário localizado com sucesso",
                user:user
        });
    } catch (error) {
            res.status(500).json({
            message:"error " + error,
            statusCode:500
        })
    }
}

//Realização de deposito
userController.deposit = async ( req , res) =>{
    try {
        const cpf = req.headers.cpf
        const user = await UserBank.findOne({ cpf:cpf })   
        if(!user){
            return res.status(400).json({
                statusCode:400,
                message:"User not found"
            })
        }
        
        let {Deposit , description} = req.body
        if(user.balance === undefined) {
            user.balance = Deposit;
            } else {
                user.balance += Deposit; //Estou utilizando esta tratativa para dizer que se houver valor no balance ele vai somar com o deposit passado na requisição, se não tiver nada no balance , pq nao foi feito deposito ele vai igualar o deposit passado no corpo da requsição ao balance, mas so se o valor for undefined, não tiver rolado deposito ainda
                user.Type = "Credito"
            }
        
            const date = new Date()
        const currentDate = date.getTime();
        const readableDate = new Date(currentDate).toLocaleString(); 
        user.statement.push({Description:description, Deposit:Deposit, Date:readableDate, Type:user.Type  }) //O que vai no corpo da requisição, estou salvando no meu array statement
        
        await user.save()
        
        res.status(200).send({
            statusCode:200,
            message:"Deposito realizado com sucesso",
            data:Deposit,
            balance:user.balance,
        
        })
    } catch (error) {
        res.status(500).json({
            message:"error " + error,
            statusCode:500
        })
    }
}


//Realização de saque
userController.saque = async (req , res) =>{
    try {
        const cpf = req.headers.cpf
        const user = await UserBank.findOne({ cpf:cpf })   
        if(!user){
            return res.status(400).json({
                statusCode:400,
                message:"User not found"
            })
        }

            let {withdraw , description} = req.body;
            if(user.balance === undefined) {
                user.balance = 0
            }
        
            else if(user.balance <= 0 ){
                return res.status(403).json({
                    statusCode:403,
                    message:"Seu saldo é em suficiente para realizar esta operação",
                    balance:user.balance

                })
            }
                else {//Estou utilizando esta tratativa para dizer que se houver valor no balance ele vai somar com o deposit passado na requisição, se não tiver nada no balance , pq nao foi feito deposito ele vai igualar o deposit passado no corpo da requsição ao balance, mas so se o valor for undefined, não tiver rolado deposito ainda
                    user.balance -= withdraw
                    user.Type = "Debito"
                }

                const date = new Date()
                const currentDate = date.getTime();
                const readableDate = new Date(currentDate).toLocaleString(); //Pegando a data atual para adicionar ao elemento
                
                user.statement.push({Description:description , withdraw:withdraw , Date:readableDate , Type:user.Type}) //Estou salvando o saque e a descrição do saque no meu statement, no array que esta no meu schema
                await user.save()
                
                return res.status(200).json({
                message:"Saque realizado com sucesso",
                statusCode:200,
                data:withdraw,
                balance:user.balance,
                
            })
            
        
        
        } catch (error) {
        res.status(500).json({
            message:"error " + error,
            statusCode:500
        })
    }
}


//Deve ser possivel buscar o extrato bancario do cliente por date(statement)

userController.getExtract = async (req , res) =>{
    try {
        const cpf = req.headers.cpf //Estou pedindo para que ele encontre o cpf passado no headers no banco de dados e se encontrar peço o retorno
        const user = await UserBank.findOne({ cpf:cpf })   //Eu utilizo os headers quando quero buscar usuários pelo id , enviar tokens e etc, tudo isso vai diretamente no header da requisição e não no body, e muito menos na url como params
        //Repare que eu utilizei este if , para fazer uma validação para que se o cpf não estiver no banco de dados ele retorne erro
        if(!user){
            return res.status(400).json({
                statusCode:400,
                message:"User not found"
            })
        }
            //Sempre lembrar de utilizar um return em um if , para que não de o erro de que esta sendo enviado o headers depois para o usuário
            return res.status(200).json({
                statusCode:200, 
                message:"Usuário localizado com sucesso",
                statement:user?.statement,
                nome:user?.name
        });
    } catch (error) {
            res.status(500).json({
            message:"error " + error,
            statusCode:500
        })
    }
}



//Atualizar os dados do usuário

userController.updateUser = async (req , res) =>{
    try {
        
        
        const cpf = req.headers.cpf
        const user = await UserBank.findOne({ cpf:cpf })   
        if(!user){
            return res.status(400).json({
                statusCode:400,
                message:"User not found"
            })
        }
        
        
        const {name , Email ,} = req.body
        const userUpdated = await UserBank.findOneAndUpdate({Email:Email , name:name})
        res.status(200).json({
            message:"Usuário atualizado com sucesso",
            statusCode:200,
            Name:userUpdated?.name,
            Email:userUpdated?.Email
        
        })
    } catch (error) {
        res.status(500).json({
            message:"erro " + error
        })
    }
}


//Deletar usuário
userController.deleteUser = async(req , res) =>{
    try {
        const cpf = req.headers.cpf
        const user = await UserBank.findOne({ cpf:cpf })   
        if(!user){
            return res.status(400).json({
                statusCode:400,
                message:"User not found"
            })
        }

        const userDeleted = await UserBank.findOneAndDelete({cpf:cpf})
        res.status(200).json({
            message:"Usuário deletado com sucesso",
            statusCode:200,
            data:userDeleted
        })
    } catch (error) {
        res.status(500).json({
            message:"erro " + error
        })
    }
}


//Retornar o balance do usuário
userController.getBalance = async(req , res) =>{
    try {
        const {Email} = req.body;
        const cpf = req.headers.cpf
        const user = await UserBank.findOne({ cpf:cpf }) 
        if(!user){
            return res.status(400).json({
                statusCode:400,
                message:"User not found"
            })
        }
        const email = await UserBank.findOne({Email:Email})
        
        res.status(200).json({
            message:"O seu balance atualizado",
            Balance:user?.balance,
            Email:user.Email
        })

    } catch (error) {
        res.status(500).json({
            message:"erro " + error
        })
    }
}


















export default userController