const needle = require('needle')

function getBookContentUrl(id) {
  return `https://api.author.today/v1/work/${id}/content`
}

function getBookMetaInfoUrl(id) {
  return `https://api.author.today/v1/work/${id}/meta-info`
}

const request_header = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
  Cookie:
    '_ga=GA1.2.683644711.1612529204; _ym_uid=1612529204758287198; _ym_d=1612529204; __cfduid=d7edca785fb49a21185421dc7ab74e6f11615125546; _gid=GA1.2.1323336028.1615376373; _fbp=fb.1.1615448135153.1288588928; cf_clearance=25b984ef4c48adf6efc5d7da5ea1e1ec00e68912-1615449411-0-150; _ym_isad=1; __cfduid=dee5050932f10473f55bb1e4abd89a9e21615125063',
  Authorization: 'Bearer guest'
}

async function getLastChapterOfBook(bookId) {
  const bookContentUrl = getBookContentUrl(bookId)
  const response = await needle('get', bookContentUrl, {
    headers: { ...request_header },
    redirect: 'follow'
  })

  return response.body.pop()
}

async function getBookInfo(bookId) {
  const bookMetaInfoUrl = getBookMetaInfoUrl(bookId)
  const response = await needle('get', bookMetaInfoUrl, {
    headers: { ...request_header },
    redirect: 'follow'
  })

  return response.body
}

function getLastCheckedBooks() {
  return lastCheckedBooks
}

module.exports.getBookInfo = getBookInfo
module.exports.getLastChapterOfBook = getLastChapterOfBook
