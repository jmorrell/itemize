const itemize = require('..')

list()

// See what's poppin on wikipedia
async function list() {
  const urls = itemize('https://en.wikipedia.org/wiki', { depth: 3 })
  while (!urls.done()) {
    const {value} = await urls.next()
    console.log(value)
  }
}
