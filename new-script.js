// Revised, Modularized js for TOP-library

const Library = (function () {
  'use strict'

  let myLibrary = [];

  const Book = (title, author, genre, pages, progress) => {
      return { title, author, genre, pages, progress};
  };

  const bookCards = document.querySelector(".cards");
  const formInformation = document.querySelectorAll(".new-book");
  const progress = document.getElementById("progress");
  const pages = document.getElementById("pages");
  const submitBookForm = document.getElementById("submit");

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

  function _createBookElement(book, bookId) {
    let completed = _determineCompletion(book);
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
    //Progress
    const completedText = document.createElement('h4');
    const bookProgress = document.createElement('li');
    const progressBar = document.createElement('progress')
    const progressLabel = document.createElement('label');
    //Delete Button
    const deleteList = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.innerText += "Delete";
    deleteButton.className = ('delete-card');
    deleteButton.id = (`${bookId}`);
    //Edit Button
    const editButton = document.createElement('button');
    editButton.innerText += "Edit";
    editButton.className = ('edit-card')
    editButton.id = ("edit");
    if (completed) {
      completedText.className = ('book-complete');
      completedText.innerText = "Completed!";
    } else {
      progressBar.className = 'progress-bar';
      progressBar.setAttribute("value", parseInt(book.progress));
      progressBar.setAttribute("max", parseInt(book.pages));
      progressLabel.innerText += `Progress: ${book.progress} / ${book.pages}`;
    }
  
    bookTitle.innerText += `Title: ${book.title}`;
    bookAuthor.innerText += `Author: ${book.author}`;
    bookGenre.innerText += `Genre: ${book.genre}`;
    bookPages.innerText += `Pages: ${book.pages}`;
    
    bookPropList.appendChild(bookTitle);
    bookPropList.appendChild(bookAuthor);
    bookPropList.appendChild(bookPages);
    bookPropList.appendChild(bookGenre);
    bookPropList.appendChild(bookProgress);
    if (completed) {
      bookProgress.appendChild(completedText);
    } else {
      bookProgress.appendChild(progressLabel);
      bookProgress.appendChild(progressBar);
    }
    bookPropList.appendChild(deleteList);
    deleteList.appendChild(deleteButton);
    deleteList.appendChild(editButton);
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

  })();