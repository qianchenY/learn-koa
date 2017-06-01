'use strict';
var greet=require('./hello');
var fs=require('fs');
var rs=fs.createReadStream('ceshi.txt','utf-8');
var ws=fs.createWriteStream('ceshi2.txt','utf-8');
rs.pipe(ws);