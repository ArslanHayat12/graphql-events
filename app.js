const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema");
const eventResolver = require("./resolvers/event");
const userResolver = require("./resolvers/user");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: schema(),
    rootValue: {
      events: eventResolver.events,
      users: userResolver.users,
      createEvent: eventResolver.createEvent,
      createUser: userResolver.createUser
    },
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00-nlgpj.mongodb.net:27017,cluster0-shard-00-01-nlgpj.mongodb.net:27017,cluster0-shard-00-02-nlgpj.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected");
  })
  .catch(err => console.log(err));

app.listen(3001);
