import {Schema, model } from 'mongoose';

const labelSchema = new Schema({
  model:{
    type: String,
    required: true
  },
  serial:{
    type: String,
    required: true
  },
  partNumber:{
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  }
});

export default model('labels', labelSchema);