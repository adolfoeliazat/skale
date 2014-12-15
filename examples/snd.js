#!/usr/local/bin/node

var UgridClient = require('../lib/ugrid-client.js');

var ugrid = new UgridClient({
	host: 'localhost',
	port: 12346,
	data: {type: 'snd'}
});

ugrid.connect_cb(function(err, res) {
	console.log("uuid: " + res.uuid);
	ugrid.devices_cb({type: 'rcv'}, function(err, res) {
		setInterval(function() {
			for (var i = 0; i < 1000; i++)
				ugrid.send_cb({cmd: 'request', id: res[0].id});
		}, 1);
	});
});
