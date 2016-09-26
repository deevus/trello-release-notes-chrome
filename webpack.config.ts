import * as Webpack from "webpack";
import * as path from "path";
import merge = require("webpack-merge");
import validate = require("webpack-validator");
import failPlugin = require("webpack-fail-plugin");
import HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean2-webpack-plugin");

const common: Webpack.Configuration & any = {
    entry: {
        "popup": path.join(__dirname, "src", "popup")
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: "ts-loader"},
            {test: /\.jsx?$/, loader: "babel-loader", exclude: "node_modules"},
            {test: /\.coffee$/, loader: "coffee", exclude: "node_modules"},
            {test: /\.json$/, loader: "json"},
        ],
    },
    resolve: {
        extensions: ["", ".webpack.js", ".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "trello": path.join(__dirname, "vendor", "trello", "client.coffee")
        }
    },
    plugins: [
        failPlugin,
        new HtmlWebpackPlugin({
            filename: "popup.html",
            chunks: ["popup"]
        }),
        new CleanWebpackPlugin(["public"], path.resolve(__dirname)),
        new Webpack.DefinePlugin({
            API_KEY: JSON.stringify(process.env.npm_package_config_apiKey)
        }),
        new Webpack.ProvidePlugin({
            "jQuery": "jquery",
            $: "jquery"
        })
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