import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";

const typeDefs = `
type Query {
    labels: [Label]
    plastics: [Plastic]
}

type Label {
    _id: ID!
    model: String!
    serial: String!
    partNumber: String!
    type: String!
}

type Plastic {
    _id: ID!
    model: String! 
}

type Mutation { 
    newLabel(_id: ID, input: NewLabel): Label
    updateLabel(_id: ID, input: NewLabel): Label

    newPlastic(_id: ID, input: NewPlastic): Plastic
    updatePlastic(_id: ID, input: NewPlastic): Plastic
}

input NewLabel {
    model: String!
    serial: String!
    partNumber: String!
    type: String!
}

input NewPlastic {
    model: String!
}



`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});