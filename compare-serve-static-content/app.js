'use strict';
var path = require('path');

var koa = require('koa');
var staticServe = require('koa-static');
var app = koa();

app.use(staticServe(path.join(__dirname, './public')));
app.listen(3000);

console.log('Node HttpServer listen on port 3000');
