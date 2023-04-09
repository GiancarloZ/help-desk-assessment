import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Box, Divider } from "@mui/material";
import { EditTicketModal } from "../components/Modals";

interface Ticket {
  id: string;
  name: string;
  description: string;
  status: string;
}

export default function Staff() {
  const [data, setData] = useState<Ticket[] | undefined>();
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Ticket | undefined>();

  const fetchData = async () => {
    await fetch("http://104.248.39.223:8080/tickets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((tickets: Ticket[]) => setData(tickets));
  };

  useEffect(() => {
    !data && fetchData();
  }, [data]);

  const handleClose = () => setOpen(false);
  const handleEditItem = (item: Ticket) => {
    setSelectedData(item);
    setOpen((o) => !o);
  };
  return (
    <Box maxWidth="1440px" margin="auto">
      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          gap: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
          alignItems: "center",
          padding: "72px 0 0 0",
          bgcolor: "background.paper",
        }}
      >
        {data !== undefined && data?.length > 0 ? (
          data.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  gap: "18px",
                  padding: 0,
                }}
                onClick={() => handleEditItem(item)}
              >
                <Divider orientation="vertical" flexItem />
                <ListItemText
                  primary="Name"
                  secondary={`${item.name}`}
                  sx={{ flexBasis: "15%", textAlign: "center" }}
                />
                <ListItemText
                  primary="Description"
                  secondary={`${item.description.slice(0, 80)}...`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    flexBasis: "60%",
                  }}
                />
                <ListItemText
                  primary="Status"
                  secondary={`${item.status}`}
                  sx={{
                    flexBasis: "15%",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                />
                <Divider orientation="vertical" flexItem />
              </ListItem>
              <Divider flexItem />
            </React.Fragment>
          ))
        ) : (
          <h3>There are no tickets...</h3>
        )}
      </List>
      {selectedData && (
        <EditTicketModal
          open={open}
          closeModal={handleClose}
          data={selectedData}
          refetch={fetchData}
        />
      )}
    </Box>
  );
}
