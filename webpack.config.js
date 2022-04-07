const path = require('path');

module.exports = {
	entry: './src/entry.js',
	mode: "production",
	output: {
		path: path.join(__dirname + "/public/dist"),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			}
		]
	}
};