import { IUserUseCase } from "../../useCase/interface/IntrfcUseCase/userUseCase";
import { Req, Res, Next } from "../../frameworks/types/serverPackageTypes";

import ErrorHandler from "../../useCase/middleware/errorHandler";

import {
  accessTokenOptions,
  refreshTokenOptions
} from "../../frameworks/middlewares/tokenOptions";

import { IadminUseCase } from "../../useCase/interface/IntrfcUseCase/adminUseCase";
import { IChatUseCase } from "../../useCase/interface/IntrfcUseCase/chatUseCase";
import { IPrescriptionUseCase } from "../../useCase/interface/IntrfcUseCase/prescriptionUseCase";
import { generatePrescriptionPdf } from "../../frameworks/utils/prescriptionPdf";


export class UserController {
  private userUseCase: IUserUseCase;
  private adminUseCase: IadminUseCase;
  private chatUseCase: IChatUseCase;
  private prescriptionUseCase: IPrescriptionUseCase
  constructor(userUseCase: IUserUseCase, adminUseCase: IadminUseCase, chatUseCase: IChatUseCase, prescriptionUseCase: IPrescriptionUseCase) {
    this.userUseCase = userUseCase;
    this.adminUseCase = adminUseCase;
    this.chatUseCase = chatUseCase;
    this.prescriptionUseCase = prescriptionUseCase
  }

