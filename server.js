
// BASE SETUP
// =============================================================================



// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var twilio = require('twilio');				//importing twilio
var client = new twilio.RestClient('ACbb53da2689e337fd8abcfdd823f1da19', '2ad38d9f478f19f61a19e6992debc91f');//

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3030;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api',function(req, res) {
	console.log('Something is happening.');
	client.sms.messages.create({
    to:'',//To Number
    from:'',//From Number (Twilio Number)
    body:'Hi ,We are trying to reach you from morning but we are not able.Kindly call us back.'
}, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
});
    res.json({ message: 'hooray! welcome to our api!' });   
});
 



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
