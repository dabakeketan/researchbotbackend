const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

//Middleware

app.use(express.json()); // Enables to request Body from client
app.use(cors());

// Routes

//register and Login routes:

app.use("/auth", require("./routes/jwtAuth"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
});