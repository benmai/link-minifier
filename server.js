var Hapi = require('hapi');

var server = new Hapi.Server('localhost', 8000);

var links = {};

server.route({
	method: 'GET',
	path: '/create/{link}/{url*}',
	handler: function (request, reply) {
		var link = request.params.link;
		var url = request.params.url;
		if (!url.match(/^https?:\/\/.*/)) {
			url = 'http://' + url;
		}
		links[link] = url;
		console.log('[SERVER] Set /' + link + ' => ' + url);
		reply(url + ' can now be accessed at ' + 'localhost/' + link);
		console.log(links);
	}
});

server.route({
	method: 'GET',
	path:'/{link}',
	handler: function (request, reply) {
		var link = request.params.link;
		if (links.hasOwnProperty(link)) {
			reply.redirect(links[link]);
		} else {
			reply(link + ' not found').code(404);
		}
	}
});

server.start();

console.log('Server is now running on localhost at port 8000');
