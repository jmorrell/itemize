const itemize = require('..')

list()

// Get all the nodebin examples, including querystrings
async function list() {
  const urls = itemize('https://nodebin.herokai.com/', { depth: 3, query: true })
  while (!urls.done()) {
    const {value} = await urls.next();
    console.log(value)
  }
}
