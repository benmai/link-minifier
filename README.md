link-minifier
=============

A link minifier server, like bit.ly, written in node.js. Set up to run on Heroku at link-minif.herokuapp.com.

It has a REST API with the following commands:

- `/create/link/url` will add an entry in the server such that accessing `/link` redirects to `url`

- `/link` as stated above, will redirect to its corresponding `url`
