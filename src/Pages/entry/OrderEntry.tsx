import { FC } from "react";
import { useOrderDetails } from "../../Contexts/OrderDetails";
import { formatCurrency } from "../../Utils";
import { Options } from "../entry/Options";
interface orderEntryPropTypes {
  setOrderPhase: React.Dispatch<
    React.SetStateAction<"inprogress" | "review" | "completed">
  >;
}
export const OrderEntry: FC<orderEntryPropTypes> = ({ setOrderPhase }) => {
  const { optionsCount, totals } = useOrderDetails();
  // console.log(optionsCount.scoops);

  const isEnabled = Object.keys(optionsCount.scoops).some(
    (key) => optionsCount.scoops[key] > 0
  );

  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <div className="sm:w-3/4  mx-auto">
        <h2>Grand Total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      </div>

      <div className="sm:w-3/4 mx-auto">
        <button
          className={`px-5 py-3 mb-3 text-white rounded-md mt-2 ${
            isEnabled ? "bg-blue-500" : "bg-slate-400"
          }`}
          type="submit"
          onClick={() => setOrderPhase("review")}
          disabled={!isEnabled}
        >
          Order Sundae
        </button>
      </div>
    </>
  );
};
