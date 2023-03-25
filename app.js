let myLibrary = [];
const label = document.createElement("div");
const bookList = document.getElementById("book-list");
const topRow = document.querySelector(".top-row");
const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", addBookToLibrary);

function Book(name, author, status) {
  (this.name = name), (this.author = author), (this.status = status);
}

function addBookToLibrary(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const author = document.getElementById("author").value;
  const status = document.getElementById("status").value;

  const book = new Book(name, author, status);

  myLibrary.push(book);
  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("status").selectedIndex = 0;

  if (myLibrary.length === 1) {
    bookList.removeChild(label);
    const headerRow = document.querySelector("tr");

    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    headerRow.appendChild(nameHeader);

    const authorHeader = document.createElement("th");
    authorHeader.textContent = "Author";
    headerRow.appendChild(authorHeader);

    const statusHeader = document.createElement("th");
    statusHeader.textContent = "Status";
    headerRow.appendChild(statusHeader);

    const deleteSection = document.createElement("th");
    headerRow.appendChild(deleteSection);
  }

  const bookRow = document.createElement("tr");
  bookList.appendChild(bookRow);

  const bookTitle = document.createElement("td");
  bookTitle.textContent = name;
  bookRow.appendChild(bookTitle);

  const bookAuthor = document.createElement("td");
  bookAuthor.textContent = author;
  bookRow.appendChild(bookAuthor);

  const bookStatus = document.createElement("td");
  bookStatus.textContent = status;
  bookRow.appendChild(bookStatus);
}

if (myLibrary.length === 0) {
  label.textContent =
    "You haven't added any books yet. Add books by entering the details above.";
  bookList.appendChild(label);
  label.classList.add("no-books");
}
