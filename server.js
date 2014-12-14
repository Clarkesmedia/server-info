//var opsys = require('os');
var ns = require('nsutil')
var shelljs = require('shelljs');

function getOS(){
    var name = shelljs.exec('lsb_release -a | grep ID', {silent: true}).output;
    var release = shelljs.exec('lsb_release -a | grep Release', {silent: true}).output;

    var cleanup = function(output){
        return output.slice(output.indexOf(':') + 1).trim();
    }
    var os = {};
    os.name = cleanup(name);
    os.version = cleanup(release);
    return os;
}

var bytesToSize = function(bytes) {
    if(bytes == 0) return '0 Byte';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

function getMemory(raw){
    var raw = raw || false;
    var base =  ns.virtualMemory();
    var data = {};

    data.total = raw ? base.total : bytesToSize(base.total);
    data.used = raw ? base.used : bytesToSize(base.used);
    data.free = raw ? base.free : bytesToSize(base.free);
    data.active = raw ? base.active : bytesToSize(base.active);
    data.inactive = raw ? base.inactive : bytesToSize(base.inactive);
    return data;
}

function getDiskUsage(raw){
    var raw = raw || false;
    var base =  ns.diskUsage('/')
    var data = {};

    data.total = raw ? base.total : bytesToSize(base.total);
    data.used = raw ? base.used : bytesToSize(base.used);
    data.free = raw ? base.free : bytesToSize(base.free);
    return data;
}



module.exports = {
    os: function(){
        return getOS();
    },
    memory: function(raw){
        return getMemory(raw);
    },
    disk: function(raw){
        return getDiskUsage();
    }
};