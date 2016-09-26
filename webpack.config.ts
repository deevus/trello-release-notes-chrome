import * as Webpack from "webpack";
import * as path from "path";
import merge = require("webpack-merge");
import validate = require("webpack-validator");
import failPlugin = require("webpack-fail-plugin");

const common: Webpack.Configuration & any = {
    entry: [
        path.join(__dirname, "src", "app")
    ],
    output: {
        filename: path.join(__dirname, "bin", "[name].js")
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: "ts-loader"},
            {test: /\.jsx?$/, loader: "babel-loader", exclude: "node_modules"},
        ]
    },
    resolve: {
        extensions: ["", ".webpack.js", ".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        failPlugin
    ]
};

function getConfig(isProduction: boolean): Webpack.Configuration {
    if (isProduction) {
        return merge(
            common,
            {
                devtool: "eval-source-map"
            }
        );
    } else {
        return merge(
            common,
            {
                devtool: "source-map"
            }
        );
    }
}

export default validate(getConfig(process.env.PRODUCTION));