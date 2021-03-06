const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
//middle Ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nw0lg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try{
        await client.connect();
        const servicesCollection=client.db('doctors_portal').collection('services');

        app.get('/service',async(req,res)=>{
            const query={};
            const cursor=servicesCollection.find(query);
            const services=await cursor.toArray();
            res.send(services);
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Doctors!");
});

app.listen(port, () => {
  console.log(`Doctors App Running ${port}`);
});
