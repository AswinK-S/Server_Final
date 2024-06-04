import mongoose from "mongoose";

    export interface Iuser {
        _id?:string,
        name:string,
        email:string,
        mob:number,
        password:string,
        status?:boolean,
        isVerified?:boolean,
        isGoogle?:boolean,
        image?:string,
        prescriptions?:mongoose.Types.ObjectId[]
    }