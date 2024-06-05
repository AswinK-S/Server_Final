import { Req, Res, Next } from "../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../useCase/middleware/errorHandler";

import { IDoctorUseCase } from "../../useCase/interface/IntrfcUseCase/doctorUseCase";
import { Query } from "../../entity/query";
import { IPrescriptionUseCase } from "../../useCase/interface/IntrfcUseCase/prescriptionUseCase";
export class DoctorController {
    private doctorUseCase: IDoctorUseCase
    private prescriptionUseCase:IPrescriptionUseCase
    constructor(doctorUseCase: IDoctorUseCase,
        prescriptionUseCase:IPrescriptionUseCase
    ) {
        this.doctorUseCase = doctorUseCase
        this.prescriptionUseCase = prescriptionUseCase
    }

    // login
    async doclogin(req: Req, res: Res, next: Next) {
        try {
            const { email, password }: { email: string, password: string } = req.body
            const result = await this.doctorUseCase.login({ email, password }, next)
            if (result) {
                res.status(201).json({ doctor: result.doctor, token: result.token.accessToken, message: 'doctor logged in' })
            }
        } catch (err: any) {
            return new ErrorHandler(500, err.message)
        }
    }

    //get doctor details
    async getDoctor(req:Req,res:Res,next:Next){
        try {
            const id:string= req.params.id
            const result = await this.doctorUseCase.getDocDetailUseCase(id,next)
            res.status(200).json(result)
        } catch (error:any) {
            return new ErrorHandler(500,error.message)
        }
    }
 

    // post doctor details 
    async doctorDetails(req: Req, res: Res, next: Next) {
        try {
            const { id, name, mob, address }: { id: string, name: string, mob: string, address: string } = req.body
            
            const query: Query = {};
            
            if (name) {
                query.name = name;
            }
            if (mob) {
                query.mob = mob;
            }
            if (address) {
                query.address = address;
            }

            const result = await this.doctorUseCase.updateProfileUseCase(id,query,next)

        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }


       //update profile image
       async profileImg(req: Req, res: Res, next: Next) {
        try {
            const image: any = req.file
            const id: string = req.body.id
            const result = await this.doctorUseCase.uploadProfileImage(image, id, next)
            res.status(200).json(result)
        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }

    // upload document 
    async uploadDoc(req:Req,res:Res,next:Next){
        try{
            const image:any = req.file
            const id: string = req.body.id
            const result = await this.doctorUseCase.uploadDoc(image,id,next)
            res.status(200).json(result)
            

        }catch(error){
            return next( new ErrorHandler(500,(error as Error).message))
        }
    }


    //create slot
    async createSlot (req:Req,res:Res,next:Next){
        try {
            const {selectedShift,selectedDate,id}:{selectedShift:string,selectedDate:string,id:string} =req.body
            const date:string =selectedDate


            const result = await this.doctorUseCase.create_slot(selectedShift,selectedDate,id,next)
            res.status(200).json(result)
        } catch (error) {
            return next(new ErrorHandler(500,(error as Error).message))
        }
    }

    //get the slots
    async getSlots (req:Req,res:Res,next:Next){
        try {
            const id:string= req.params.id
            const pageNumber:number =Number(req.params.pageNumber)
            const pageSize: number = Number(req.params.pageSize)
            const result = await this.doctorUseCase.get_slots(id,pageNumber,pageSize,next)
            res.status(200).json(result)
        } catch (error) {
            return next (new ErrorHandler(500,(error as  Error).message))
        }
    }

    //get Patients
    async getPatients(req:Req,res:Res,next:Next){
        try {
            const id:string = req.query.docId as string
            const limit:number = Number(req.query.limit)
            const page:number = Number(req.query.page)
            const result = await this.doctorUseCase.getPatientsUseCase(id,limit,page,next)
            res.status(200).json(result)
        } catch (error) {
             return next (new ErrorHandler(500,(error as Error).message))
        }
    }

    //get data for overview
    async getOverview(req:Req,res:Res,next:Next){
        try {
            const id:string = req.query.id as string
            const result = await this.doctorUseCase.getOverviewUseCase(id,next)
            res.status(200).json(result)
        } catch (error) {
            return next (new ErrorHandler(500,(error as Error).message))
        }
    }

    //confirm consultaion
    async confirmConsultation(req:Req,res:Res,next:Next){
        try {
            const {docId,bookingId}:{docId:string,bookingId:string} = req.body
            const result = await this.doctorUseCase.confirmConsultationUseCase(docId,bookingId,next)
            res.status(200).json(result)
        } catch (error) {
            return next (new ErrorHandler(500,(error as Error).message))
        }
    }

    //add prescription
    async addPrescription(req:Req,res:Res,next:Next){
        try{
            const {prescription,docId,bookingId,userEmail}:{prescription:string,docId:string,bookingId:string,userEmail:string}=req.body
            const result = await this.prescriptionUseCase.addPrescriptionUseCase(prescription,docId,bookingId,userEmail)
              res.status(200).json(result)
        }catch(error){
            return next(new ErrorHandler(500,(error as Error).message))
        }
    }

}