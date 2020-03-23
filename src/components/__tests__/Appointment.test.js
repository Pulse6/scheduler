import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Appointment from "components/Appointment/Appointment";


afterEach(cleanup);

describe("Form", () => {
 it("renders without crashing", () => {
  render(<Appointment />);
});

});
