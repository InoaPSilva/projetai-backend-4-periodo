const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,

  },

  summary: {
    type: String,
    required: true,

  },
  objective: {
    type: String,
    required: true,

  },
  
  videoUrl: {
    type: String,
    required: true,

  },

  period: {
    type: String,
    required: true,

  },
  
  // category: String,

  user: [],

  icon: [],

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const project = mongoose.model("project", projectSchema);

module.exports = project;
