const { ApolloServer } = require("apollo-server-express")
const { typeDefs, resolvers } = require("./schema")
const express = require("express")
const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

app.use("/public/dist", (req, res) =>
  res.sendFile(__dirname + "/public/dist/bundle.js")
)
app.get("/test/apolloPOC", (req, res) =>
  res.sendFile(__dirname + "/views/apolloPOC.html")
)
app.get("/test/reactPOC", (req, res) =>
  res.sendFile(__dirname + "/views/reactPOC.html")
)
app.get("/test/test", (req, res) =>
  res.sendFile(__dirname + "/views/test.html")
)
;(async function startServer() {
  await server.start()
  server.applyMiddleware({ app })

  app.listen({ port: 3015 }, () =>
    console.log(`🚀 Server ready at http://localhost:3015${server.graphqlPath}`)
  )
})()
