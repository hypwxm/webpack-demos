var path = require("path");

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, "react/myrouter/src/index.js")
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "react/myrouter/build")
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                loader: "babel",
                exclude: path.resolve(__dirname, "node_modules")
            }
        ]  
    }
    
};