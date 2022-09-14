const mongoose = require("mongoose");
const validate = require("validator");
const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
    trim: true,
    unique: true,
    maxlength: [30, "Name can not be more than 30 character"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "please add a description"],
    maxlength: [500, "Description can not be more than 500 character"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "please use a valid URL with HTTP or HTTPS",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "phone number can not be more than 20 character"],
  },

  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "please add a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "please add a address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number,
    country: String,
  },
  career: {
    //Array of strings
    type: String,
    required: true,
    enum: [
      "Web Development",
      "Mobile development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
