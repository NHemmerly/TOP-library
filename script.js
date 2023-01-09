// Javascript for TOP-library

const addBookForm = document.querySelector(".add-book-form");
const form = document.querySelector(".add-book-container");
const cancelBookForm = document.getElementById("cancel");
const submitBookForm = document.getElementById("submit");
const formInformation = document.querySelectorAll("input");
const bookCards = document.querySelector(".cards");

let myLibrary = [];

//Book Constructor
function Book(title, author, pages, genre, progress) {
  this.id = undefined;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.progress = progress;
}

//Function for additional form validations
function validateForm (e) {
  let validationFails = 0;
  progress.setAttribute("max", parseInt(pages.value));
  formInformation.forEach(input => {
    if (input.value === '' && input.id != 'genre') {
      validationFails++;
    } else if (parseInt(progress.value) > parseInt(pages.value)) {
      validationFails++;
    }
  })
  
  if (validationFails === 0) {
    e.preventDefault();
    addBookToLibrary();
  }
}

function addRequiredText () {
  const requiredText = document.getElementById("required");
  requiredText.innerText = "*Please fill out required fields.";
}

//Function for setting the max input of progress to the value of pages
const progress = document.getElementById("progress");
const pages = document.getElementById("pages");



//Create new books using user input and push it to library 
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
    
    if (genre === '') {
      genre = 'N/A';
    }
    
    const newBook = new Book(title, author, pages, genre, progress);
    newBook.prototype = Object.create(Book.prototype);
    
    myLibrary.push(newBook);
    newBook.id = myLibrary.indexOf(newBook);
    
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
    const bookGenre = document.createElement('li');
    const bookPages = document.createElement('li');
    const bookProgress = document.createElement('li');
    const progressBar = document.createElement('progress')
    progressBar.className = 'progress-bar';
    progressBar.setAttribute("value", parseInt(progress.value));
    progressBar.setAttribute("max", parseInt(pages.value));
    const progressLabel = document.createElement('label');
    progressLabel.innerText += `Progress: ${progress.value} / ${pages.value}`;
    const deleteList = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.innerText += "Delete";
    deleteButton.className = ('delete-card');
    deleteButton.id = (`${bookId}`);
    bookTitle.innerText += `Title: ${book.title}`;
    bookAuthor.innerText += `Author: ${book.author}`;
    bookGenre.innerText += `Genre: ${book.genre}`;
    bookPages.innerText += `Pages: ${book.pages}`;
    
    bookPropList.appendChild(bookTitle);
    bookPropList.appendChild(bookAuthor);
    bookPropList.appendChild(bookPages);
    bookPropList.appendChild(bookGenre);
    bookPropList.appendChild(bookProgress);
    bookProgress.appendChild(progressLabel);
    bookProgress.appendChild(progressBar);
    bookPropList.appendChild(deleteList);
    deleteList.appendChild(deleteButton);
    const deleteElement = document.querySelectorAll(".delete-card");
    deleteElement.forEach(del => del.addEventListener('click', deleteCard));
  }
  
  //Creates an array of all cards that represent books
  
  function displayBooks () {
    bookCards.replaceChildren();
    for (const book of myLibrary){
      book.id = myLibrary.indexOf(book);
      createBookElement(book, book.id);
    }
  }
  
  //Functions for closing and opening forms
const dim = document.querySelector(".frost");
  
function openForm() {
  addBookForm.style.display = "block";
  dim.style.display = "block";
}

function closeForm() {
  addBookForm.style.display = "none";
  dim.style.display = "none";
  form.reset();
}

function deleteCard(e) {
  let deleteId = e.target.id;
  const card = document.getElementById(`${deleteId}`);
  myLibrary.splice(deleteId, 1);
  bookCards.removeChild(card);
  displayBooks();
  console.log(myLibrary);
}

const addBook = document.querySelector(".add-book");
addBook.addEventListener("click", openForm);
cancelBookForm.addEventListener("click", closeForm);
submitBookForm.addEventListener("click", validateForm);

