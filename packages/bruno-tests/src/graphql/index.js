const express = require('express');
const router = express.Router();
const { GraphQLHandler } = require('graphql-mocks');
const bodyParser = require('body-parser');
const { expressMiddleware } = require('@graphql-mocks/network-express');

const schemaString = `
  schema {
    query: Query
  }

  type Query {
    helloWorld: String!
  }
`;

const resolverMap = {
  Query: {
    helloWorld() {
      return "Hello from my first GraphQL resolver!";
    },
  },
};

const graphqlHandler = new GraphQLHandler({
  resolverMap,
  dependencies: {
    graphqlSchema: schemaString,
  },
});

const query = graphqlHandler.query(
  `
    {
      helloWorld
    }
  `
);
// query.then((result) => console.log(result));

router.use(bodyParser.json());  // This is crucial to parse the incoming JSON body

router.post('/should-work', expressMiddleware(graphqlHandler));

router.post('/works', express.json(), function (req, res, next) {
  reqBody = JSON.parse(req.body);
  var query = graphqlHandler.query(reqBody.query);

  console.log(query)
  console.log(reqBody)


  query.then(
    (result) => {
      console.log(result)
      return res.json(result)
    })
});

module.exports = router;