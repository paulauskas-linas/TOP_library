// modal thing

const modalBtn = document.querySelector(".add-new-book-btn")
const modal = document.querySelector(".modal")
const cancelBtn = document.querySelector(".cancelBtn")

modalBtn.addEventListener('click', () => {
    modal.style.display = "block"
});
cancelBtn.addEventListener('click', () => {
    closeModal();
});
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        closeModal();
    }
});

function closeModal(){
    modal.style.display = "none"
}
// book thing
let myLibrary = [];

class Book {
    constructor(title, author, pages, readStatus, color) {
        this.title = title
        this.author = author
        this.pages = pages
        this.readStatus = readStatus
        this.color = color
    }
}

function addBookToLibrary(title, author, pages, readStatus, color) {
    let newBook = new Book(title, author, pages, readStatus, color);
    myLibrary.push(newBook);
}
//GENERATE RANDOM COLOR
let randomColor = Math.floor(Math.random()*16777215).toString(16);
// "#" + randomColor
//on submit click, generate color and send it to book object
function generateColor() {
    return "#" + randomColor
}

//ADDING BOOK
//take info from the form
//add that info to new book object
//add new book to library
//SYNC

const form = document.querySelector("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const readStatus = formData.get('read-status');
    const color = generateColor();
    addBookToLibrary(title, author, pages, readStatus, color);
    closeModal();
    addBookToContainer();
})

//SYNCING LIBRARY WITH HTML
//add data-index att to #book div
//loop through library and create #book div's with book object properties
const bookContainer = document.querySelector('.books')

function addBookToContainer() {
    myLibrary.forEach((book, index) => {
        let bookCard = document.createElement('div');
        bookCard.setAttribute('class', "book-card");
        bookCard.setAttribute('data-index', index);
        bookCard.style.backgroundColor = book.color;
        let bookName = document.createElement('h2');
        bookName.textContent = book.title;
        bookCard.appendChild(bookName);
        let bookAuthor = document.createElement('h3');
        bookAuthor.textContent = book.author;
        bookCard.appendChild(bookAuthor);
        let bookPages = document.createElement('p');
        bookPages.textContent = book.pages;
        bookCard.appendChild(bookPages);
        let buttonsDiv = document.createElement('div');
        buttonsDiv.setAttribute('class', "button-group");
        let selectStatus = document.createElement('select');
        selectStatus.setAttribute('name', "status");
        selectStatus.setAttribute('id', "read-status");
        const statusArray = [
            {value: "Read", text: "Read"},
            {value: "Not-Read", text: "Not Read"}
        ];
        statusArray.forEach(i => selectStatus.add(new Option(i.text, i.value)))
        let removeBtn = document.createElement('button');
        removeBtn.setAttribute('class', "removeBtn");
        removeBtn.textContent = "Remove";
        buttonsDiv.appendChild(selectStatus);
        buttonsDiv.appendChild(removeBtn);
        bookCard.appendChild(buttonsDiv);
        bookContainer.appendChild(bookCard);
        book.readStatus == "Read" ? selectStatus.value = "Read" : selectStatus.value = "Not-Read";
    })
}

//REMOVE BOOK
//add listener to all remove buttons
//use targets parent's parent's data-index to remove from library
//SYNC library 

//CHANGE STATUS
//add listener to all select buttons
//use targets parent's parent's data-index to change status in library
//SYNC library 