// main array
const myLibrary = [];

// no book warning
const noBooks = document.createElement("div");
noBooks.classList.add("no-books");
const noBookWarningSpot = document.querySelector(".no-book-warning-div");
if (myLibrary.length >= 0) {
  noBookWarning();
}

// book table
const bookList = document.getElementById("book-list");
const form = document.querySelector("form");

function noBookWarning() {
  if (myLibrary.length === 0) {
    noBooks.textContent =
      "You haven't added any books yet. Add books by entering the details above.";
    noBookWarningSpot.appendChild(noBooks);
  } else {
    if (noBookWarningSpot.contains(noBooks)) {
      noBookWarningSpot.removeChild(noBooks);
    }
  }
}

function Book(name, author, status) {
  (this.name = name), (this.author = author), (this.status = status);
}

function handleSubmit(event) {
  event.preventDefault(); // prevent form from submitting

  if (form.checkValidity()) {
    createBook(event);
  } else {
    form.reportValidity();
  }
}

function createBook() {
  const name = document.getElementById("name").value;
  const author = document.getElementById("author").value;
  const status = document.getElementById("status").value;

  const book = new Book(name, author, status);

  myLibrary.push(book);

  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("status").selectedIndex = 0;

  addBookToLibrary(myLibrary);
  noBookWarning();
}

function addBookToLibrary(myLibrary) {
  myLibrary.forEach((book, index) => {
    const bookRow = document.createElement("tr");
    bookList.appendChild(bookRow);

    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;
    bookRow.appendChild(titleCell);

    // Add the book author to the row
    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    bookRow.appendChild(authorCell);

    // Add the book read status to the row
    const readCell = document.createElement("td");
    readCell.textContent = book.read ? "Yes" : "No";
    bookRow.appendChild(readCell);

    // Add a delete button to the row
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      // Remove the book from the array
      myLibrary.splice(index, 1);
      // Remove the row from the table
      bookRow.remove();
      noBookWarning();
    });
    deleteCell.appendChild(deleteButton);
    bookRow.appendChild(deleteCell);

    // Add the new row to the book list
    bookList.appendChild(bookRow);
  });
}
