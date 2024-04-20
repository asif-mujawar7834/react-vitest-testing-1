import { render, screen } from "@testing-library/react";
import App from "../../src/App";
import userEvent from "@testing-library/user-event";
import { OrderEntry } from "../../src/Pages/entry/OrderEntry";
import { OrderDetailsProvider } from "../../src/Contexts/OrderDetails";

describe("Order Phase", () => {
  it("Test complete order phase", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    const vanillaScoopInput = await screen.findByRole("textbox", {
      name: /vanilla/i,
    });
    await user.clear(vanillaScoopInput);
    await user.type(vanillaScoopInput, "2");

    const chocolateScoopInput = await screen.findByRole("textbox", {
      name: /chocolate/i,
    });
    await user.clear(chocolateScoopInput);
    await user.type(chocolateScoopInput, "5");

    const cherriesToppings = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    await user.click(cherriesToppings);

    const OrderSundaeButton = screen.getByRole("button", {
      name: /order sundae/i,
    });
    await user.click(OrderSundaeButton);

    //Testing Order Summary Page

    const OrderSummaryHeading = screen.getByRole("heading", {
      name: "Order Summary",
    });

    expect(OrderSummaryHeading).toBeInTheDocument();

    const scoopsTotal = screen.getByText("Scoops $14.00");
    expect(scoopsTotal).toBeInTheDocument();

    const toppingsTotal = screen.getByText("Toppings $1.50");
    expect(toppingsTotal).toBeInTheDocument();

    const scoop1 = screen.getByText("2 Vanilla");
    const scoop2 = screen.getByText("5 Chocolate");
    const topping1 = screen.getByText("Cherries");
    expect(scoop1).toBeInTheDocument();
    expect(scoop2).toBeInTheDocument();
    expect(topping1).toBeInTheDocument();

    const termsAndConditionCheckbox = screen.getByRole("checkbox");
    await user.click(termsAndConditionCheckbox);

    const ConfirmOrderButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    await user.click(ConfirmOrderButton);

    //order confirmed

    const loading = screen.getByText("Loading");
    expect(loading).toBeInTheDocument();

    const thankYouHeading = await screen.findByRole("heading", {
      name: /thank you/i,
    });
    expect(thankYouHeading).toBeInTheDocument();
    const orderNumberText = await screen.findByText(
      "Your Order Number is 6632776565"
    );
    expect(orderNumberText).toBeInTheDocument();
    const orderAgainButton = await screen.findByRole("button", {
      name: /order again/i,
    });
    await user.click(orderAgainButton);

    const scoopsSubTotal = await screen.findByText("scoops Subtotal: $0.00");
    const toppingsSubTotal = await screen.findByText(
      "toppings Subtotal: $0.00"
    );
    expect(scoopsSubTotal).toBeInTheDocument();
    expect(toppingsSubTotal).toBeInTheDocument();
    unmount();
  });

  it("toppings heading should not be there is toppings is not selected", async () => {
    const user = userEvent.setup();
    render(<App />);
    const chocolateInput = await screen.findByRole("textbox", {
      name: /chocolate/i,
    });
    const vanillaInput = await screen.findByRole("textbox", {
      name: /vanilla/i,
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "4");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    const orderSundaeButton = screen.getByRole("button", {
      name: /order sundae/i,
    });

    await user.click(orderSundaeButton);

    const scoopsTotal = screen.getByText("Scoops $12.00");
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.queryByText(/Toppings/);
    expect(toppingsTotal).not.toBeInTheDocument();
  });

  it("Toppings heading should not be there if toppings is selected first, and then removed", async () => {
    const user = userEvent.setup();
    render(<App />);
    const scoopsSubTotal = screen.getByText("scoops Subtotal: $", {
      exact: false,
    });
    const toppingsSubTotal = screen.getByText("toppings Subtotal: $", {
      exact: false,
    });
    const chocolateInput = await screen.findByRole("textbox", {
      name: /chocolate/i,
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "5");

    const vanillaInput = await screen.findByRole("textbox", {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "7");
    expect(scoopsSubTotal).toHaveTextContent("24.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    await user.click(cherriesCheckbox);
    expect(toppingsSubTotal).toHaveTextContent("1.50");

    await user.click(cherriesCheckbox);
    expect(toppingsSubTotal).toHaveTextContent("0.00");

    const orderSundaeButton = screen.getByRole("button", {
      name: /order sundae/i,
    });
    await user.click(orderSundaeButton);

    const scoopsHeading = screen.getByText("Scoops $24.00");
    expect(scoopsHeading).toBeInTheDocument();
    const toppingsHeading = screen.queryByText(/toppings/i);
    expect(toppingsHeading).not.toBeInTheDocument();
  });

  it("enable order sundae button only if atleast one scoop is selected", async () => {
    const user = userEvent.setup();
    const setOrderPhase = vi.fn();
    render(<OrderEntry setOrderPhase={setOrderPhase} />, {
      wrapper: OrderDetailsProvider,
    });

    const chocolateScoop = await screen.findByRole("textbox", {
      name: /chocolate/i,
    });

    const orderSundaeButton = screen.getByRole("button", {
      name: /order sundae/i,
    });
    expect(orderSundaeButton).toBeDisabled();

    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, "5");
    expect(orderSundaeButton).toBeEnabled();

    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, "0");
    expect(orderSundaeButton).toBeDisabled();
  });
});
