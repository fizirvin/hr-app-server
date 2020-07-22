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
    gender: String!
    entry: Date!
    department: String!
    area: String!
    team: String!
    position: String!
    active: Boolean!
    createdAt: Date!
    updatedAt: Date
    picture_URL: String
}



type Mutation { 
    newProfile(_id: ID, input: NewProfile ): Profile
    updateProfile(_id: ID, input: NewProfile ): Profile

}

input NewProfile {
    team: String!
    firstname: String!
    lastname: String!
    gender: String!
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