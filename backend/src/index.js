const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require("./routes");


const app = express();

mongoose.connect('mongodb+srv://demetriusleonardo:sara123@cluster0.7ukwz.mongodb.net/<dbname>?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json());
app.use(routes);

app.post('/',(request,response)=>{
  console.log(request.body);
  return response.json({message: "Hello kkk"});
})

app.listen(3333);