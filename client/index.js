const books = document.getElementById('books')
const socket = io()
socket.on('connect', () => {
  console.log('Connect to server')
})

socket.on('old_data', book => {
  const bookData = getDataFromBook(book)
  const bookElement = getBookElement(books, bookData.id)
  updateBookElement(bookElement, bookData)
})

function getDataFromBook(book) {
  return {
    id: book.id,
    coverUrl: book.coverUrl,
    title: book.title,
    author: book.author,
    modifiedOn: getFormatedModified(book)
  }
}

function getFormatedModified(book) {
  return `${(() => {
    const date = new Date(book.modifiedOn)
    return date.toLocaleDateString()
  })()}`
}

function getBookElement(books, id) {
  let bookElement = document.getElementById(id)
  if (!bookElement) {
    bookElement = document.createElement('div')
    bookElement.className = 'card mb-1 w-50'
    bookElement.innerHTML = `
          <div class="row g-0">
            <div class="col-md-1">
              <img src="" alt="Book cover" width="100%"  id="book-cover">
            </div>
            <div class="col-md-10">
              <div class="card-body py-1">
                <div><strong class="card-title" id="book-title"></strong></div>
                <div><i class="card-subtitle my-1 text-muted" id="book-author"></i></div>
                <sub class="card-subtitle my-1 text-muted"  id="book-modifiedOn"></sub>
              </div>
            </div>
          </div>`
    books.appendChild(bookElement)
  }

  return bookElement
}

function updateBookElement(book, bookData) {
  book.querySelector('#book-cover').src = bookData.coverUrl
  book.querySelector('#book-title').textContent = bookData.title
  book.querySelector('#book-author').textContent = bookData.author
  book.querySelector('#book-modifiedOn').textContent = bookData.modifiedOn
}
