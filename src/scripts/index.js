let booksDisplay = document.querySelector(".books-display");

let library = [];

function Book(name, author) {
  if (!new.target) {
    throw Error("You may use 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
}

function addBookToLibrary(name, author) {
  library.push(new Book(name, author));

  renderBookCards();
}

function renderBookCards() {
  booksDisplay.innerHTML = "";

  for (let i = 0; i < library.length; i++) {
    const book = library[i];

    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookInfo = document.createElement("ul");

    bookTitle.innerText = book.name;

    Object.keys(book).forEach((key) => {
      if (key === "id" || key === "name") return;

      const info = document.createElement("li");
      info.innerText = `${key}: ${book[key]}`;
      bookInfo.appendChild(info);
    });

    bookCard.classList.toggle("book-card");
    bookCard.append(bookTitle, bookInfo);

    booksDisplay.appendChild(bookCard);
  }
}

addBookToLibrary("Harry Potter", "J.K Rolling");
addBookToLibrary("Harry Potter 2", "J.K Rolling");
addBookToLibrary("Harry Potter 3", "J.K Rolling");
addBookToLibrary("Harry Potter 4", "J.K Rolling");
