import profiles from './models/profiles.js';
import shortDate from '../functions/shortDate.js'
import zonedD from '../functions/zonedD'


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
      
      const date = new Date();
      const zonedDate = zonedD(date);

      const { team } = input;
      const  initial = team === 'amealco'? 'B' : 'A';

      const workers= await profiles.find({ number:  {$regex: '^' + initial, $options: 'i'}});

      var prefix = ''
      if(workers.length >= 0 && workers.length < 9){
        prefix = '00'
      } else if(workers.length >= 9 && workers.length < 99){
        prefix = '0'
      }

      const num = (workers.length + 1 ).toString();
      const number = initial + prefix + num;
      
      const newWorker = new profiles({
        ...input,
        number: number,
        active: true,
        createdAt: zonedDate
      });
      const profile = await newWorker.save();

      const { entry, createdAt } = profile._doc
      
      const short = shortDate(entry)

      return { ...profile._doc, entry: short};
    },
    async updateProfile(_,{ _id, input }){
      return await profiles.findByIdAndUpdate(_id,input, {new: true });
    }
  }
}