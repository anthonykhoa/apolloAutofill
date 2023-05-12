const { ApolloServer } = require("apollo-server-express")
const { typeDefs, resolvers } = require("./schema")
const express = require("express")
const app = express();
const fs = require('fs')

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
router.get("/testDup", (req, res) =>
  res.sendFile(__dirname + "/views/testDup.html")
)

router.get("/womp", (req, res) =>
  res.sendFile(__dirname + "/views/womp.html")
)
router.get("/bareDesktop", (req, res) =>
  res.sendFile(__dirname + "/views/bareDesktop.html")
)
router.get("/changeissue", (req, res) =>
  res.sendFile(__dirname + "/views/changeissue.html")
)
router.get("/hm", (req, res) =>
  res.sendFile(__dirname + "/views/hm.html")
)
;(async function startServer() {
  await server.start()
  // const files = await fs.readdirSync(__dirname + "/views");
  // for (i = 0; i < files.length; i++) {
  //   const fileName = files[i];
  //     console.log(__dirname + `/views/${fileName}`)
  //   await router.get(`/${fileName}`, ((req, res) => {
  //     res.sendFile(__dirname + `/views/${fileName}`)
  //   }))
  // }
  // files.forEach((fileName) => {
  //     // console.log(__dirname + `/views/${fileName}`)
  //   router.get(`/${fileName}`, ((req, res) => {
  //     res.sendFile(__dirname + `/views/${fileName}`)
  //   }))
  // })
  app.use('/test', router);
  server.applyMiddleware({ app })

  app.listen({ port: 3015 }, () =>
    console.log(`🚀 Server ready at http://localhost:3015${server.graphqlPath}`)
  )
})()
