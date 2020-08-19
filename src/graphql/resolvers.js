import profiles from './models/profiles.js';
import shortDate from '../functions/shortDate.js'
import zonedD from '../functions/zonedD'
import shorDateNum from '../functions/shortDateNum.js'


export const resolvers = {
  Query: {
    async profiles(){

      const profile = await profiles.find();
      const profileFormat = profile.map(item =>{
        const entry = shortDate(item.entry)
        const entryNum = shorDateNum(item.entry)
        return {...item._doc, entry, entryNum }
      })
      return profileFormat
    },
    async profilesLabels(_,{ team }){
      return await profiles.find({ active: true, team }, null, {sort: {team: -1, firstname: 1}});
    },
    async workers(_,{inspectorId, operatorId }){
      const inspector = await profiles.findById(inspectorId)
      const operator = await profiles.findById(operatorId)
      return { inspector, operator }
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
      const entryNum = shorDateNum(entry) 

      return { ...profile._doc, entry: short, entryNum};
    },
    async updateProfile(_,{ _id, input }){
      
      const date = new Date();
      const zonedDate = zonedD(date);
      const object ={
        ...input,
        updatedAt: zonedDate,
      }

      const updateProfile = await profiles.findByIdAndUpdate(_id,object, {new: true });
      console.log(updateProfile, _id)
      const { entry } = updateProfile._doc
      const short = shortDate(entry)
      const entryNum = shorDateNum(entry) 

      return {...updateProfile._doc, entry: short, entryNum }
    }
  }
}