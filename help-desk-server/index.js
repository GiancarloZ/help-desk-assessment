const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;
app.disable("x-powered-by");
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.static("./public"));
app.use(express.json());

require("./routes/TicketRoutes")(app);

app.listen(PORT, () =>
  console.log(`Server running on port http://157.230.94.40:${PORT}`)
);
