// Javascript for TOP-library

const addBookForm = document.querySelector(".add-book-form");
const cancelBookForm = document.getElementById("cancel");
const submitBookForm = document.getElementById("submit");
const dim = document.querySelector(".frost");
const formInformation = document.querySelectorAll("input");

let myLibrary = [];

function Book(title, author, pages, genre, progress) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.progress = progress;
}

function addBookToLibrary() {
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

  closeForm();
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
