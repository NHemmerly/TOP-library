// Javascript for TOP-library

const addBookForm = document.querySelector(".add-book-form");
const cancelBookForm = document.getElementById("cancel");
const dim = document.querySelector(".frost");

let myLibrary = [];

function Book(title, author, pages, genre, progress) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.progress = progress;
}

function addBookToLibrary() {}

function openForm() {
    addBookForm.style.display = 'block';
    dim.style.display = 'block';
}

function closeForm() {
    addBookForm.style.display = 'none';
    dim.style.display = 'none';
}

const addBook = document.querySelector(".add-book");
addBook.addEventListener('click', openForm);
cancelBookForm.addEventListener('click', closeForm);
