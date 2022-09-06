// https://adamcoster.com/blog/create-a-live-reload-server-for-front-end-development

/** @file site/dev-server.js */
// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const WebSocket = require("ws");

import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { WebSocketServer } from "ws";
import { fileURLToPath } from "url";

// FIX __dirname: https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HTTP_PORT = 8089;
const WEBSOCKET_PORT = 8090;
const CLIENT_WEBSOCKET_CODE = fs.readFileSync(
  path.join(__dirname, "client-websocket.js"),
  "utf8"
);

// Websocket server (for allowing browser and dev server to have 2-way communication)
// We don't even need to do anything except create the instance!
new WebSocketServer({
  port: WEBSOCKET_PORT,
});

const getContentType = (filePath) => {
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
  return mimeTypes[extname] ?? "application/octet-stream";
};

/**
 * @typedef {import('http').IncomingMessage} req
 * @typedef {import('http').ServerResponse} res
 */

/** Use classic server-logic to serve a static file (e.g. default to 'index.html' etc.)
 * @param {string} route
 * @param {res} res
 * @returns {boolean} Whether or not the page exists and was served
 */
function serveStaticPageIfExists(route, res) {
  // We don't care about performance for a dev server, so sync functions are fine.
  // If the route exists it's either the exact file we want or the path to a directory
  // in which case we'd serve up the 'index.html' file.
  if (fs.existsSync(route)) {
    if (fs.statSync(route).isDirectory()) {
      return serveStaticPageIfExists(path.join(route, "index.html"), res);
    } else if (fs.statSync(route).isFile()) {
      res.writeHead(200, { "Content-Type": getContentType(route) });
      /** @type {string|Buffer} */
      let file = fs.readFileSync(route);
      if (route.endsWith(".html")) {
        // Inject the client-side websocket code.
        // This sounds fancier than it is; simply
        // append the script to the end since
        // browsers allow for tons of deviation
        // from *technically correct* HTML.
        file = `${file.toString()}\n\n<script>${CLIENT_WEBSOCKET_CODE}</script>`;
      }
      res.end(file, "utf-8");
      return true;
    }
  }
  return false;
}

/** General request handler and router
 * @param {req} req
 * @param {res} res
 */
const requestHandler = function (req, res) {
  const method = req.method.toLowerCase();
  if (method === "get") {
    // No need to ensure the route can't access other local files,
    // since this is for development only.
    const route = path.normalize(path.join(__dirname, req.url));
    if (serveStaticPageIfExists(route, res)) {
      return;
    }
  }
  res.writeHead(404);
  res.end();
};

const server = http.createServer(requestHandler);
server.listen(HTTP_PORT);
