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
  }
});

export default model('profiles', profileSchema);