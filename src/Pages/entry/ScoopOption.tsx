import { ChangeEvent, FC } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useOrderDetails } from "../../Contexts/OrderDetails";

interface ScoopOptionProps {
  name: string;
  alt: string;
  imagePath: string;
}

export const ScoopOption: FC<ScoopOptionProps> = ({ name, imagePath, alt }) => {
  const { optionsCount, updateItemsCount } = useOrderDetails();
  const handleButtonClick = (flag: boolean) => {
    updateItemsCount(
      "scoops",
      name,
      flag
        ? (optionsCount.scoops[name] || 0) + 1
        : optionsCount.scoops[name] - 1
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateItemsCount("scoops", name, Number(e.target.value));
  };

  return (
    <div className="border-2 p-2 border-black rounded-md shadow-md">
      <img
        className="mx-auto w-3/4"
        src={`http://localhost:3030/${imagePath}`}
        alt={alt}
      />
      <div className="grid grid-cols-2 mt-4">
        <div>
          <h3 className="text-center mt-3 text-lg">{name}</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <input
            value={optionsCount.scoops[name] ? optionsCount.scoops[name] : 0}
            className="border border-black row-span-2 rounded-md text-center"
            onChange={handleChange}
            aria-label={name}
          />
          <button
            onClick={() => handleButtonClick(false)}
            className="p-2 bg-blue-500 text-white font-bold text-center rounded-md"
          >
            <FaAngleUp className="mx-auto" />
          </button>
          <button
            onClick={() => handleButtonClick(true)}
            className="p-2 bg-blue-500 text-white font-bold text-center rounded-md"
          >
            <FaAngleDown className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
