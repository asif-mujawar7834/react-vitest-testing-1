import { FC, useEffect, useState } from "react";
import { useOrderDetails } from "../../Contexts/OrderDetails";

interface OrderConfirmationPropsTypes {
  setOrderPhase: React.Dispatch<
    React.SetStateAction<"inprogress" | "review" | "completed">
  >;
}
export const OrderConfirmation: FC<OrderConfirmationPropsTypes> = ({
  setOrderPhase,
}) => {
  const [orderNumber, setOrderNumber] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);
  const { resetOrder } = useOrderDetails();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const postOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3030/order", {
          method: "post",
          signal,
        });
        const data = await response.json();
        setOrderNumber(data.orderNumber);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    postOrder();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <p className="text-2xl text-center text-green-600 font-bold">Loading</p>
      </div>
    );
  }

  return (
    <div className="sm:w-3/4  mx-auto pt-2">
      <h1>Thank You</h1>
      <p className="text-2xl">Your Order Number is {orderNumber}</p>
      <p className="text-xl">
        as per our terms and conditions, nothing will happen now
      </p>
      <button
        onClick={() => {
          resetOrder();
          setOrderNumber(null);
          setOrderPhase("inprogress");
        }}
        className="px-5 py-3 bg-blue-500 text-white rounded-md mt-2"
      >
        Order Again
      </button>
    </div>
  );
};
