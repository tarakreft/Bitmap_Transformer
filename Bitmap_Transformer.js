var fs = require('fs');



fs.readFile('./werk.bmp', function (err, data) {
	if (err) return err;
	
	var offSet = data.readUInt16LE(10);
	var bitHeader = data.slice(0, offSet);
	var pixelArray = data.slice(offSet, data.length);

  	var inverted = [];

  	for ( i = 0; i < pixelArray.length; i++ ) {
    	inverted.push(pixelArray[i] = 255 - pixelArray[i]);
  	} 

	var pixelInvert = new Buffer(inverted);

	var fitnessBuff = Buffer.concat([bitHeader, pixelInvert]);

	fs.writeFile('./out.bmp', fitnessBuff, function (err){
		if (err) return err;
		console.log('your file has been transformed');
	 });	
 });
