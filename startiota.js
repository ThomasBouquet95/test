
var iota = (function () {

    var IOTA = require('iota.lib.js');

    //  Instantiate IOTA 
    var iota = new IOTA({
        'host': 'http://139.59.140.219',
        'port': 14300
    });

   var processATransaction = function (seed, address, value, message) {
          

                var messageToSend = {
                    'message': message}

                // Stringify to JSON
                var messageStringified = JSON.stringify(messageToSend);
                // Convert the string to trytes
                var messageTrytes = iota.utils.toTrytes(messageStringified);

                var transfer = [{
                    'address': address,
                    'value': parseInt(value),
                    'message': messageTrytes,
		    'obsoleteTag':'NOVELEC99999999999999999999'
                }]
             

                 // We send the transfer from this seed, with depth 4 and minWeightMagnitude 18
                iota.api.sendTransfer(seed, 4, 14, transfer, function(error, bundle) {
                    if (error) {console.log(error);}else {
                    console.log('Success : ');
                    console.log(bundle);
		    for (var i=0;i<15;i++){
			broadcastTransaction(bundle[0].hash);
		    }           
                }})
           
        }


        var generateAddress = function (seed) {
            iota.api.getNewAddress( seed, { 'checksum': false }, function(error, success) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(success)
                }
             
                
            });
        }

        var broadcastTransaction = function (hash) {
            iota.api.broadcastBundle( hash, function(error, success) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(success)
                }
             
                
            });
        }

    return {
        processATransaction : processATransaction,
        generateAddress : generateAddress,
	broadcastTransaction : broadcastTransaction
    }

})();


var seed = 'OPYBSWNWCIMLMRHWQAJGKLVFOLDZBCAQJFKUGRZJWGKLAJIPJHRTXBZRYDQRUSWWD9UPYPQNHGDNPEXJN';
receivingAddress='Q9MDJRZQVXAVGHLOD9PGFRVIVTWQEZHQJKYFPYVSTGLOAEOOIFSAZXBWKUHF9WXKMXWUVVCLJ9OTVLZKCRSQJHKY9D';
message = 'User id 001 : syringue pressed';
//iota.processATransaction(seed,receivingAddress,0,message);
// create an instance of the rpio-gpio-buttons object with pins 11 and 13 
var buttons = require('rpi-gpio-buttons')([7]);
 
buttons.on('pressed', function (pin) {
  console.log('Button pressend, sending transaction ...');
  iota.processATransaction(seed,receivingAddress,0,message);
});








