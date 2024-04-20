import { SummaryForm } from "../../src/Pages/Summary/SummaryForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe("SummaryForm", () => {
  it("Check initial render", () => {
    render(<SummaryForm />);
    const buttonElement = screen.getByRole("button", { name: "Confirm order" });
    const checkboxElement = screen.getByRole("checkbox");
    expect(buttonElement).toBeDisabled();
    expect(checkboxElement).not.toBeChecked();
  });

  it("Checkbox & button behaviour", async () => {
    render(<SummaryForm />);
    const buttonElement = screen.getByRole("button", { name: "Confirm order" });
    const checkboxElement = screen.getByRole("checkbox");
    const user = userEvent.setup();
    await user.click(checkboxElement);
    expect(buttonElement).toBeEnabled();
    expect(checkboxElement).toBeChecked();

    await user.click(checkboxElement);
    expect(buttonElement).toBeDisabled();
    expect(checkboxElement).not.toBeChecked();
  });

  it("popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears on mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    await user.unhover(termsAndConditions);
    expect(popover).not.toBeVisible();
  });
});
