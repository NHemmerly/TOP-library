/* eslint-disable no-unused-vars */
// Revised, Modularized js for TOP-library

const Library = (function () {

  let myLibrary = [];

  const bookCards = document.querySelector(".cards");
  const formInformation = document.querySelectorAll(".new-book");
  const progress = document.getElementById("progress");
  const pages = document.getElementById("pages");
  const submitBookForm = document.getElementById("submit");
  const dim = document.querySelector(".frost");
  const form = document.querySelector(".add-book-container");
  let updateId = null;

  submitBookForm.addEventListener("click", _validateForm);

  function _validateForm (e) {
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
      _addBookToLibrary();
    }
  }

  function _addBookToLibrary() {
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
  
      
      const newBook = Book(title, author, pages, genre, progress);
      
      myLibrary.push(newBook);
      newBook.id = myLibrary.indexOf(newBook);
      
      _displayBooks();
    }

  function _displayBooks () {
    bookCards.replaceChildren();
    for (const book of myLibrary){
      book.id = myLibrary.indexOf(book);
      _createBookElement(book, book.id);
    }
    _closeAddForm();
  }

  function deleteCard(e) {
    let deleteId = e.target.id;
    const card = document.getElementById(`${deleteId}`);
    myLibrary.splice(deleteId, 1);
    bookCards.removeChild(card);
    _displayBooks();
    console.log(myLibrary);
  }

  function openEditForm(e) {
    const openForm = document.getElementById('edit');
    updateId = e.target.previousElementSibling.id;
    openForm.style.display = "block";
    dim.style.display = "block";
  
  }
  const addBook = document.querySelector(".add-book");
  addBook.addEventListener("click", openAddForm);

  function openAddForm() {
    const openForm = document.querySelector('.add-book-form');
    openForm.style.display = "block";
    dim.style.display = "block";
  }

  function _closeAddForm(){
    const addBookForm = document.querySelector(".add-book-form");
    addBookForm.style.display = "none";
    dim.style.display = "none";
    form.reset();
  }

  function _createBookElement(book, bookId) {
    let completed = _determineCompletion(book);
    const newBookCard = elementFactory('div', bookCards, '', 'card', bookId);
    const bookPropList = elementFactory('ul', newBookCard, '', '', '');
    const bookTitle = elementFactory('li', bookPropList, `Title: ${book.title}`, '', '');
    const bookAuthor = elementFactory('li', bookPropList, `Author: ${book.author}`, '', '');
    const bookGenre = elementFactory('li', bookPropList, `Genre: ${book.genre}`, '', '');
    const bookPages = elementFactory('li', bookPropList, `Pages: ${book.pages}`, '', '');
    //Progress
    const bookProgress = elementFactory('li', bookPropList, '', '', '');
    //Delete Button
    const deleteList = elementFactory('li', bookPropList, '', '', '');
    const deleteButton = elementFactory('li', deleteList, 'Delete', 'delete-card', bookId);
    //Edit Button
    const editButton = elementFactory('button', deleteList, 'Edit', 'edit-card', 'edit');
    if (completed) {
      const completedText = elementFactory('h4', bookProgress, 'Completed!', 'book-complete', '');
    } else {
      const progressBar = elementFactory('progress', bookProgress, '', 'progress-bar', '');
      const progressLabel = elementFactory('label', bookProgress, `Progress: ${book.progress} / ${book.pages}`, '', '');
      progressBar.setAttribute("value", parseInt(book.progress));
      progressBar.setAttribute("max", parseInt(book.pages));
    }
    const deleteElement = document.querySelectorAll(".delete-card");
    const editProgress = document.querySelectorAll(".edit-card");
    deleteElement.forEach(del => del.addEventListener('click', deleteCard));
    editProgress.forEach(edit => edit.addEventListener('click', openEditForm));
  }
  
  function _determineCompletion(book) {
    if (book.pages === book.progress) {
      book.completed = true;
      return true;
    } else {
      book.completed = false;
      return false;
    }
  }

  return {_createBookElement};

  })();

const elementFactory = (type, parentName, content, className, id) => {
  'use strict';
  const el = document.createElement(type);
  el.innerText = content;
  el.className = className;
  el.id = id;
  parentName.appendChild(el);
  return {
    el,
    setParent(parentName) {
      parentName.appendChild(el);
    }
  };
};

const Book = (title, author, genre, pages, progress) => {
    return { title, author, genre, pages, progress};
};

