import React, {
    useContext,
    useEffect,
    useState
} from 'react'
import {
    Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from './PaymentForm'
import { createPaymentIntent } from '../../networks/payments';
import { AuthContext } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const PaymentMethod = () => {
    const stripePromise = loadStripe(`pk_test_51M3zUWBCCU9427w3ILAFRf5hD5yzMt7TLWefz2L8TM5BQuLcgMq8zmr3GDqMbmVNFVnCQBdLQeJvoggoxUF96jIN00Bd8XPpof`);

    const { t } = useContext(AuthContext)
    const [clientSecerete, setClientSecerete] = useState(null)

    useEffect(() => {
        getCLientSecerete()
        return () => {
        };
    }, [t]);


    const getCLientSecerete = async () => {
        var res = await createPaymentIntent(t, { amount: 1099 })
        if (!res.data.success) return toast("Something went wrong!")
        setClientSecerete(res.data.paymentIntent.client_secret)
    }



    return (
        <Elements stripe={stripePromise} options={{ clientSecret: "pi_3MpVzSBCCU9427w30TtfStju_secret_u7yfB1CJvCtlKYN4IIpY0N8B9" }}>
            <Toaster />
            <PaymentForm />
        </Elements>
    );
}

export default PaymentMethod