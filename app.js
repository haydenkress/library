// main array
const myLibrary = [];

// no book warning
const noBooks = document.createElement("div");
noBooks.classList.add("no-books");
const noBookWarningSpot = document.querySelector(".no-book-warning-div");
noBookWarning();

// book table
const bookList = document.getElementById("book-list");
const form = document.querySelector("form");

// constructor
function Book(title, author, status) {
  (this.title = title), (this.author = author), (this.status = status);
}

function handleSubmit(event) {
  event.preventDefault(); // prevent form from submitting

  if (form.checkValidity()) {
    createBook();
  } else {
    form.reportValidity();
  }
}

function createBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const status = document.getElementById("status").value;

  const book = new Book(title, author, status);

  myLibrary.push(book);
  form.reset();
  addBookToLibrary(book);
  noBookWarning();
}

function addBookToLibrary(book) {
  book.index = myLibrary.length - 1;
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
  const statusCell = document.createElement("td");
  const statusSelect = document.createElement("select");

  const notRead = document.createElement("option");
  notRead.value = "not-read";
  notRead.text = "Not Started";
  const inProgress = document.createElement("option");
  inProgress.value = "in-progress";
  inProgress.text = "In Progress";
  const completed = document.createElement("option");
  completed.value = "completed";
  completed.text = "Completed";
  const didNotFinish = document.createElement("option");
  didNotFinish.value = "did-not-finish";
  didNotFinish.text = "DNF";
  statusSelect.value = book.status;
  statusSelect.appendChild(notRead);
  statusSelect.appendChild(inProgress);
  statusSelect.appendChild(completed);
  statusSelect.appendChild(didNotFinish);
  if (book.status === "not-read") {
    notRead.selected = true;
  } else if (book.status === "in-progress") {
    inProgress.selected = true;
  } else if (book.status === "completed") {
    completed.selected = true;
  } else if (book.status === "did-not-finish") {
    didNotFinish.selected = true;
  }

  statusSelect.addEventListener("change", () => {
    book.status = statusSelect.value;
  });
  statusCell.appendChild(statusSelect);
  bookRow.appendChild(statusCell);

  // Add a delete button to the row
  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    myLibrary.splice(book.index, 1);
    bookRow.remove();
    for (let i = book.index; i < myLibrary.length; i++) {
      myLibrary[i].index--;
    }

    noBookWarning();
  });
  deleteCell.appendChild(deleteButton);
  bookRow.appendChild(deleteCell);

  // Add the new row to the book list
  bookList.appendChild(bookRow);
}

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
