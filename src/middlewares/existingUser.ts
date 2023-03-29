import UserBank from "../models/userSchema";
import { Request , Response , NextFunction } from "express";

export const checkiingEmail = async(req:Request , res:Response , next:NextFunction) =>{
    const existingEmail = await UserBank.findOne({Email:req.body.Email})
    if(existingEmail){
        res.status(422).json({
            statusCode:422,
            message:"Este email já existe"
        })
    }
    else{
        next()
    }
}
export const checkingexistingCpf = async(req:Request , res:Response , next:NextFunction) =>{
    const existingCpf = await UserBank.findOne({cpf:req.body.cpf})
    if(existingCpf){
        res.status(422).json({
            statusCode:422,
            message:"Este cpf já existe"
        })
    }
    else{
        next()
    }
}


 




