var expect = require('chai').expect;
var BitmapTransformer = require('./Bitmap_Transformer.js').BitmapTransformer;
var fs = require('fs');

var FitnessEmoji = new BitmapTransformer();


describe('BitmapTransformer', function(){

	it('has a read method', function (done){
		FitnessEmoji.read('./werk.bmp');
			expect(FitnessEmoji.data).to.exist;
			expect(FitnessEmoji.offSet).to.eql(54);
			expect(FitnessEmoji.bitHeader.length).to.eql(54);
			expect(FitnessEmoji.data.length).to.eql
				(FitnessEmoji.bitHeader.length + FitnessEmoji.pixelArray.length);
			done();
	});

	it('has an invert method', function (done){
		FitnessEmoji.invert();
			expect(FitnessEmoji.pixelTransform.length).to.eql
				(FitnessEmoji.pixelArray.length);
			done();
	});

	it('has a method to re-attach the header', function (done){
		FitnessEmoji.reattachHeader();
			expect(FitnessEmoji.finalBuffer.length).to.eql
				(FitnessEmoji.bitHeader.length + FitnessEmoji.pixelTransform.length);
			done();
	});

	it('has a save method', function (done){
		FitnessEmoji.save('./out.bmp');
			expect(FitnessEmoji.outputName).to.exist;
			expect(FitnessEmoji.outputName).to.eql('./out.bmp')
			done();
	});

});
