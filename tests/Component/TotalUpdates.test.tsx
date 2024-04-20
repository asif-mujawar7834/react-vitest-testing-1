import { render, screen } from "../../src/test-utils/testing-library-utils";
import { Options } from "../../src/Pages/entry/Options";
import userEvent from "@testing-library/user-event";
import { OrderEntry } from "../../src/Pages/entry/OrderEntry";

describe("TotalUpdates", () => {
  it("update scoop subtotal when scoop input changes", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);
    const scoopsSubTotal = screen.getByText("scoops Subtotal: $", {
      exact: false,
    });
    expect(scoopsSubTotal).toHaveTextContent("0.00");
    const vanillaInput = await screen.findByRole("textbox", {
      name: /Vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopsSubTotal).toHaveTextContent("2.00");

    const chocolateInput = await screen.findByRole("textbox", {
      name: /Chocolate/i,
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(scoopsSubTotal).toHaveTextContent("6.00");
  });

  it("update toppings subtotal when toppings checkbox changes", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);
    const toppingsTotal = screen.getByText("toppings Subtotal: $", {
      exact: false,
    });
    expect(toppingsTotal).toHaveTextContent("0.00");

    const toppingsHotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot Fudge",
    });
    await user.click(toppingsHotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent("1.50");

    await user.click(toppingsHotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent("0.00");

    const toppingsMochiCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(toppingsMochiCheckbox);
    expect(toppingsTotal).toHaveTextContent("1.50");
  });
});

describe("Grand Total", () => {
  it("grand total starts at $0.00", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand Total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  it("grand total updates properly if scoops is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand Total: $", { exact: false });
    const vanillaInput = await screen.findByRole("textbox", {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const chocolateInput = await screen.findByRole("textbox", {
      name: /chocolate/i,
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "5");
    expect(grandTotal).toHaveTextContent("14.00");
  });

  it("grand total updates properly if toppings is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const grandTotal = screen.getByText("Grand Total: $", { exact: false });
    const hotFudgeTopping = await screen.findByRole("checkbox", {
      name: /hot fudge/i,
    });
    await user.click(hotFudgeTopping);
    expect(grandTotal).toHaveTextContent("1.50");

    const cherriesTopping = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    await user.click(cherriesTopping);
    expect(grandTotal).toHaveTextContent("3.00");
  });

  it("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand Total: $", { exact: false });
    const hotFudgeTopping = await screen.findByRole("checkbox", {
      name: /hot fudge/i,
    });
    await user.click(hotFudgeTopping);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("textbox", {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(hotFudgeTopping);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
