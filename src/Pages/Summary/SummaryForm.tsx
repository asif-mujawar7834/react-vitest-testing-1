import { FC, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
interface SummaryFormPropsTypes {
  setOrderPhase: React.Dispatch<
    React.SetStateAction<"inprogress" | "review" | "completed">
  >;
}
export const SummaryForm: FC<SummaryFormPropsTypes> = ({ setOrderPhase }) => {
  const [tcChecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span className="text-2xl">
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form
      className="sm:w-3/4  mx-auto py-5"
      onSubmit={(e) => {
        e.preventDefault();
        setOrderPhase("completed");
      }}
    >
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        className="px-5 py-3 bg-blue-500 text-white rounded-md mt-2"
        type="submit"
        disabled={!tcChecked}
        // onClick={() => setOrderPhase("completed")}
      >
        Confirm order
      </Button>
    </Form>
  );
};
