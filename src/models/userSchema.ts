import { timeStamp } from "console";
import {model , Schema} from "mongoose";

const userSchema = new Schema(
    {
        id:Schema.Types.ObjectId,
        name:{
            type:String,
            require:true
        },
        cpf:{
            type:String,
            require:true
        },
        statement:{
            type:[],
            require:true
            
        },
        Email:{
            type:String,
            require:true
        },
        balance:{
            type:Number,
            require:true
        },
        Type:{
            type:String,
            require:true
        },
        
    },
    {timestamps:true}

)



const UserBank = model("BankApi" , userSchema)

export default UserBank