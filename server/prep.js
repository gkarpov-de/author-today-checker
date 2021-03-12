var booksIDList = require('./resources/books_ids.json')
const { getBookInfo, getLastChapterOfBook } = require('./at-requests')

async function convertBooksIDListToBooks(booksIDList) {
  let books = []
  await Promise.all(
    booksIDList.map(async id => {
      const convertedBook = await getConvertedBook(id)
      books.push(convertedBook)
    })
  )

  return books
}

async function getConvertedBook(id) {
  let bookInfo = await getBookInfo(id)
  let book = {
    id: bookInfo.id,
    coverUrl: bookInfo.coverUrl,
    author: bookInfo.authorFIO,
    title: bookInfo.title,
    modifiedOn: bookInfo.lastModificationTime,
    lastChapter: (await getLastChapterOfBook(id)).sortOrder + 1
  }
  return book
}

;(async () => {
  try {
    console.log('Getting books data from Author.Today...')
    const monitoringBooks = {
      lastCheck: new Date(),
      books: await convertBooksIDListToBooks(booksIDList)
    }
    console.log('Data recieved')

    const fs = require('fs')
    console.log('Saving books data to books.json...')
    fs.writeFile(
      './server/resources/books.json',
      JSON.stringify(monitoringBooks),
      function (err) {
        if (err) {
          console.log(err)
        }
      }
    )

    console.log('Data saved')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
