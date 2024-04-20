import { useState } from "react";
import "./App.css";
import { OrderDetailsProvider } from "./Contexts/OrderDetails";
import { OrderConfirmation } from "./Pages/OrderConfirmation/OrderConfirmation";
import { OrderSummary } from "./Pages/Summary/OrderSummary";
import { OrderEntry } from "./Pages/entry/OrderEntry";

function App() {
  const [orderPhase, setOrderPhase] = useState<
    "inprogress" | "review" | "completed"
  >("inprogress");
  const components = {
    inprogress: <OrderEntry setOrderPhase={setOrderPhase} />,
    review: <OrderSummary setOrderPhase={setOrderPhase} />,
    completed: <OrderConfirmation setOrderPhase={setOrderPhase} />,
  };
  return <OrderDetailsProvider>{components[orderPhase]}</OrderDetailsProvider>;
}

export default App;
