#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from "./src/app";
import {config} from "dotenv";
import http from "http";

config();
/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '80';
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,()=>console.log(`Listening on ${port}`));
