import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { useEffect } from "react";

export const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { clearCart } = useCartStore();

    useEffect(() => {
        clearCart();

        setTimeout(() => {
            navigate("/");
        }, 5000);
    }, [clearCart, navigate]);

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
                <div className='bg-white shadow-lg rounded-lg p-6 space-y-6'>
                    <div className='flex flex-col items-center'>
                        <CheckCircleIcon className='w-16 h-16 text-green-500' />
                        <h2 className='mt-4 text-3xl font-extrabold text-gray-900'>
                            Payment Successful!
                        </h2>
                        <p className='mt-2 text-sm text-gray-600'>
                            Thank you for your purchase. Your order has been
                            processed successfully.
                        </p>
                    </div>
                    <div className='mt-6'>
                        <Link
                            to={"/"}
                            className='w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
