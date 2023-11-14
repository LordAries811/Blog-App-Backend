const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/user_routes");
const blogRouter = require("./routes/blog_routes");

const app = express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);

mongoose.connect("mongodb+srv://adityaBlogApp:Viratkohli12345!@cluster0.hilrl8m.mongodb.net/adityaBlogApp?retryWrites=true&w=majority")
.then(() =>{
    app.listen(5000);
})
.then(() => {
    console.log("Connected to 5000 and db");
})
.catch((e) => {
    console.log(e);
});