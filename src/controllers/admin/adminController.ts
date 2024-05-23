import { IadminUseCase } from "../../useCase/interface/IntrfcUseCase/adminUseCase";
import { Req, Res, Next } from "../../frameworks/types/serverPackageTypes";

import { accessTokenOptions, refreshTokenOptions } from "../../frameworks/middlewares/tokenOptions";
import ErrorHandler from "../../useCase/middleware/errorHandler";
import { IDoctor } from "../../entity/doctorEntity";


export class AdminController {
    private adminUseCase: IadminUseCase;

    constructor(adminUseCase: IadminUseCase) {
        this.adminUseCase = adminUseCase
    }

    // admin login
    async adlogin(req: Req, res: Res, next: Next) {
        try {
            const result = await this.adminUseCase.adlogin(req.body, next)
            
            if (result) {
                res.cookie('accessToken', result?.tokens.accessToken, accessTokenOptions)
                res.cookie('refreshToken', result?.tokens.accessToken, refreshTokenOptions)

                res.status(200).json({ admin: result?.admin, token: result.tokens.accessToken, message: 'admin logged in' })
            }

        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }

    //-----------------------------------------------------------------------------------------------------Treatments    


    //add Treatment
    async add_treatment(req: Req, res: Res, next: Next) {
        try {
            const result = await this.adminUseCase.addTreatment(req.body, next)
            if (result) {
                res.status(200).json(result)
            }

        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }

    //get Treatments
    async treatments(req: Req, res: Res, next: Next) {
        try {
            const result = await this.adminUseCase.getTreatmentUsecase(req, next)
            res.status(200).json(result)

        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }
    }

    // get single Treatment info 
    async treatmentDetail(req: Req, res: Res, next: Next) {
        try {
            const id: string = req.params.id
            const result = await this.adminUseCase.findTreatmentUseCase(id, next)
            res.status(200).json(result)
        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }

    // remove single subTreatment 
    async rmvSubTrtmnt(req: Req, res: Res, next: Next) {

        try {
            const id: string = req.body.id
            const subName: string = req.body.subName
            const result = await this.adminUseCase.deleteSubTrtmntUseCase(id,subName)
            res.status(200).json(result)
            
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }

    }

    //edit treatment name 
    async editTrtmnt(req:Req,res:Res,next:Next){
        try {
            const {name,id}:{name:string,id:string} = req.body
            const result = await this.adminUseCase.editTnameUseCase(name,id,next)
            res.status(201).json(result)
        } catch (error) {
            next (new ErrorHandler(500,error as Error))
        }
    }

    //update treatment
    async updateTreatment(req:Req,res:Res,next:Next){
        try {
            const id:string =req.body.id
            const subTreatments:[] =req.body.subTreatments

            const result = await this.adminUseCase.updateTreatmentUseCase(id,subTreatments)
            res.json(result)
        } catch (error:any) {
            return next(new ErrorHandler(500,error.message))
        }
    }

    // change Treatment status
    async treatmentStatus(req: Req, res: Res, next: Next) {
        try {
            const id: string = req.params.id
            const result = await this.adminUseCase.trtmntStsUseCase(id)
            res.status(200).json(result)
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }
    }



    // ----------------------------------------------------------------------------------------Doctor

    //add Doctor
    async addDoc(req: Req, res: Res, next: Next) {
        try {
            const {
                name,
                email,
                mob,
                password,
                address,
                experience,
                doctor_id,
                treatment,
                subTreatment,
                amount
            }: IDoctor = req.body

            let docResult = await this.adminUseCase.addDoctor({ name, email, mob, password, address, experience, doctor_id, treatment, subTreatment,amount }, next)
            if (docResult) {
                res.status(200).json(docResult)
            }
            else if (docResult === undefined) {
                res.status(200).json('doctor exists')
            }

        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }


    // list or unlist doctor 
    async docStatus(req: Req, res: Res, next: Next) {
        try {
            let id: string = req.params.id
            const lstUnlstDocRslt = await this.adminUseCase.listUnlstDoc(id, next)
            res.status(200).json(lstUnlstDocRslt)
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }
    }

    //verify docotor
    async verifyDoc (req:Req,res:Res,next:Next){
        try {
            const id:string=req.params.id
            const result = await this.adminUseCase.verifyDoctor(id,next)
            res.status(200).json(result)
        } catch (error:any) {
            return next (new ErrorHandler(500,error.message))
        }
    }

    //get doctors
    async getDoctors(req: Req, res: Res, next: Next) {
        try {
            let result = await this.adminUseCase.getDoctorsUseCase(req, next)
            res.status(200).json(result)
        } catch (err) {
            return next(new ErrorHandler(500, err as Error).message)
        }
    }

    //------------------------------------------------------------------------------------------------------- user

    // block or unblock user 
    async block(req: Req, res: Res, next: Next) {
        try {
            const id: string = req.params.id
            const usrBlckRslt = await this.adminUseCase.blockUser(id, next)
            res.status(200).json(usrBlckRslt)
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }
    }

    //get users
    async getUsers(req: Req, res: Res, next: Next) {
        try {
            const page:number = Number(req?.query?.page)
            // const page:any = data?.page

            const result = await this.adminUseCase.getUsersUsecase(page, next)
            res.status(200).json(result)

        } catch (err) {
            return next(new ErrorHandler(500, (err as Error).message))
        }
    }


    //get dash data
    async getDashData(req: Req, res: Res, next: Next) {
        try {
            const result = await this.adminUseCase.getDashDataUseCase(req,next)
            res.status(200).json(result)
        } catch (error) {
           return next(new ErrorHandler(500,(error as Error).message)) 
        }
    }

}