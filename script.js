// Javascript for TOP-library


const form = document.querySelector(".add-book-container");
const submitBookForm = document.getElementById("submit");
const formInformation = document.querySelectorAll(".new-book");
const bookCards = document.querySelector(".cards");

const progress = document.getElementById("progress");
const pages = document.getElementById("pages");

let myLibrary = [];

//Book Constructor
function Book(title, author, pages, genre, progress) {
  this.id = undefined;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.progress = progress;
  this.completed = false;
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
    progressBar.setAttribute("value", parseInt(book.progress));
    progressBar.setAttribute("max", parseInt(book.pages));
    const progressLabel = document.createElement('label');
    progressLabel.innerText += `Progress: ${book.progress} / ${book.pages}`;
    const deleteList = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.innerText += "Delete";
    deleteButton.className = ('delete-card');
    deleteButton.id = (`${bookId}`);
    const editButton = document.createElement('button');
    editButton.innerText += "Edit";
    editButton.className = ('edit-card')
    editButton.id = ("edit");
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
    deleteList.appendChild(editButton);
    const deleteElement = document.querySelectorAll(".delete-card");
    const editProgress = document.querySelectorAll(".edit-card");
    deleteElement.forEach(del => del.addEventListener('click', deleteCard));
    editProgress.forEach(edit => edit.addEventListener('click', openEditForm));
  }
  
  //Creates an array of all cards that represent books
  
  function displayBooks () {
    bookCards.replaceChildren();
    for (const book of myLibrary){
      book.id = myLibrary.indexOf(book);
      createBookElement(book, book.id);
    }
    closeAddForm();
  }
  
  //Functions for closing and opening forms
const dim = document.querySelector(".frost");

//Create separate function for opening different forms
function openAddForm() {
  const openForm = document.getElementById('add');
  openForm.style.display = "block";
  dim.style.display = "block";
}

function openEditForm() {
  const openForm = document.getElementById('edit');
  openForm.style.display = "block";
  dim.style.display = "block";

}

//Functions for closing either form
const cancelBookForm = document.getElementById("edit-cancel");
function closeForm() {
  const closeForm = document.getElementById('edit');
  closeForm.style.display = "none";
  dim.style.display = "none";
  form.reset();
}

function closeAddForm(){
  const addBookForm = document.querySelector(".add-book-form");
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

function editCard(e) {
  let editId = e.target.id;
  const card = document.getElementById(`${editId}`);

}

const addBook = document.querySelector(".add-book");
addBook.addEventListener("click", openAddForm);
cancelBookForm.addEventListener("click", closeForm);
submitBookForm.addEventListener("click", validateForm);

