var BitmapTransformer = require('./Bitmap_Transformer.js').BitmapTransformer;

var FitnessEmoji = new BitmapTransformer();

FitnessEmoji.read('./werk.bmp');
FitnessEmoji.invert();
FitnessEmoji.reattachHeader();

FitnessEmoji.save('./out.bmp');
