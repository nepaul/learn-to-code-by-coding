# Tips
- workers run in another global context that is different from the current [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window). Thus, using the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) shortcut to get the current global scope (instead of [`self`](https://developer.mozilla.org/en-US/docs/Web/API/Window/self)) within a [`Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker) will return an error

## Usage
1. start http server, for example `python -m SimpleHTTPServer 8080`
2. open `http://localhost:8080`

## Reference
- [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
