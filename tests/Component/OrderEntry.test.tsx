import { HttpResponse, http } from "msw";
import { server } from "../../src/mocks/Server";
import { render, screen } from "../../src/test-utils/testing-library-utils";
import { OrderEntry } from "../../src/Pages/entry/OrderEntry";
import userEvent from "@testing-library/user-event";

describe("OrderEntry", () => {
  it("handle errors for scoops & toppings route", async () => {
    server.resetHandlers(
      http.get("http://localhost:3030/scoops", () => {
        return new HttpResponse(null, { status: 500 });
      }),
      http.get("http://localhost:3030/toppings", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<OrderEntry setOrderPhase={vi.fn()} />, null);
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });

  it("enable order sundae button only if atleast one scoop is selected", async () => {
    const user = userEvent.setup();
    const setOrderPhase = vi.fn();
    render(<OrderEntry setOrderPhase={setOrderPhase} />, null);

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
