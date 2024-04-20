import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../Contexts/OrderDetails";
import { ReactElement } from "react";

const renderWithContext = (ui: ReactElement, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
