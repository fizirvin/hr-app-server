import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";

const typeDefs = `
    type Query {
        paths: [Path]
        techs: [Technology]
    }

    type Path {
        _id: ID!
        pathName: String!
        coreTechnology: String!
        urlPath: String
        urlPathCertification: String
        urlImage: String
        cert: String
        courses: [Course]
    }

    type Course {
        _id: ID!
        courseName: String!
        level: String!
        urlImage: String
        urlRepository: String
        urlCourse: String
        urlCertification: String
        urlInstructor: String
        platform: String
    }

    type Technology {
        _id: ID!
        technologyName: String
        paths: [Path]
    }



`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});