// const http = require('http');
// const fs = require('fs');
// const path = require('path');
/**
 * FIXed this error using ES module imports:
 *  ReferenceError: require is not defined in ES module scope, you can use import instead
 *  This file is being treated as an ES module because it has a '.js' file extension and
 *  package.json contains "type": "module".
 *  To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
 */
import * as http from "http";
import * as fs from "fs";
import * as path from "path";

/**
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework
 */
http
  .createServer((request, response) => {
    console.log(`request ${request.url}`);

    let filePath = `.${request.url}`;
    if (filePath === "./") {
      filePath = "./index.html";
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm",
    };

    const contentType = mimeTypes[extname] ?? "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === "ENOENT") {
          fs.readFile("./404.html", (error, content) => {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end(content, "utf-8");
          });
        } else {
          response.writeHead(500);
          response.end(
            `Sorry, check with the site admin for error: ${error.code} ..\n`
          );
        }
      } else {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(8125);
console.log("Server running at http://127.0.0.1:8125/");
