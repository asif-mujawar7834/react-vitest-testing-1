import { ChangeEvent, FC } from "react";
import { useOrderDetails } from "../../Contexts/OrderDetails";

interface ToppingsOptionProps {
  name: string;
  imagePath: string;
  alt: string;
}
export const ToppingsOption: FC<ToppingsOptionProps> = ({
  name,
  alt,
  imagePath,
}) => {
  const { updateItemsCount, optionsCount } = useOrderDetails();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateItemsCount("toppings", name, e.target.checked);
  };

  return (
    <div className="border-2 p-2 border-black rounded-md shadow-md">
      <img
        className="mx-auto w-3/4"
        src={`http://localhost:3030/${imagePath}`}
        alt={alt}
      />
      <div className="flex gap-4 items-center">
        <input
          className="h-[40px] w-[40px]"
          type="checkbox"
          aria-label={name}
          onChange={handleChange}
          checked={
            optionsCount.toppings[name] ? optionsCount.toppings[name] : false
          }
        />
        <h3 className="mt-3 text-lg">{name}</h3>
      </div>
    </div>
  );
};
