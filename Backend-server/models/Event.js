const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true },
    maxParticipants: { type: Number, required: true },
    costPerParticipant: { type: Number, required: true },
  });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
