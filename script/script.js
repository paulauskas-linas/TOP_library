// MODAL INPUT POP UP
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
// LIBRARY ARRAY AND BOOK CONSTRUCTOR
let myLibrary = [];
class Book {
    constructor(id, title, author, pages, readStatus, color) {
        this.id = id
        this.title = title
        this.author = author
        this.pages = pages
        this.readStatus = readStatus
        this.color = color
    }
}

//GENERATE RANDOM COLOR
function generateColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ", 0.6)"
}
// GENERATE UNIQUE ID (sort of)
// https://stackoverflow.com/a/34168882

function uniqueId() {
    let idStrLen = 20;
    let idStr = (Math.floor((Math.random() * 25)) + 10).toString(36) + "_";
    idStr += (new Date()).getTime().toString(36) + "_";
    do {
        idStr += (Math.floor((Math.random() * 35))).toString(36);
    } while (idStr.length < idStrLen);
    return (idStr);
}

//ADD BOOK TO LIBRARY
function addBookToLibrary(id, title, author, pages, readStatus, color) {
    let newBook = new Book(id, title, author, pages, readStatus, color);
    myLibrary.push(newBook);
}

const form = document.querySelector("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const readStatus = formData.get('read-status');
    const color = generateColor();
    const id = uniqueId();
    addBookToLibrary(id, title, author, pages, readStatus, color);
    closeModal();
    addBookToContainer();
    form.reset();
})

//SYNC LIBRARY WITH HTML
const bookContainer = document.querySelector('.books')

function getBookDivIds() {
    const bookCards = [...document.querySelectorAll('.book-card')].map(el => el.dataset.id).reduce((filtered, id) => {
            if(id != undefined) {
                filtered.push(id);
            }
            return filtered;
        }, []
        )
    return bookCards;    
}

function addBookToContainer() {
    bookCardsIdList = getBookDivIds();
    myLibrary.forEach((book) => {
        if(bookCardsIdList.some(id => id != book.id)){
            //BOOK CARD
            let bookCard = document.createElement('div');
            bookCard.setAttribute('class', "book-card");
            bookCard.setAttribute('data-id', book.id);
            bookCard.style.backgroundColor = book.color;
            //BOOK NAME
            let bookName = document.createElement('h2');
            bookName.textContent = book.title;
            bookCard.appendChild(bookName);
            //BOOK AUTHOR
            let bookAuthor = document.createElement('h3');
            bookAuthor.textContent = book.author;
            bookCard.appendChild(bookAuthor);
            //BOOK PAGES
            let bookPages = document.createElement('p');
            bookPages.textContent = book.pages;
            bookCard.appendChild(bookPages);
            //BUTTONS
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
            //APPEND 
            buttonsDiv.appendChild(selectStatus);
            buttonsDiv.appendChild(removeBtn);
            bookCard.appendChild(buttonsDiv);
            bookContainer.appendChild(bookCard);
            //SET SELECT OPTION
            book.readStatus == "Read" ? selectStatus.value = "Read" : selectStatus.value = "Not-Read";
            //LISTENERS
            removeBtn.addEventListener('click', (e) => {
                removeBook(e)
            })
            selectStatus.addEventListener('change', (e) => {
                changeStatus(e)
            })
        }
    })
}

//REMOVE BOOK
function removeBook(e) {
    const childToBeRemoved = e.target.parentNode.parentNode;
    const index = myLibrary.findIndex(id => id == childToBeRemoved.dataset.id);
    myLibrary.splice(index, 1);
    bookContainer.removeChild(childToBeRemoved);
}

//CHANGE STATUS
function changeStatus(e) {
    const bookToBeUpdated = e.target.parentNode.parentNode;
    const bookId = bookToBeUpdated.dataset.id;
    const currentBook = myLibrary.find(book => book.id == bookId);
    currentBook.readStatus = e.target.value;
}