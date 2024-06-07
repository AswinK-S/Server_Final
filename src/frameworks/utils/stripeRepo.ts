import { IBookingRepository } from "../../useCase/interface/repositoryIntrfce/bookingRepository";
import { IStripePayment } from "../../useCase/interface/repositoryIntrfce/stripeIntrface";
import stripe from "../services/stripe";

export class Stripe implements IStripePayment {

  private readonly bookingRepository: IBookingRepository

  constructor(bookingRepository: IBookingRepository) {
    this.bookingRepository = bookingRepository
  }



  async StripePayment(amount: number, email: string, treatmentName: string, doctorId: string, treatmentId: string, subTreatmentId: string, consultingDate: string): Promise<string | null> {
    try {
     const stripeSucess:string =process.env.Stripe_success as string
     const stripeCancel:string =process.env.Stripe_cancel as string

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: treatmentName,
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://srd-ayurveda.vercel.app/success',
        cancel_url: 'https://srd-ayurveda.vercel.app/cancel',
        billing_address_collection: 'required'
      });

      const date: Date = new Date(consultingDate)
      const sessionId = session.id

      return session.url;

    } catch (error) {
      console.error('Error creating Stripe payment:', error);
      return null;
    }
  };

  //payment success
  async PaymentSuccess(req: any):Promise<any> {
    const payload = req.body;
    console.log('payload wbHk',payload);
    const paymentIntentId = payload?.data?.object?.payment_intent
    const payloadString = JSON.stringify(payload, null, 2);
    const sig = req.headers["stripe-signature"];
    if (typeof sig !== "string") {
      return false;
    }
    const endpointSecret =
      "whsec_38f3a628abf8e8ef524a17fe40221ffd034fcc871fba497b4aa9400222869b07";
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });

    let event;

    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );

    if (paymentIntentId) {
      console.log('pymnt intnt');
      const paymentIntentResponse = await stripe.paymentIntents.retrieve(paymentIntentId);
      const paymentIntent = paymentIntentResponse
      if (paymentIntentResponse.latest_charge) {
        const chargeId = paymentIntentResponse.latest_charge;
        req.app.locals.chargeId = chargeId;
      } else {
        return null;
      }
    }
    if (event.type == "checkout.session.completed") {
      return true;
    } else {
      return false;
    }
  }

  //refund
  async createRefund(chargeId: string, amount: number) {
    try {
        const refund = await stripe.refunds.create({
            charge: chargeId,
            amount: amount,
        });
        return refund;
    } catch (error) {
        console.error(error);
    }
}


}