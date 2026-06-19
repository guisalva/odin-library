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
}

addBookToLibrary("Harry Potter", "J.K Rolling");
addBookToLibrary("Harry Potter 2", "J.K Rolling");
addBookToLibrary("Harry Potter 3", "J.K Rolling");
addBookToLibrary("Harry Potter 4", "J.K Rolling");

console.log(library);
