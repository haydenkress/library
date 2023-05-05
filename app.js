function initializeLibrary() {
  let library = [];

  function createBook(title, author, status) {
    return { title, author, status };
  }

  function saveToLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
  }

  function loadFromLocalStorage() {
    const books = JSON.parse(localStorage.getItem("library"));
    if (books) {
      library = books.map((bookData) => {
        const book = createBook(
          bookData.title,
          bookData.author,
          bookData.status
        );
        return book;
      });
    } else {
      library = [];
    }
    return library;
  }

  function loadProjects() {
    const books = loadFromLocalStorage();
    noBookWarning();

    books.forEach((book) => {
      addBookToDOM(book);
    });
  }

  function handleSubmit(event) {
    const form = document.querySelector("form");
    event.preventDefault(); // prevent form from submitting

    if (form.checkValidity()) {
      const book = generateBook();
      addBookToDOM(book);
      noBookWarning();
      form.reset();
    } else {
      form.reportValidity();
    }
  }

  function generateBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const status = document.getElementById("status").value;

    const book = createBook(title, author, status);
    library.push(book);
    saveToLocalStorage();
    return book;
  }

  function deleteBook(bookName) {
    const bookToDelete = library.find((book) => book === bookName);
    library.splice(library.indexOf(bookToDelete), 1);
    saveToLocalStorage();
  }

  function addBookToDOM(book) {
    const bookList = document.getElementById("book-list");
    const bookRow = document.createElement("div");
    bookRow.classList.add("book-row");

    const titleCell = document.createElement("div");
    titleCell.textContent = book.title;
    bookRow.appendChild(titleCell);

    const authorCell = document.createElement("div");
    authorCell.textContent = book.author;
    bookRow.appendChild(authorCell);

    const statusCell = document.createElement("div");
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

    statusSelect.appendChild(notRead);
    statusSelect.appendChild(inProgress);
    statusSelect.appendChild(completed);
    statusSelect.appendChild(didNotFinish);

    statusSelect.value = book.status;

    statusCell.appendChild(statusSelect);
    bookRow.appendChild(statusCell);

    statusSelect.addEventListener("change", () => {
      book.status = statusSelect.value;
      saveToLocalStorage();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      deleteBook(book);
      bookRow.remove();
      saveToLocalStorage();
      noBookWarning();
    });
    bookRow.append(deleteButton);

    bookList.append(bookRow);
  }

  function noBookWarning() {
    const noBooks = document.querySelector(".no-book-warning-div");
    if (library.length !== 0) {
      noBooks.textContent = "";
    } else {
      noBooks.textContent =
        "You haven't added any books yet. Add books by entering the details above.";
    }
  }

  window.addEventListener("load", () => {
    loadProjects();
    const submitBtn = document.getElementById("submit-button");

    submitBtn.addEventListener("click", handleSubmit);
  });
}

initializeLibrary();
