import { useState, useRef, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import ToastNotificationContainer from "../Toast";

interface ITicketData {
  id?: string;
  status?: string;
  message?: string;
  name?: string;
  email?: string;
  description?: string;
}

interface IEditTicketModalProps {
  open: boolean;
  closeModal: () => void;
  data: ITicketData;
  refetch: () => void;
}

export function EditTicketModal({
  open,
  closeModal,
  data,
  refetch,
}: IEditTicketModalProps) {
  const [formData, setFormData] = useState<ITicketData>({
    message: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const toastRef = useRef<any>();

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    gap: "12px",
    p: 4,
  };

  useEffect(() => {
    setFormData({
      status: data?.status,
      message: data?.message,
    });
  }, [data]);

  const handleOnChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name!]: value,
    }));
  };

  const handleOnChangeSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name!]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    await fetch(`http://157.230.94.40:8080/tickets/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toastRef.current.sendMessage({
          message: "Ticket updated successfully!",
          status: "success",
        });
        refetch();
        setLoading(false);
      })
      .catch((e) => {
        toastRef.current.sendMessage({ message: e.message, status: "error" });
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={1}>
            Name: {data?.name}
          </Typography>
          <Typography id="modal-modal-email" variant="h6" component="h2" mb={1}>
            Email: {data?.email}
          </Typography>

          <Typography
            id="modal-modal-description-label"
            variant="h6"
            component="h2"
            mb={1}
          >
            Description:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4 }}>
            {data?.description}
          </Typography>

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Select
              labelId="select-label"
              id="select-status"
              name="status"
              value={formData?.status}
              label="Status"
              onChange={handleOnChangeSelect}
            >
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
            </Select>
            <TextField
              label="Response"
              multiline
              rows={4}
              variant="outlined"
              name="message"
              value={formData?.message}
              focused={!!formData?.message}
              onChange={handleOnChange}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <ToastNotificationContainer ref={toastRef} />
    </>
  );
}
