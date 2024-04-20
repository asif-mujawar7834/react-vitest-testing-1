import { useEffect, useState } from "react";
import { ScoopOption } from "./ScoopOption";
import { ToppingsOption } from "./ToppingsOption";
import { AlertBox } from "../../Components/AlertBox";
import { useOrderDetails } from "../../Contexts/OrderDetails";
import { formatCurrency } from "../../Utils";
import { pricePerItem } from "../../constants";

type OptionProps = {
  optionType: "scoops" | "toppings";
};

export const Options: React.FC<OptionProps> = ({ optionType }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const { totals } = useOrderDetails();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchDetails = async () => {
      setError(null);
      try {
        const response = await fetch(`http://localhost:3030/${optionType}`, {
          signal,
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError("unexpected error occured. Please try again later.");
        }
      }
    };
    fetchDetails();
    return () => {
      abortController.abort();
    };
  }, [optionType]);

  if (error) {
    return (
      <AlertBox
        message="unexpected error occured. Please try again later."
        variant="danger"
      />
    );
  }

  const optionItems = data.map((item: { name: string; imagePath: string }) => {
    return optionType === "scoops" ? (
      <ScoopOption
        key={item?.name}
        alt={`${item?.name} Scoop`}
        name={item?.name}
        imagePath={item?.imagePath}
      />
    ) : (
      <ToppingsOption
        key={item?.name}
        alt={`${item?.name} Topping`}
        name={item?.name}
        imagePath={item?.imagePath}
      />
    );
  });

  return (
    <div className="sm:w-3/4  mx-auto py-5">
      <h1 className="mb-2">{optionType}</h1>
      <p className="text-xl">{formatCurrency(pricePerItem[optionType])} each</p>
      <p className="text-2xl">
        {optionType} Subtotal: {formatCurrency(totals[optionType])}
      </p>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {optionItems}
      </div>
    </div>
  );
};
