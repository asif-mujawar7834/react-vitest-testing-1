import { render, screen } from "../../src/test-utils/testing-library-utils";
import { Options } from "../../src/Pages/entry/Options";

describe("Scoop Option", () => {
  it("Displays Image for each scoop", async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img");
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((element) => {
      const imageElement = element as HTMLImageElement;
      return imageElement.alt;
    });
    expect(altText).toEqual(["Chocolate Scoop", "Vanilla Scoop"]);
  });

  it("Display images for each toppings", async () => {
    render(<Options optionType="toppings" />);
    const allToppingsImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    expect(allToppingsImages).toHaveLength(3);

    const imagesAlt = allToppingsImages.map((item) => {
      const element = item as HTMLImageElement;
      return element.alt;
    });

    expect(imagesAlt).toEqual([
      "Cherries Topping",
      "M&S Topping",
      "Hot Fudge Topping",
    ]);
  });

  it("Display error if scoops api fails", () => {
    render(<Options optionType="scoops" />);
  });
});
