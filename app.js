const express = require("express");
const app = express();
require("./db/conn");
app.use(express.json());
app.use("/subscribers",require("./routes/routes.js"));

app.listen(process.env.PORT,()=>{
    console.log("listening");
})