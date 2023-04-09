import React, { useState, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import ToastNotificationContainer from "./components/Toast";

interface FormState {
  name: string;
  email: string;
  description: string;
}

function App(): JSX.Element {
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toastRef = useRef<any>();

  const validateForm = (formData: FormState): boolean => {
    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.description.trim() === ""
    ) {
      toastRef.current.sendMessage({
        message: "All fields must be filled out!",
        status: "error",
      });
      return false;
    }
    const emailPattern =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailPattern.test(formData.email)) {
      toastRef.current.sendMessage({
        message: "Email type is not correct!",
        status: "error",
      });
      return false;
    }
    return true;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    const valid = validateForm(state);

    if (valid) {
      const res = await fetch("http://157.230.94.40:8080/submit-ticket", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(() => {
          toastRef.current.sendMessage({
            message: "Ticket created successfully!",
            status: "success",
          });
          setLoading(false);
          setSubmitted(true);
        })
        .catch((e: any) => {
          toastRef.current.sendMessage({ message: e.message, status: "error" });
          setLoading(false);
        });
    }
    setLoading(false);
  };

  const onReset = (): void => {
    setLoading(false);
    setSubmitted(false);
    setState({ name: "", email: "", description: "" });
  };

  return (
    <>
      {!submitted ? (
        <Box
          component="form"
          sx={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "300px",
            padding: "72px 12px 12px 12px",

            "*": { width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Name"
            variant="standard"
            name="name"
            onChange={handleOnChange}
            required
          />
          <TextField
            label="Email"
            variant="standard"
            name="email"
            onChange={handleOnChange}
            required
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            variant="standard"
            name="description"
            onChange={handleOnChange}
            required
          />
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            Submit
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "300px",
            padding: "72px 12px 12px 12px",
            textAlign: "center",
            "*": { width: "100%" },
          }}
        >
          <h3>Ticket has been submitted</h3>

          <Button onClick={onReset} variant="contained">
            Create new ticket
          </Button>
        </Box>
      )}
      <ToastNotificationContainer ref={toastRef} />
    </>
  );
}

export default App;
