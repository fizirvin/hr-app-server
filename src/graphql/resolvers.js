import profiles from './models/profiles.js';

export const resolvers = {
  Query: {
    async profiles(){
      return await profiles.find();
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