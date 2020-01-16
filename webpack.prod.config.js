const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
	},
	optimization: {
    minimize: true,
  },
	module: {
		rules: [
	    {
	    	test: /\.js$/,
	    	exclude: /node_modules/,
	    	loader: 'babel-loader',
	    },
	  ],
	},
};