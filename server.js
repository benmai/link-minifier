var Hapi = require('hapi');

var port = process.env.PORT || 5000;

var server = new Hapi.Server('localhost', port);

var logPrefix = '[link-minifier] ';

var links = {};

server.route({
	method: '*',
	path: '/{p*}',
	handler: function (request, reply) {
		reply.redirect('/');
	}
});

server.route({
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		var text = '<table><tr><th>long link</th><th>short link</th></tr>';
		for (var link in links) {
			if (!links.hasOwnProperty(link)) {
				continue;
			}
			var short = request.info.host + '/' + link;
			text += '<tr><td>' + links[link] + '</td><td>' + short + '</td></tr>';
		}
		text += '</table>';
		reply(text);
	}
});

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
		console.log(logPrefix + 'Set /' + link + ' => ' + url);
		reply.redirect('/');
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
			reply.redirect('/');
		}
	}
});

server.start();

console.log('Server is now running on localhost at port ' + port);
