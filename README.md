server-info
===========

A nodejs package to get information from your server.


Docs
=======

    var server = require('server-info');


### Operating System

    server.os().name; // Ubuntu
    server.os().version; // 14.04

### Memory Usage

    server.memory().total; // 1.96GB
    server.memory().used; // 510MB
    server.memory().free; // 1.46GB
    server.memory().active; // 96.9MB
    server.memory().inactive; // 149MB

by passing a 'raw' flag into `memory()` you will get the output in raw bytes

    server.memory(true).free; // 1564446720

### Disk Usage

    server.disk().total; // 39.3GB
    server.disk().used; // 5.07GB
    server.disk().free; // 32.6GB

by passing a 'raw' flag into `disk()` you will get the output in raw bytes

    server.disk(true).used; // 5441445888
    
