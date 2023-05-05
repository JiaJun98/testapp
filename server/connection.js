require('dotenv').config();
const { MongoClient } = require('mongodb');
//const mongoose = require("mongoose");
const config = require("./config");

//const client = new MongoClient(config.MONGO_URI);
//client.connect();
//console.log("MongoDB connected");

const mongoose = require('mongoose');
const uri = config.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
/**
 * 
async function main(){
    const client = new MongoClient(process.env.MONGO_URI);
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("MongoDB connected");
        //See all current databases
        //await  listDatabases(client);
        //createListing(client, {
        //    name: "Robert Smith",
        //    Industry: "Hacker"
       // });
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
"""
main().catch(console.error);
*/

//Create single record
async function createListing(client, newListing){
    const result = await client.db("Employees").collection("Employees").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};