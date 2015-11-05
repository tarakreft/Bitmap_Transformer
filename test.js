var expect = require('chai').expect;
var Bitmap_Transformer = require('./Bitmap_Transformer.js');
var fs = require('fs');


describe('fs.readfile', function() {
	it('reads a file, throws err if unavailable', function(){
		fs.readFile('./werk.bmp', function (err, data) {
		if (err) return err;
			expect('./werk.bmp').to.exist;
		});	
	});	
});		

describe ('offSet', function(){
	it('identifies where the pixel array begins', function (){
		fs.readFile('./werk.bmp', function (err, data) {	
			var offSet = data.readUInt16LE(10);
				expect(offSet).to.eql(54);
		});	
	});	
});	

describe ('bitHeader', function(){
	it('saves the Header info in a buffer', function (){
		fs.readFile('./werk.bmp', function (err, data) {	
			var bitHeader = data.slice(0, offSet);
				expect(bitHeader).to.have.length(54);
		});	
	});	
});	
describe ('pixelArray', function(){
	it('has only the pixel info for bitmap', function (){
		fs.readFile('./werk.bmp', function (err, data) {	
			var pixelArray = data.slice(offSet, data.length);
				expect(pixelArray).to.exist;
		});	
	});	
});

describe ('inverted', function(){
	it('holds the inverted pixels', function (){
		fs.readFile('./werk.bmp', function (err, data) {	
			var inverted = [];
				expect(inverted).to.be.instanceof(Array);
		});	
	});	
});

describe ('for loop', function(){
	it('loops through the pixel array and inverts pixels', function (){
		fs.readFile('./werk.bmp', function (err, data) {	
			for ( i = 0; i < pixelArray.length; i++ ) {
    			inverted.push(pixelArray[i] = 255 - pixelArray[i]);
  				} 
				expect(pixelArray[i]).to.have.lengthOf(pixelArray.length);
		});	
	});	
});

describe ('pixel invert', function(){
	it('makes new buffer from inverted', function (){
		fs.readFile('./werk.bmp', function (err, data) {	
			var pixelInvert = new Buffer(inverted);
				expect(pixelInvert).to.be.ok;
		});	
	});	
});

describe ('fitnessBuff', function(){
	it('concatenates two buffers', function (){
		fs.readFile('./werk.bmp', function (err, data) {	
    		var fitnessBuff = Buffer.concat([bitHeader, pixelInvert]); 
				expect(fitnessBuff).to.be.eql.to([bitHeader, pixelInvert]);
		});	
	});	
});

describe ('fs.writeFile', function(){
	it('writes new transformed file', function (){
		fs.readFile('./werk.bmp', function (err, data) {	
			fs.writeFile('./out.bmp', fitnessBuff, function (err){
				if (err) return err;
				console.log('your file has been transformed');
	 			});	
 			});
				expect('./out.bmp').to.exist;
	});	
});	

  



	




	