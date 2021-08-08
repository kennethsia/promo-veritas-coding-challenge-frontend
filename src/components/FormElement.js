import { React } from "react";
// used Material UI to abstract each form field type implementation
// decided to use a ui-library due to time constraint
import {
  TextField,
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

// element and handleSubmit are passed as props from the Parent
function FormElement({
  element: {
    type,
    input,
    property,
    label,
    text,
    error = false,
    errorText = "",
    value = "",
  },
  handleChange,
}) {
  // Mapping of field types to specific components,
  // can add more types if needed,
  // for now i just added those that are in the sample file
  if (type === "header") {
    return <h1>{text.en}</h1>;
  } else if (type === "paragraph") {
    return <p>{text.en}</p>;
  } else if (type === "field") {
    switch (input) {
      case "text":
        return (
          <TextField
            error={error}
            helperText={errorText}
            id={property}
            label={label.en}
            fullWidth
            onChange={handleChange}
          />
        );
      case "email":
        return (
          <TextField
            error={error}
            helperText={errorText}
            id={property}
            label={label.en}
            fullWidth
            onChange={handleChange}
          />
        );
      case "datepicker":
        return (
          <TextField
            error={error}
            helperText={errorText}
            id={property}
            label={label.en}
            type="date"
            defaultValue="2017-05-24"
            className="datepicker"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={handleChange}
          />
        );
      case "checkbox":
        return (
          <FormControl
            required
            error={error}
            component="fieldset"
            sx={{ m: 3 }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name={property}
                    id={property}
                  />
                }
                label={label.en}
              />
            </FormGroup>
            <FormHelperText id={property}>{errorText}</FormHelperText>
          </FormControl>
        );
      default:
        return null;
    }
  } else {
    return null;
  }
}

export default FormElement;
