// Javascript for TOP-library

const addBookForm = document.querySelector(".add-book-form");
const form = document.querySelector(".add-book-container");
const cancelBookForm = document.getElementById("cancel");
const submitBookForm = document.getElementById("submit");
const dim = document.querySelector(".frost");
const formInformation = document.querySelectorAll("input");
const bookCards = document.querySelector(".cards");

let myLibrary = [];
let bookId = 0;

//Book Constructor
function Book(title, author, pages, genre, progress) {
  this.id = bookId++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.progress = progress;
}

//Create new books using user input and push it to library 
function addBookToLibrary(e) {
  e.preventDefault();
  let infoArray = Array.from(formInformation).reduce(
    (acc, input) => ({ ...acc, [input.id]: input.value }),
    {}
  );

  let title = infoArray.title;
  let author = infoArray.author;
  let pages = infoArray.pages;
  let genre = infoArray.genre;
  let progress = infoArray.progress;

  const newBook = new Book(title, author, pages, genre, progress);
  newBook.prototype = Object.create(Book.prototype);

  myLibrary.push(newBook);

  console.log(newBook.title);

  displayBooks();
  form.reset();
  closeForm();
}

//Creates DOM element for each new book 
function createBookElement(book, bookId) {
  const newBookCard = document.createElement('div');
  const bookPropList = document.createElement('ul');
  newBookCard.className = ('card');
  newBookCard.id = (`${bookId}`);
  bookCards.appendChild(newBookCard);
  newBookCard.appendChild(bookPropList);
  const bookTitle = document.createElement('li');
  const bookAuthor = document.createElement('li');
  const bookPages = document.createElement('li');
  const bookGenre = document.createElement('li');
  const bookProgress = document.createElement('li');
  const deleteList = document.createElement('li');
  const deleteButton = document.createElement('button');
  deleteButton.className = ('delete-card');
  bookTitle.innerText += `Title: ${book.title}`;
  bookAuthor.innerText += `Author: ${book.author}`;
  bookPages.innerText += `Pages: ${book.pages}`;
  bookGenre.innerText += `Genre: ${book.genre}`;
  bookProgress.innerText += `Progress: ${book.progress}`;

  bookPropList.appendChild(bookTitle);
  bookPropList.appendChild(bookAuthor);
  bookPropList.appendChild(bookPages);
  bookPropList.appendChild(bookGenre);
  bookPropList.appendChild(bookProgress);
  bookPropList.appendChild(deleteList);
  deleteList.appendChild(deleteButton);
}

//Creates an array of all cards that represent books
function checkIds () {
  const allBooks = document.querySelectorAll(".card");
  let cardIds = [].slice.call(allBooks)
  .map(function (el) {return parseInt(el.id);});
  return cardIds;
}

function displayBooks () {
  let ids = checkIds();
  for (const book of myLibrary){
    if (!(ids.includes(book.id))) {
      createBookElement(book, book.id);
    }
  }
}

//Functions for closing and opening forms

function openForm() {
  addBookForm.style.display = "block";
  dim.style.display = "block";
}

function closeForm() {
  addBookForm.style.display = "none";
  dim.style.display = "none";
}

const addBook = document.querySelector(".add-book");
addBook.addEventListener("click", openForm);
cancelBookForm.addEventListener("click", closeForm);
submitBookForm.addEventListener("click", addBookToLibrary);
