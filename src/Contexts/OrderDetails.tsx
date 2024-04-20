import { FC, ReactNode, createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

interface OptionCountType {
  scoops: {
    [flavor: string]: number;
  };
  toppings: {
    [topping: string]: boolean;
  };
}

type updateItemsCountType = (
  optionName: string,
  itemName: string,
  newCount: number | boolean
) => void;

interface OrderDetailsType {
  optionsCount: OptionCountType;
  updateItemsCount: updateItemsCountType;
  resetOrder: () => void;
  totals: {
    scoops: number;
    toppings: number;
  };
  orderPhase: "inprogress" | "review" | "completed";
  setOrderPhase: React.Dispatch<
    React.SetStateAction<"inprogress" | "review" | "completed">
  >;
}

const OrderDetails = createContext<OrderDetailsType | null>(null);

interface OrderDetailsProvider {
  children: ReactNode;
}

export const useOrderDetails = () => {
  return useContext(OrderDetails) as OrderDetailsType;
};

export const OrderDetailsProvider: FC<OrderDetailsProvider> = ({
  children,
}) => {
  const [optionsCount, setOptionsCount] = useState<OptionCountType>({
    scoops: {},
    toppings: {},
  });

  const [orderPhase, setOrderPhase] = useState<
    "inprogress" | "review" | "completed"
  >("inprogress");

  const updateItemsCount: updateItemsCountType = (
    optionName,
    itemName,
    newCount
  ) => {
    setOptionsCount((prevData: OptionCountType) => ({
      ...prevData,
      [optionName]: {
        ...prevData[optionName],
        [itemName]: newCount,
      },
    }));
  };

  const resetOrder = () => {
    setOptionsCount({ scoops: {}, toppings: {} });
  };

  const calculateTotal = (optionName: string) => {
    const arr: number[] = Object.values(optionsCount[optionName]);
    const total = arr.reduce((acc: number, curr: number) => acc + curr, 0);
    return total * pricePerItem[optionName];
  };

  const totals = {
    scoops: calculateTotal("scoops") || 0,
    toppings: calculateTotal("toppings") || 0,
  };

  return (
    <OrderDetails.Provider
      value={{
        optionsCount,
        updateItemsCount,
        resetOrder,
        totals,
        orderPhase,
        setOrderPhase,
      }}
    >
      {children}
    </OrderDetails.Provider>
  );
};
