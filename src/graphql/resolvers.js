import profiles from './models/profiles.js';
import shortDate from '../functions/shortDate.js'

export const resolvers = {
  Query: {
    async profiles(){

      const profile = await profiles.find();
      const profileFormat = profile.map(item =>{
        const entry = shortDate(item.entry)
        return {...item._doc, entry }
      })
      return profileFormat
    }
  },
  Mutation: {
    async newProfile(_, { input }){
      const item = new profiles(input);
      await item.save();   
      return item;
    },
    async updateProfile(_,{ _id, input }){
      return await profiles.findByIdAndUpdate(_id,input, {new: true });
    }
  }
}