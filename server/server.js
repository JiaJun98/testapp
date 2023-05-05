const express = require('express'); 
const cors = require('cors');
const bodyParser = require("body-parser"); //Might not need in new version of express
const config = require("./config");
const db = require("./connection");

const index = express();
const port = process.env.PORT || config.port;

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false }));

//Need to set up autheticator - Pending..
const app = express(); //Temporary use this
const claims = require("./routes/claims");

app.use(cors());
app.use(express.json());

// Router to the /claim route in app. 
//All routes defined in insuranceClaimRoutes is accessible via claims endpoint
app.use("/claims", claims);

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route for testing
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });

});