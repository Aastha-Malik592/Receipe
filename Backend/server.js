require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth-routes");
const recipeRoutes = require("./routes/recipe-routes");


const app = express();

connectDB();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);


app.use(express.json());

app.use(express.urlencoded({
  extended:true
}));




app.use(
  "/uploads",
  express.static(
    path.join(__dirname,"uploads")
  )
);




app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/recipes",
  recipeRoutes
);




app.get("/",(req,res)=>{

  res.send(
    "Recipe Management Backend Working"
  );

});





const PORT =
process.env.PORT || 5000;



app.listen(PORT,()=>{

console.log(
`Server Running on Port ${PORT}`
);

});