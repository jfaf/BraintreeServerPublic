const express = require("express");
const app = express();
const { resolve } = require("path");
var braintree = require('braintree');

app.use(express.static("."));
app.use(express.json());

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "MECHANTID",
  publicKey: "PUBLICKEY",
  privateKey: "PRIVATEKEY"
});

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get("/generate-client-token", function (req, res) {

gateway.clientToken.generate({}, function (err, response) {
  var clientToken = response.clientToken
     res.send(clientToken);
});

});

app.get("/checkout", function (req, res) {

 gateway.transaction.sale({
  amount: "10.00",
	   paymentMethodNonce: "fake-valid-nonce",
  //paymentMethodNonce: braintree.Test.Nonces.PayPalOneTimePayment,
  options: {
    submitForSettlement: true
  }
}, function (err, result) {
	 
});
	
});

app.post("/checkout", function (req, res) {
  //var nonceFromTheClient = req.body.payment_method_nonce;
  // Use payment method nonce here
	gateway.transaction.sale({
  amount: "14.00",
  //paymentMethodNonce: nonceFromTheClient,
  paymentMethodNonce: "fake-valid-nonce",	
  options: {
    submitForSettlement: true
  }
}, function (err, result) {
});
	
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
