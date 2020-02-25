const Event = require("../models/event");
const User = require("../models/user");
/*

mutation {
  createEvent(eventInput: {title: "Test", description: "12312", price: 123, date: "2020-02-23T06:16:35.232+00:00"}){
    title
  }
}

*/
module.exports = {
  events: () => {
    return Event.find()
      .then(events => {
        return events.map(event => ({
          ...event._doc,
          _id: event._doc._id.toString()
        }));
      })
      .catch(err => {
        throw err;
      });
  },
  createEvent: args => {
    const { eventInput } = args;
    const { description, title, price, date } = eventInput;
    const event = new Event({
      description,
      price: +price,
      date: new Date(date),
      title,
      creator: "5e529d0e9f5921aac80f9469"
    });
    let createdEvent;
    return event
      .save()
      .then(result => {
        createdEvent = { ...result._doc };
        return User.findById("5e529d0e9f5921aac80f9469");
      })
      .then(user => {
        user.createdEvents.push(event);
        return user.save();
      })
      .then(result => createdEvent)
      .catch(err => {
        throw err;
      });
  }
};
