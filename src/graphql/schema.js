import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";

const typeDefs = `

scalar Date

type Query {
    profiles: [Profile]
}

type Profile {
    _id: ID!
    number: String!
    firstname: String!
    lastname: String!
    entry: Date!
    department: String!
    area: String!
    position: String!
    picture_URL: String
}



type Mutation { 
    newProfile(_id: ID, input: NewProfile ): Profile
    updateProfile(_id: ID, input: NewProfile ): Profile

}

input NewProfile {
    number: String!
    firstname: String!
    lastname: String!
    entry: Date!
    department: String!
    area: String!
    position: String!
    picture_URL: String
}


`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});