import { FC } from "react";
import { useOrderDetails } from "../../Contexts/OrderDetails";
import { formatCurrency } from "../../Utils";
import { SummaryForm } from "./SummaryForm";
interface OrderSummaryPropsTypes {
  setOrderPhase: React.Dispatch<
    React.SetStateAction<"inprogress" | "review" | "completed">
  >;
}
export const OrderSummary: FC<OrderSummaryPropsTypes> = ({ setOrderPhase }) => {
  const { totals, optionsCount } = useOrderDetails();
  const scoopsArray = Object.entries(optionsCount.scoops);
  const scoopsList = scoopsArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsList = Object.keys(optionsCount.toppings).filter(
    (item) => optionsCount.toppings[item]
  );

  return (
    <>
      <div className="sm:w-3/4  mx-auto pt-2">
        <h1 className="mb-2">Order Summary</h1>
        <p className="text-2xl">Scoops {formatCurrency(totals.scoops)}</p>
        <ul className="text-xl list-disc">{scoopsList}</ul>
        {toppingsList.length > 0 && (
          <>
            <p className="text-2xl">
              Toppings {formatCurrency(totals.toppings)}
            </p>
            <ul className="text-xl list-disc">
              {toppingsList.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </>
        )}
      </div>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  );
};
