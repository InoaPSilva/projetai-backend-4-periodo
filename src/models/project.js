const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  summary: {
    type: String,
  },
  objective: {
    type: String,
  },
  
  videoUrl: {
    type: String,
  },

  period: {
    type: String,
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
