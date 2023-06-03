/* eslint-disable camelcase */
/* eslint-disable indent */
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

/*
{
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
    });
  },
{
      url: classes/messages,
      type: 'GET',
      contentType: 'application/json',
    });

*/


//throw error if request.contentType != 'application'/json
//return 404 if request.url != 'classes/messages'
/*
switch (response.type) {
  case 'GET' {
    a bunch of code
  }
  case 'POST' {
    more core...
  }
} */

/*
{
  "roomname": null,
  "text": "hello giri",
  "username": "bob",
  "message_id": 112774,
  "created_at": "2023-06-02T22:40:53.514Z",
  "updated_at": "2023-06-02T22:40:53.514Z"
}
*/

var { defaultCorsHeaders, log } = require('./util');

const DATA = [
  {
    text: 'message',
    room: '1',
    username: 'shay',
    message_id: 1,
    created_at: 'aslkdfjslkdjf',
    updated_at: 'aslkdfjslkdjf'
  }
];

module.exports = requestHandler = function (request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/


  log(request);

  var statusCode = 200;
  var body = [];

  //error case
  //listener for error
  request.on('error', (err) => {
    statusCode = 404;
    console.log('error' + err);

  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = JSON.parse(Buffer.concat(body).toString());
    switch (request.method) {
      case 'GET':
      // iterate thru messages back to front
      // pull 100 messages
      // write to response
      case 'POST':
        Object.assign(body, {
          message_id: DATA.length + 1,
          created_at: Date.now(),
          updated_at: Date.now()
        });
        // store request.data
        DATA.push(body);
        statusCode = 201;
    }

    if (statusCode === 404) {
      response.end('404 error');
    }
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';

    console.log(body);
    response.writeHead(statusCode, headers);
    response.write(JSON.stringify(body));
    response.end();
  });

  /* writeHead() writes to the request line and headers of the response,
    which includes the status and all headers. */
  /*  Make sure to always call response.end() - Node may not send
   anything back to the client until you do. The string you pass to
   response.end() will be the body of the response - i.e. what shows
   up in the browser.

   Calling .end "flushes" the response's internal buffer, forcing
   node to actually send all the data over to the client. */
  // response.write(JSON.stringify([{ text: 'message', room: '1', username: 'shay' }]));

};



