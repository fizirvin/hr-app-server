import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";

const typeDefs = `

scalar Date

type Query {
    profiles: [ProfileQuery]
    profilesLabels( team: String ): [ProfileLabelsQuery]
    workers( inspector: ID, operator: ID ): Workers
}

type Workers{
    inspector: Profile
    operator: Profile
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

type ProfileQuery {
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
    entryNum: Date!
}

type ProfileLabelsQuery {
    _id: ID!
    number: String!
    firstname: String!
    lastname: String!
    gender: String!
    team: String!
    position: String!
    active: Boolean!
    picture_URL: String
}


type Mutation { 
    newProfile(_id: ID, input: NewProfile ): ProfileQuery
    updateProfile(_id: ID, input: UpdateProfile ): ProfileQuery

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

input UpdateProfile {
    firstname: String
    lastname: String
    gender: String
    entry: Date
    department: String
    area: String
    team: String
    position: String
    active: Boolean
    picture_URL: String
}


`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});