  //--------------------------------------------------get treatments
  async treatments(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getTreatmentUsecase(req, next)

      if (result) {

        const trt: any[] = result.map((dat) => {
          return {
            ...dat,
            subTreatments: dat.subTreatments.filter((dat1: any) => dat1.status === true),
          };
        });

      }

      res.status(200).json(result)
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message))
    }
  }


  //-----------------------------------------------------register
  async registerUser(req: Req, res: Res, next: Next) {
    try {

      const token = await this.userUseCase.registerUser(req.body, next)

      res.cookie('verificationToken', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      res.status(200).json({
        success: true,
        message: "verification otp has been sent the mail",
      });

    } catch (err: any) {
      return next(new ErrorHandler(err.status, err.message))
    }
  }


  //------------------------------------------------------creating user
  async createUser(req: Req, res: Res, next: Next) {
    try {
      const token = req.cookies.verificationToken as string || ''
      const otp: string = req.body.otp
      const email: string = req.body.email
      const result = await this.userUseCase.createUser(
        otp,
        email,
        token,
        next
      )
      res.clearCookie('verificationToken').send(result)
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message))
    }
  }

  //-----------------------------------------------------login
  async login(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.login(req.body, next);

      res.cookie('accessToken', result?.tokens.accessToken, accessTokenOptions)
      res.cookie('refreshToken', result?.tokens.accessToken, refreshTokenOptions)


      if (result) res.status(200).json({ user: result?.user, token: result.tokens.accessToken, message: 'user logged in ' });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message))
    }
  }


  //---------------------------------------------------------google auth signup
  async googleSignUP(req: Req, res: Res, next: Next) {
    try {
      const { name, email, mob }: { name: string, email: string, mob: number } = req.body
      const password: string = process.env.GAuth_Pasword as string

      const result = await this.userUseCase.googleSignUpUseCase(name, email, mob, password, next)
      res.status(201).json({ userId: result, message: result?.message, token: result?.token?.accessToken })
    } catch (error) {
      next(new ErrorHandler(400, error as Error))
    }
  }

  //---------------------------------------------------------verify email for forgot password
  async verifyEmail(req: Req, res: Res, next: Next) {
    try {
      const { email }: { email: string } = req.body
      const result = await this.userUseCase.verifyEmailUseCase(email, next)
      if (result) res.status(201).json(result)


    } catch (error) {
      next(new ErrorHandler(400, error as Error))
    }
  }


  //-----------------------------------------------------submit otp for forgot password
  async verifyOtp(req: Req, res: Res, next: Next) {
    try {
      const { email, otp }: { email: string, otp: string } = req.body
      const result = await this.userUseCase.verifyOtpUseCase(email, otp, next)
      res.status(200).json(result)
    } catch (error) {
      next(new ErrorHandler(400, error as Error))
    }
  }

  //-------------------------------------------update password for forgot password
  async updatePassword(req: Req, res: Res, next: Next) {
    try {
      const { newPassword, email }: { newPassword: string, email: string } = req.body
      const result = await this.userUseCase.updatePasswordUseCase(newPassword, email, next)
      if (result) {
        res.status(200).json({ message: 'updated' })
      } else {
        res.status(200).json({ message: 'try using another password' })
      }

    } catch (error) {
      next(new ErrorHandler(400, error as Error))
    }
  }


  //-----------------------------------change password
  async changePassword(req: Req, res: Res, next: Next) {
    try {
      const id: string = req.query.id as string
      const password: string = req.query.password as string
      const result = await this.userUseCase.changePasswordUseCase(id, password, next)

      res.status(200).json(result)
    } catch (error) {
      next(new ErrorHandler(500, error as Error).message)
    }
  }

  //--------------------------------------------------update profile image
  async profileImage(req: Req, res: Res, next: Next) {
    try {
      const image: any = req.file
      const id: string = req.body.id
      const result = await this.userUseCase.uploadProfileImageUseCase(image, id, next)
      res.status(200).json(result)
    } catch (error) {
      next(new ErrorHandler(500, error as Error).message)
    }

  }

  //---------------------------------------------------update profile
  async updateProfile(req: Req, res: Res, next: Next) {
    try {
      const { name, email, mob, id }: { name: string, email: string, mob: string, id: string } = req.body
      const result = await this.userUseCase.updateProfileUseCase(name, email, mob, id, next)
      res.status(200).json(result)
    } catch (error) {
      next(new ErrorHandler(500, error as Error).message)
    }
  }
  //---------------------------------------------------get user details for chat

  async getUserInfo(req: Req, res: Res, next: Next) {
    try {
      const userId: string = req.params.userId;
      const result = await this.userUseCase.getUserInfoUseCase(userId, next)
      res.status(200).send(result)
    } catch (error) {
      next(new ErrorHandler(500, error as Error))
    }
  }


  //------------------------------------------------------get doctor according to subTreatment

  async getDoctorForTrtmnt(req: Req, res: Res, next: Next) {
    try {
      const id: string = req.params.id
      const date: string = req.params.date
      const result = await this.userUseCase.getDoctorUseCase(id, date, next)
      res.status(200).json(result)
    } catch (error) {
      return next(new ErrorHandler(400, error as Error))
    }
  }

  //-----------------------------------------get bookings details for user
  async getBookingDetails(req: Req, res: Res, next: Next) {
    try {


      const email: string = req.params.email as string
      const page: number = Number(req.params.page)
      const pageSize: number = Number(req.params.pageSize)
      const result = await this.userUseCase.getBookingDetailsUseCase(page, email, pageSize, next)
      res.status(200).json(result)

    } catch (error) {
      return next(new ErrorHandler(500, error as Error))
    }
  }

  //----------------------------------get details for booking
  async getBookingDtls(req: Req, res: Res, next: Next) {
    try {
      const { docId, treatmentId, sbTrtmntId, } = req.query as { docId: string, treatmentId: string, sbTrtmntId: string }
      const result = await this.userUseCase.bookingDetailsUseCase(treatmentId, sbTrtmntId, docId, next)

      res.status(200).json(result)
    } catch (error) {
      return next(new ErrorHandler(400, error as Error))
    }
  }

  //------------------------------------------------booking payment
  async makePayment(req: Req, res: Res, next: Next) {
    try {
      req.app.locals.bookingData = req.body
      const {
        amount, email, treatmentName, doctorId, treatmentId, subTreatmentId, consultingDate
      }: {
        amount: number, email: string, treatmentName: string, doctorId: string, treatmentId: string, subTreatmentId: string, consultingDate: string
      } = req.body
      const result = await this.userUseCase.paymentUseCase(amount, email, treatmentName, doctorId, treatmentId, subTreatmentId, consultingDate, next)
      console.log('payment --',result);
      res.status(200).json(result)

    } catch (error) {
      return next(new ErrorHandler(400, error as Error))
    }
  }

  //----------------------------------------payment webhook
  async paymentWebHook(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.paymentWebhookUseCase(req, next)
      console.log('wb hk rslt',result);
      if (result) {
        const bookingData = req.app.locals.bookingData
        const chargeId: string = req.app.locals.chargeId
        await this.userUseCase.createBookingUseCase(bookingData, chargeId, next)
        await this.chatUseCase.conversationUseCase(bookingData.userId, bookingData.doctorId, next)
      } 
    } catch (error) {
      return next(new ErrorHandler(400, error as Error))
    }
  }

  //------------------------------------------------------------get doctors for chat from booking
  async getDoctorsForChat(req: Req, res: Res, next: Next) {
    try {
      const email: string = req.query.email as string
      const result = await this.userUseCase.getDoctorsUseCase(email, next)
      res.status(200).json(result)
    } catch (error) {
      return next(new ErrorHandler(400, error as Error))
    }
  }

  //-----------------------------------------------------------------get users for chat from booking
  async getUsersForChat(req: Req, res: Res, next: Next) {
    try {
      const docId: string = req.params.docId
      const result = await this.userUseCase.getUsersUseCase(docId, next)
      res.status(200).json(result)
    } catch (error) {
      return next(new ErrorHandler(400, error as Error))
    }
  }

  //-------------------------------------------------------------cancel booking
  async cancelBooking(req: Req, res: Res, next: Next) {
    try {
      const id: string = req.params.id
      const amount: number = Number(req.params.amount)
      const result = await this.userUseCase.cancelRefundBookingUseCase(id, amount, next)

      //if refund is available cancel the slot
      if (result?.status === 'succeeded') {
        const slotResult = await this.userUseCase.cancelBookingUseCase(id, next)
        res.status(200).json(slotResult)
      }
    } catch (error) {
      return next(new ErrorHandler(400, error as Error))
    }
  }

  //get prescripton
  async prescriptionPdf(req: Req, res: Res, next: Next) {
    try {
      const { doctorName, treatmentName, subTreatmentName, consultationDate, userName, prescriptionId } = req.query
      const doctorNameStr = typeof doctorName === 'string' ? doctorName : '';
      const treatmentNameStr = typeof treatmentName === 'string' ? treatmentName : '';
      const subTreatmentNameStr = typeof subTreatmentName === 'string' ? subTreatmentName : '';
      const consultationDateStr = typeof consultationDate === 'string' ? consultationDate : '';
      const userNameStr = typeof userName === 'string' ? userName : '';
      const prescriptionIdStr = typeof prescriptionId === 'string' ? prescriptionId : '';



      const result = await this.prescriptionUseCase.getPrescriptionUseCase(
       
        prescriptionIdStr
      );
      if (!result) {
        return res.status(404).json({ message: 'Prescription not found' });
      }

      const pdfData = await generatePrescriptionPdf(
        result,
        doctorNameStr,
        treatmentNameStr,
        subTreatmentNameStr,
        consultationDateStr,
        userNameStr
      );
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename=prescription_${result._id}.pdf`);
      res.status(200).send(pdfData);

    } catch (error) {
      return next(new ErrorHandler(400, error as Error))
    }
  }


}
