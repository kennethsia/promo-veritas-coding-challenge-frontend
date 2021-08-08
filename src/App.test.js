import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import formSchema from "./formSchema.json";
import App from "./App";

test("form button is DISABLED with VALID values", () => {
  let container = document.createElement("div");
  document.body.appendChild(container);
  render(<App />, container);
  const validForm = {
    name: 123,
    email: "test@test.com",
    dob: "123123123",
    terms_and_conditions: true,
  };

  const screenName = screen.getByRole("textbox", {
    name: /email/i,
  });
  const screenEmail = screen.getByRole("textbox", {
    name: /email/i,
  });
  const screenDate = screen.getByLabelText(/date of birth/i);
  const screenTerms = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  userEvent.type(screenName, validForm.name);
  userEvent.type(screenEmail, validForm.email);
  userEvent.type(screenDate, validForm.dob);
  userEvent.click(screenTerms, validForm.terms_and_conditions);
  userEvent.click(screenTerms, validForm.terms_and_conditions);

  expect(document.querySelector("button")).toHaveClass("Mui-disabled");
});

test("form button is ENABLED with VALID values", () => {
  let container = document.createElement("div");
  document.body.appendChild(container);
  render(<App />, container);
  const validForm = {
    name: 123,
    email: "test@gmail.com",
    dob: "1989-10-06",
    terms_and_conditions: true,
  };

  const screenName = screen.getByRole("textbox", {
    name: /email/i,
  });
  const screenEmail = screen.getByRole("textbox", {
    name: /email/i,
  });
  const screenDate = screen.getByLabelText(/date of birth/i);
  const screenTerms = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  userEvent.type(screenName, validForm.name);
  userEvent.type(screenEmail, validForm.email);
  userEvent.type(screenDate, validForm.dob);
  userEvent.click(screenTerms, validForm.terms_and_conditions);

  expect(
    document.querySelector("button").classList.contains("Mui-disabled")
  ).toBe(false);
});
