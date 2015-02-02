Fewtile - a tiled scoreboard for Jenkins
========================================


To install
----------

OUT OF DATE

Fewtile is not a jenkins plugin - it runs from the 'userContent' folder of your jenkins install.
The simplest way to install is just to clone fewtile from git to that folder.

1. SSH to your jenkins server.
2. cd to [jenkins root]/userContent - e.g. /var/lib/jenkins/userContent
3. git clone git://github.com/techtangents/fewtile.git

Fewtile is now available via a web browser at [server url]/userContent/fewtile

I'd suggest editing the description at the top of your jenkins home page, adding:
<a href='/userContent/fewtile/index.html'>fewtile scoreboard</a>

Browser Support
---------------

Fewtile is officially supported only on Google Chrome.
It might also work on Safari or Firefox.



Developing
==========

npm install -g grunt-cli bower

There are a few purescript-jquery-ajax libs. Fewtile uses this one:
https://github.com/wfaler/purescript-jquery-ajax


