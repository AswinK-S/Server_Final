import { Iuser } from "../../../entity/userEntity"
import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc"
import { IHashPassword } from "../../interface/services/hashPassword"
import { IJwt, IToken } from "../../interface/services/jwt.types"

export const googleSignUPFn = async(name:string,email:string,mob:number,password:string,userRepository:IUserRepository,bcrypt:IHashPassword,jwtTokenGenerator:IJwt):Promise<{user:Iuser,message:string,token?:IToken}|void>=>{
    try {
        
        const isUser = await userRepository.findUsersByEmail(email)

        if(isUser){
            if(isUser?.isGoogle!==true){
                return {user:isUser,message:'user already exist in this email',}
            }
        }

        // if the user is already registered with google 
        if(isUser && isUser?.isGoogle){
            const role:string='user'
            const userToken = await jwtTokenGenerator.createAccessAndRefreshToken(isUser?._id as string,role as string)
            return {user:isUser,message:'user registered',token:userToken}        

        }

        const hashedPassword :string = await bcrypt.createHash(password as string)
        const user:Iuser ={
            name:name,
            email:email,
            mob:mob,
            password:hashedPassword,
            isGoogle:true
        }
        const result = await userRepository.createUser(user)
        const JwtToken = await jwtTokenGenerator.createVerificationJwt({ name, email, password, mob })
        const role:string='user'
        const userToken = await jwtTokenGenerator.createAccessAndRefreshToken(result?._id as string,role as string)
        result.password=''
        return {user:result,message:'user registered',token:userToken}        

    } catch (error) {
        throw (error as Error)
    }
}