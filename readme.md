# Itemize

A lazy, fluent web crawler with an async/await API.

```
$ yarn add itemize
```

## Quickstart

Itemize lists all of the linked files and pages underneath the specified root URL.

```js
const urls = itemize('https://news.ycombinator.com', { depth: 2 })

// Get a quick Hacker News sitemap
while (!urls.done()) {
  console.log(await urls.next())
}
```

This is useful for writing mirrors, monitoring a page for new content, etc.
It starts at the root URL provided and automatically spiders through to find connecting pages.
Itemize takes a lazy approach to I/O and only makes requests when you're asking it for more content
with `next()`.

## API

### itemize(url, options)

Returns an Itemize instance.

- url: String, the root URL from which to crawl
- options: Object
  - depth: Number, crawl this many layers deep (0)

```js
const items = itemize('https://nodejs.org/download/release/', { depth: 1 })
```

### .next()

Returns a Promise for a String, the next linked URL.

If no urls remain, returns a Promise for `undefined`.

```js
const url = await items.next()
```

### .done()

Returns a Boolean representing whether or not all spidering routes have been exhausted.

```js
if (items.done()) console.log('crawl complete')
```

### .all()

Returns a Promise for an Array of Strings, all of the previously traversed items.

```js
const all = await items.all()
```

### .close()

Itemize uses a keepalive HTTP/HTTPS agent.
Use `close()` to destroy the existing underlying socket and create a new Agent with no existing connections.

You should use this to clean up after Itemize instances that haven't completed their crawls.

```js
items.close()
```

## Tests and Examples

```
$ yarn test
```

```
$ node --harmony examples/hackernews.js
$ node --harmony examples/nodes.js
```
