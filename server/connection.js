require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main(){
    const client = new MongoClient(process.env.MONGO_URI);
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        //See all current databases
        //await  listDatabases(client);
        createListing(client, {
            name: "Robert Smith",
            Industry: "Hacker"
        });
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


async function createListing(client, newListing){
    const result = await client.db("Employees").collection("Employees").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 