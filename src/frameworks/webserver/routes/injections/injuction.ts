import userModel from "../../../database/mongo/models/userModel";
import { UserRepository } from "../../../database/mongo/repository/userRepository";
import { UserUseCase } from "../../../../useCase/useCases/userUseCase";
import { UserController } from "../../../../controllers/user/userController";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";
import { OtpRepository } from "../../../database/mongo/repository/otp.repository";
import { JWTtoken } from "../../../services/jwt";
import { Encrypted } from "../../../services/hshPswrdCls";
import { Cloudinary } from "../../../utils/cloudinaryRepo";
//treatment
import { TreatmentRepository } from "../../../database/mongo/repository/treatmentRepo";
import treatmentModel from "../../../database/mongo/models/treatmentModel";
//doctor
import doctorModel from "../../../database/mongo/models/doctorModel";
import { DoctorRepository } from "../../../database/mongo/repository/doctorRepository";
import { DoctorController } from "../../../../controllers/doctor/doctorController";
import { DoctorUseCase } from "../../../../useCase/useCases/doctorUseCase";

//slot
import slotModel from "../../../database/mongo/models/slot";

//admin 
import adminModel from "../../../database/mongo/models/adminModel";
import { AdminController } from "../../../../controllers/admin/adminController";
import { AdminRepository } from "../../../database/mongo/repository/adminRepository";
import { AdminUseCase } from "../../../../useCase/useCases/adminUseCase";
import { Stripe } from "../../../utils/stripeRepo";

import { ResendOtpController } from "../../../../controllers/user/resendOtpController";
import { GetOtpController } from "../../../../controllers/doctor/otpController";
import { VerifyOtpController } from "../../../../controllers/doctor/verifyOtpController";
import { UpdatePasswordController } from "../../../../controllers/doctor/updatePassword";

//booking
import { BookingRepository } from "../../../database/mongo/repository/bookingRepository";
import bookingModel from "../../../database/mongo/models/booking";
import { MessageController } from "../../../../controllers/messages/messageController";
import { ConversationController } from "../../../../controllers/messages/conversationController";

//chat 
import messageModel from "../../../database/mongo/models/Message";
import conversationModel from "../../../database/mongo/models/Conversation";
import { ChatUseCase } from "../../../../useCase/useCases/chatUseCase";
import { ChatRepository } from "../../../database/mongo/repository/chatRepository";
import { MessageRepository } from "../../../database/mongo/repository/messageRepository";


//prescription
import { PrescriptionUseCase } from "../../../../useCase/useCases/prescriptionUseCase";
import prescriptionModel from "../../../database/mongo/models/prescriptionModel";
import { PrescriptionRepository } from "../../../database/mongo/repository/prescriptionRepo";

const cloudinary = new Cloudinary()

const chatRepository = new ChatRepository(conversationModel)
const messageRepository = new MessageRepository(messageModel)
const chatUseCase = new ChatUseCase(chatRepository,messageRepository,cloudinary)

//booking
const bookingRepository = new  BookingRepository(bookingModel,slotModel);

//stripe payment
const stripe = new Stripe(bookingRepository)

//user
const userRepository = new UserRepository(userModel,doctorModel,slotModel,treatmentModel,bookingModel)
const generateOtp = new GenerateOtp()
const sendMail = new SendMail()
const otpRepository = new OtpRepository()
const bcryptService = new Encrypted()
const jwtToken = new JWTtoken()
const doctorRepository = new DoctorRepository(doctorModel,slotModel,bookingModel,userModel)

//admin
const adminRepository = new AdminRepository(adminModel,userModel,doctorModel,treatmentModel)

// treatment 
const treatmetnRepository = new TreatmentRepository()

const userUseCase = new UserUseCase(
    userRepository,
    generateOtp,
    sendMail,
    otpRepository,
    jwtToken,
    bcryptService,
    stripe,
    bookingRepository,
    cloudinary
)


const adminUseCase = new AdminUseCase(
    adminRepository,
    bcryptService,
    jwtToken,
    treatmetnRepository,
    doctorRepository,
    userRepository,
    sendMail,
    bookingRepository
)

const doctorUseCase = new DoctorUseCase(
    doctorRepository,
    bcryptService,
    jwtToken,
    cloudinary,
    sendMail,
    generateOtp,
    otpRepository,
    bookingRepository
    )


//prescription
const prescriptionRepository = new PrescriptionRepository(userModel,prescriptionModel)
const prescriptionUseCase = new PrescriptionUseCase(prescriptionRepository)   


//users controllers
const userController = new UserController(userUseCase,adminUseCase,chatUseCase)
const resendOtpController = new ResendOtpController(userUseCase)

//admin controllers
const adminController = new AdminController(adminUseCase)

//doctor controllers
const doctorController = new DoctorController(doctorUseCase,prescriptionUseCase)
const getOtpController =new GetOtpController(doctorUseCase)
const verifyOtpController = new VerifyOtpController(doctorUseCase)
const updatePasswordController = new UpdatePasswordController(doctorUseCase)

const messageController = new MessageController(chatUseCase)
const conversationcontroller = new ConversationController(chatUseCase)

export {
    userController,
    adminController,
    doctorController,
    resendOtpController,
    getOtpController,
    verifyOtpController,
    updatePasswordController,
    messageController,
    conversationcontroller
}
