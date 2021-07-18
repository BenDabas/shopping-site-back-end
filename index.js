const express = require('express');

const Server = require('./Server');

const server = new Server(express);
server.run();
