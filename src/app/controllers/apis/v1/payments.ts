import { Response } from 'express';
import { stripe } from '../../../../config';
import { Request } from '../../../../utils/@types'
import generateUid from '../../../../utils/crypto';




export const paymentController = {
    createPaymentIntent: async (req: Request, res: Response) => {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: 'usd',
                automatic_payment_methods: { enabled: true },
            });

            return res.json({
                success: true,
                paymentIntent
            })

        } catch (error) {
            console.log(error)
            return res.status(200).json({ success: false, message: 'Internal server error' });
        }
    },
}