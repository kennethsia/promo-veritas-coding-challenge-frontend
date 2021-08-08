import { Container, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import formJSON from "./formElement.json";
import formSchema from "./formSchema.json";
import FormElement from "./components/FormElement";

function App() {
  // form states
  const [elements, setElements] = useState([]);
  const [schema, setSchema] = useState({});
  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    // Access-Control-Allow-Origin "*" was not set on the provided resource
    // https://7ys8lfh4mc.execute-api.eu-west-1.amazonaws.com/beta/coding-challenge/configuration
    // thus the loading from file
    setElements(formJSON.data.sort((a, b) => (a.order < b.order ? -1 : 1)));
    setSchema(formSchema);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submit");
  };

  // handleChange function, this is passed onto the child elements as onChange Handler
  const handleChange = (event) => {
    const newElements = elements.map((field, index) => {
      return validateField(field, event); // see function below
    });
    setElements(newElements);
    setValidForm(validateForm(newElements));
  };

  // Validates if the form is eligible to be submitted based on errors in the
  // elements state object
  const validateForm = (updatedElements) => {
    let validForm = true;
    updatedElements.forEach((field, index) => {
      if (field.error === true) validForm = false;
    });
    return validForm;
  };

  // validates if a certain field based on the from schema provided (formSchema)
  const validateField = (field, event) => {
    let fieldId = event.target.id;
    let fieldValue = event.target.value;
    let fieldSchema = schema.properties[field.property];
    if (field.property === fieldId) {
      const regex = new RegExp(fieldSchema.pattern);
      // depending on the form object property in the formJSON, it will load
      // validation patterns from the schema and apply accordingly
      switch (field.property) {
        case "name":
          if (typeof fieldValue === "string") {
            return {
              ...field,
              value: fieldValue,
              error: false,
              errorText: "",
            };
          }
          return {
            ...field,
            value: fieldValue,
            error: true,
            errorText: "Invalid input",
          };
        case "email":
          if (typeof fieldValue === "string" && regex.test(fieldValue)) {
            return {
              ...field,
              value: fieldValue,
              error: false,
              errorText: "",
            };
          }
          return {
            ...field,
            value: fieldValue,
            error: true,
            errorText: "Invalid input",
          };
        case "dob":
          if (typeof fieldValue === "string" && regex.test(fieldValue)) {
            return {
              ...field,
              value: fieldValue,
              error: false,
              errorText: "",
            };
          }
          return {
            ...field,
            value: fieldValue,
            error: true,
            errorText: "Invalid input",
          };
        case "terms_and_conditions":
          const checkboxValue = event.target.checked;
          if (checkboxValue) {
            return {
              ...field,
              value: checkboxValue,
              error: false,
              errorText: "",
            };
          }
          return {
            ...field,
            value: checkboxValue,
            error: true,
            errorText: "Is required",
          };
        default:
          return field;
      }
    } else {
      return field;
    }
  };

  // Created a component called FormElement to load what type of
  // form element to render depedning on the JSON date
  return (
    <Container maxWidth="sm">
      <form className="form">
        {elements
          ? elements.map((element, i) => (
              <FormElement
                key={i}
                element={element}
                handleChange={handleChange}
              />
            ))
          : null}
        <Button
          variant="contained"
          disabled={!validForm}
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </form>
      <h3>Current state of the form element with values for posting</h3>
      <pre>{elements ? JSON.stringify(elements, null, "\t") : ""}</pre>
    </Container>
  );
}

export default App;
