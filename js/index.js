let myLibrary = [];
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#readStatus');
const row = document.querySelector('.row');
const container = document.querySelector('.container');

function saveLocal() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function changeStatus(e) {
  if (e.target.textContent === 'Read') {
    e.target.textContent = 'Not Read';
  } else {
    e.target.textContent = 'Read';
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function createCard(book) {
  const column = document.createElement('div');
  column.className = 'mb-3 col-6';

  const card = document.createElement('div');
  card.className = 'shadow card';

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = book.title;

  const subTitle = document.createElement('h6');
  subTitle.className = 'card-subtitle mb-2 text-muted';
  subTitle.textContent = book.author;

  const cardPages = document.createElement('p');
  cardPages.classList.add('card-text');
  cardPages.textContent = `${book.pages} pages`;

  const bookRead = document.createElement('button');
  bookRead.className = 'btn btn-secondary mr-3';
  bookRead.addEventListener('click', changeStatus);
  if (book.read) {
    bookRead.textContent = 'Read';
  } else {
    bookRead.textContent = 'Not Read';
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.className = 'btn btn-danger';
  deleteBtn.textContent = 'Delete Book';
  deleteBtn.addEventListener('click', deleteBook);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(subTitle);
  cardBody.appendChild(cardPages);
  cardBody.appendChild(bookRead);
  cardBody.appendChild(deleteBtn);
  card.appendChild(cardBody);
  column.appendChild(card);
  row.appendChild(column);
}

function deleteBook(e) {
  const bookIndex = myLibrary.indexOf(e.target);
  myLibrary.splice(bookIndex, 1);
  saveLocal();
  e.target.offsetParent.parentElement.remove();
}

function resetList() {
  row.innerHTML = '';
}

function newBook() {
  resetList();
  myLibrary.forEach((book) => {
    createCard(book);
  });
}

function restoreLocal() {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  if (myLibrary === null) myLibrary = [];
  newBook();
}

function cleanInputs() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

function createAlertDiv(klass) {
  const warning = document.createElement('div');
  warning.className = `alert alert-${klass} alert-dismissible fade show`;
  warning.setAttribute('role', 'alert');
  if (klass === 'danger') {
    warning.textContent = "Your book wasn't created! Please fill in the form correctly!";
  } else {
    warning.textContent = 'Your book has been successfully created!';
  }
  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn-close';
  closeBtn.setAttribute('type', 'button');
  closeBtn.setAttribute('data-bs-dismiss', 'alert');
  closeBtn.setAttribute('aria-label', 'close');
  warning.appendChild(closeBtn);
  container.appendChild(warning);
}

function addBookToLibrary() {
  if (title.value === '' || author.value === '' || pages.value === '') {
    createAlertDiv('danger');
    restoreLocal();
  } else {
    const book = new Book(title.value, author.value, pages.value, read.checked);
    myLibrary.push(book);
    saveLocal();
    newBook();
    createAlertDiv('success');
    cleanInputs();
  }
}

const btn = document.querySelector('#createBtn');
btn.addEventListener('click', addBookToLibrary);

restoreLocal();
