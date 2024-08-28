const express = require("express");
var cors = require("cors");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://loyalopinion2024:valued2024@loyalopinion.qzfpg.mongodb.net/?retryWrites=true&w=majority&appName=loyalopinion";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("loyalopinion");
    const users = database.collection("users");

    // Get all users
    app.get("/users", async (req, res) => {});

    // Add new user
    app.post("/users", async (req, res) => {
      const user = req.body;

      //   Check exist user
      const query = { email: user.email };
      const existUser = await users.findOne(query);

      if (existUser) {
        return res.send("User Already Exist");
      }
      //   If user not exist
      const result = await users.insertOne(user);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
