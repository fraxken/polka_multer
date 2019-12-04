# polka_multer

```
npm ci
npm start
```

error we want (from my production server)
```
_http_server.js:237
    throw new ERR_HTTP_INVALID_STATUS_CODE(originalStatusCode);
    ^

RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: LIMIT_FILE_SIZE
    at ServerResponse.writeHead (_http_server.js:237:11)
    at ServerResponse._implicitHeader (_http_server.js:228:8)
    at write_ (_http_outgoing.js:616:9)
    at ServerResponse.end (_http_outgoing.js:733:5)
    at Polka.onError (F:\Code\synergized\node-server\node_modules\polka\index.js:22:6)
    at next (F:\Code\synergized\node-server\node_modules\polka\index.js:94:32)
    at Immediate._onImmediate (F:\Code\synergized\node-server\node_modules\multer\lib\make-middleware.js:53:37)
    at processImmediate (internal/timers.js:441:21) {
  code: 'ERR_HTTP_INVALID_STATUS_CODE'
}
```

