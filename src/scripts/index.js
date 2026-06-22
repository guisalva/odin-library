let library = [];

const booksDisplay = document.querySelector(".books-display");
const dialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");

function Book(name, author, pages, read) {
  if (!new.target) {
    throw Error("You may use 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
  library.push(new Book(name, author, pages, read));

  renderBookCards();
}
function deleteBook(id) {
  library = library.filter((book) => book.id !== id);
}
function toggleBookRead(id) {
  const book = library.find((book) => book.id === id);

  if (book) {
    book.read = !book.read;
  }
}

function renderBookCards() {
  booksDisplay.innerHTML = "";

  for (let i = 0; i < library.length; i++) {
    const book = library[i];

    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookInfo = document.createElement("ul");
    const bookActions = document.createElement("div");

    bookTitle.innerText = book.name;

    Object.keys(book).forEach((key) => {
      if (key === "id" || key === "name") return;

      const info = document.createElement("li");
      info.innerText = `${key}: ${book[key]}`;
      bookInfo.appendChild(info);
    });

    bookActions.classList.toggle("book-actions");
    bookActions.innerHTML = `
    <button type="button" data-action="delete" class="delete-btn">
      <img src="./assets/trash.svg" alt="delete-icon" />
    <button> 
    <button type="button" data-action="toggle-read" class="btn">
      <img src="../src/assets/book-open-check.svg" alt="toggle-read-icon" />
    <button>`;

    bookCard.classList.toggle("book-card");
    bookCard.setAttribute("data-id", book.id);
    bookCard.append(bookTitle, bookInfo, bookActions);

    booksDisplay.appendChild(bookCard);
  }
}
function resetForm() {
  bookForm.reset();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const newBook = {
    name: formData.get("name"),
    author: formData.get("author"),
    pages: formData.get("pages"),
    read: formData.get("read") ? true : false,
  };

  addBookToLibrary(newBook.name, newBook.author, newBook.pages, newBook.read);

  dialog.close();
  resetForm();
}
function handleActionButtonClick(e) {
  const actionBtn = e.target.closest("button[data-action]");

  if (!actionBtn) return;

  const action = actionBtn.dataset.action;
  const id = actionBtn.closest(".book-card").dataset.id;

  switch (action) {
    case "delete":
      deleteBook(id);
      break;

    case "toggle-read":
      toggleBookRead(id);
      break;
  }

  renderBookCards();
}

document.getElementById("open-dialog").addEventListener("click", () => {
  dialog.showModal();
});
document.getElementById("cancel-btn").addEventListener("click", () => {
  dialog.close();
  resetForm();
});

bookForm.addEventListener("submit", handleFormSubmit);
booksDisplay.addEventListener("click", handleActionButtonClick);
