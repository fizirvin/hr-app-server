import {Schema, model } from 'mongoose';

const plasticSchema = new Schema({
  model:{
    type: String,
    required: true
  }
});

export default model('plastics', plasticSchema);