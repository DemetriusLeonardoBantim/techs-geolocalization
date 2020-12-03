const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');

const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(
  'mongodb+srv://demetriusleonardo:sara123@cluster0.7ukwz.mongodb.net/<dbname>?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.post('/', (request, response) => {
  console.log(request.body);
  return response.json({ message: 'Hello kkk' });
});

server.listen(3333);
