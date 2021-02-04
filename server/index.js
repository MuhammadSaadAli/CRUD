const { ApolloServer, gql, ApolloError } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// let ids = 4;

// const students =
//   [
//     {
//       "id": '1',
//       "name": "saad",
//       "email": "saad@gmail.com",
//       "age": 24
//     },

//     {
//       "id": '2',
//       "name": "Ali",
//       "email": "def@gmail.com",
//       "age": 28
//     },

//     {
//       "id": '3',
//       "name": "Khan",
//       "email": "ghi@gmail.com",
//       "age": 22
//     },

//     {
//       "id": '4',
//       "name": "Jan",
//       "email": "jkl@gmail.com",
//       "age": 20
//     }
//   ]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    //first student is from query and after the arrow function the student comes from the hardcode data
    // we can write business logic here
    students: async () => {
      return await prisma.student.findMany()
    }
  },
  Mutation: {

    addStudent: async (parent, data) => {

      return await prisma.student.create({ data })

    },
    // updateStudent: (root, { id, input }, context, info) => {
    //   // check whether the payload is exists
    //   const ind = students.findIndex((st) => st.id == id);
    //   if (ind === -1) throw new ApolloError('Student not found...')

    //   // validate the payload


    //   // mutate the payload
    //   students[ind] = {
    //     ...students[ind],
    //     ...input
    //   }

    //   // return the predefined response
    //   return students[ind];
    // },

    updateStudent: async (parent, { id, ...data }) => {
      const student = await prisma.student.update({
        where: { id },
        data
      })
      return student;

    },

    deleteStudent: async (parent, { id }) => {
      const student = await prisma.student.delete({
        where: { id }
      })
      return "This value is deleted"

    }
    ,


  }
};


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`

#definetion table
  type Student {
    id: Int!
    name: String!
    email: String!
    age: Int!
  }
 
#query type kis type ki query hai
  type Query {
    students: [Student]
  }

  type Mutation {
    # addStudent is just name
    addStudent(name:String!,email:String!,age:Int!): Student!
    updateStudent(id: Int!,email:String!,name:String!,age:Int!): Student!
    deleteStudent(id: Int!): String!
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
