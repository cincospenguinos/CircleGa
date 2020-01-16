const path = require('path');

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
	},
	module: {
		rules: [
	    {
	    	test: /\.jsx?$/,
	    	exclude: /node_modules/,
	    	loader: 'babel-loader',
	    },
	    {
	    	test: /\.css$/,
	    	loader: 'style-loader',
	    },
	    {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
			    modules: true,
			  },
      },
	  ],
	},
};
