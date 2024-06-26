import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { subTrtmdlware } from "../middleware/subTrtmntVldtn";
import { adminController } from "./injections/injuction";

export function adminRoute(router: Route) {

    // adminlogin
    router.post('/adlogin', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.adlogin(req, res, next)
    }))
    //---------------------------------------------------------------------------- treatments
    //addTreatment
    router.post('/addTreatment', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.add_treatment(req, res, next)
    }))

    //getTreatments
    router.get('/treatments', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.treatments(req, res, next)
    }))

    //change treatment status
    router.patch('/trtMntStatus/:id', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.treatmentStatus(req, res, next)
    }))

    // get single Treatment info 
    router.get('/treatment/:id', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.treatmentDetail(req, res, next)
    }))

    //edit treatment Name
    router.patch('/editTrt_Name', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.editTrtmnt(req, res, next)
    }))

    // remove subTreatment 
    router.delete('/removeSubTrtmnt', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.rmvSubTrtmnt(req, res, next)
    }))

    //update treatment
    router.patch('/edit_trtmnt', subTrtmdlware, catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.updateTreatment(req, res, next)
    }))
    //------------------------------------------------------------------------------Doctors
    // add Doctor
    router.post('/add_Doc', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.addDoc(req, res, next)
    }))

    // list/unlist Doctor route
    router.post('/doctorStatus/:id', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.docStatus(req, res, next)
    }))

    //verify doctor
    router.post('/verifyDoctor/:id', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.verifyDoc(req, res, next)
    }))

    // get Doctors
    router.get('/getDoctors', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.getDoctors(req, res, next)
    }))

    //---------------------------------------------------------------------------------------users

    // block/unblock  user route
    router.post('/block_User/:id', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.block(req, res, next)
    }))

    //get users
    router.get('/users', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.getUsers(req, res, next)
    }))
    
    //get dash board data
    router.get('/dashData', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.getDashData(req, res, next)
    }))
    return router
}