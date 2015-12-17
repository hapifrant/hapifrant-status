# hapifrant-status
[![Build Status](https://travis-ci.org/hapifrant/hapifrant-status.svg)](https://travis-ci.org/hapifrant/hapifrant-status)
[![Code Climate](https://codeclimate.com/github/hapifrant/hapifrant-status/badges/gpa.svg)](https://codeclimate.com/github/hapifrant/hapifrant-status)
[![Test Coverage](https://codeclimate.com/github/hapifrant/hapifrant-status/badges/coverage.svg)](https://codeclimate.com/github/hapifrant/hapifrant-status/coverage)

> Status route for your Hapifrant microservice

## Usage

### Install from NPM

```sh
npm install --save hapifrant-status
```

### Example

```javascript
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });
// Register status plugin
server.register({
    register: require('hapifrant-status'),
    options: {
        path: '/status' // Status route path
        tags: ['status', 'monitor'],
        showFull: false
    }
}, function (err) {

    if(err){
      console.log(err);
    }
});

server.start(function () {

  console.log('Server running at:', server.info.uri);
});
```

### Calling the health route

The status route is exposed using `GET` method in a given path (`/status` by default).

When the server is running the response status code should be 200.