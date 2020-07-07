import {Schema, model } from 'mongoose';

const profileSchema = new Schema({
  number:{
    type: String,
    required: true
  },
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  entry:{
    type: Date,
    required: true
  },
  department:{
    type: String,
    required: true
  },
  area:{
    type: String,
    required: true
  },
  position:{
    type: String,
    required: true
  },
  picture_URL:{
    type: String,
    required: false
  }
});

export default model('profiles', profileSchema);