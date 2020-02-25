const { buildSchema } = require("graphql");

const schema = () =>
  buildSchema(`

    type Event{
        _id:ID!
        title:String!
        description:String!
        price:Float!
        date:String!
    }

    type User{
        _id:ID!
        email:String!
        password:String
    }

    input EventInput{
        title:String!
        description:String!
        price:Float!
        date:String!
    }

    input UserInput{
        email:String!
        password:String!
    }

    type RootQuery {
        events:[Event!]!
        users:[User!]!
    }

    type RootMutation {
        createEvent(eventInput:EventInput):Event
        createUser(userInput:UserInput):User
    }

    schema {
        query:RootQuery
        mutation:RootMutation
}
`);
module.exports = schema;
