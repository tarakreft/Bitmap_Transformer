var fs = require('fs');

function BitmapTransformer() {
	var offSet;
	var bitHeader;
	var pixelArray;
	var pixelTransform;
	var finalBuffer;
	var data;
	
	this.read = function (fileName) {
		console.log("reading file...");
		this.originalFileName = fileName;
		this.data = fs.readFileSync(this.originalFileName);
		this.offSet = this.data.readUInt16LE(10);
		this.bitHeader = this.data.slice(0, this.offSet);
		this.pixelArray = this.data.slice(this.offSet, this.data.length);
	};

	this.invert = function () {
		console.log("inverting pixels...")
		var inverted = [];
		for (i = 0; i < this.pixelArray.length; i++){
			inverted.push(this.pixelArray[i] = 255 - this.pixelArray[i]);
		}
		this.pixelTransform = new Buffer(inverted);
	};

	this.reattachHeader = function () {
		console.log("re-attaching header...");
		this.finalBuffer = Buffer.concat([this.bitHeader, this.pixelTransform]);
	};

	this.save = function (outputName) {
		this.outputName = outputName;
		fs.writeFile(outputName, this.finalBuffer, function (err){
			if (err) throw err;
			console.log("Your file has been transformed :) ");
		});
	};
}

module.exports.BitmapTransformer = BitmapTransformer;
