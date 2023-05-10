const { ApolloServer } = require("apollo-server-express")
const { typeDefs, resolvers } = require("./schema")
const express = require("express")
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const router = express.Router()
app.use("/public/dist", (req, res) =>
  res.sendFile(__dirname + "/public/dist/bundle.js")
)
router.get("/apolloPOC", (req, res) =>
  res.sendFile(__dirname + "/views/apolloPOC.html")
)
router.get("/reactPOC", (req, res) =>
  res.sendFile(__dirname + "/views/reactPOC.html")
)
router.get("/test", (req, res) =>
  res.sendFile(__dirname + "/views/test.html")
)

router.get("/womp", (req, res) =>
  res.sendFile(__dirname + "/views/womp.html")
)
router.get("/bareDesktop", (req, res) =>
  res.sendFile(__dirname + "/views/bareDesktop.html")
)
app.use('/test', router);
;(async function startServer() {
  await server.start()
  server.applyMiddleware({ app })

  app.listen({ port: 3015 }, () =>
    console.log(`🚀 Server ready at http://localhost:3015${server.graphqlPath}`)
  )
})()
