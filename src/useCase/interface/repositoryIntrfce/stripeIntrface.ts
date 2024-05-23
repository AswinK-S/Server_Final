export interface IStripePayment{
    StripePayment(amount: number, email: string, treatmentName: string,doctorId:string,treatmentId:string,subTreatmentId:string,consultingDate:string): Promise<string | null>
    PaymentSuccess(req: any):Promise<any>
    createRefund(chargeId: string, amount: number):Promise<any>
}
