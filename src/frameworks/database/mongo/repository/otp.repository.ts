import otpModel from "../models/otpModel";
import { IOtp } from "../../../../entity/otp";
import { IOtpRepository } from "../../../../useCase/interface/repositoryIntrfce/otpRepository";
import { error } from 'console'
export class OtpRepository implements IOtpRepository {

  // create otp collection 
  async createOtpUserCollection(newUser: IOtp): Promise<IOtp> {
    try {
      const result = await otpModel.create(newUser)
      return result
    } catch (error) {
      throw (error as Error)
    }
  }

  //check whether the otp is present in the otp collection
  async findUser(email: string): Promise<IOtp | null> {
    try {
      const result = await otpModel.findOne({ email })
      return result
    } catch (error) {
      throw (error as Error)
    }
  }



  //delete the verification code
  async findAndDeleteUser(
    email: string,
    verificationCode: string
  ): Promise<boolean> {
    try {
      const result = await otpModel.findOneAndDelete({
        email,
        otp: verificationCode,
      });
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw (error as Error)
    }
  }
}
