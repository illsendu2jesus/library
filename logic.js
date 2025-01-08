

const books = [];

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.fav  = false;
}

function addBookToArray(book){
    

    // Destructure the book array for clarity
    const [title, author, pages, read] = book;

    // Create a new Book object
    const newBook = new Book(title, author, pages, read);

    // Add the new book to the books array
    books.push(newBook);

    displayBooks(title, author, pages, read);

    console.log("Book added:", newBook);
}

function displayBooks(title, author, pages, read){
    let shelf = document.querySelector('.container');

    let card = document.createElement('div')

    card.classList.add('card');

    card.id = books.length-1;

    let titulo = document.createElement('p')
    titulo.textContent = `Title:${title}`;

    
    let autora = document.createElement('p')
    autora.textContent = `Author:${author}`;

    let paginas =document.createElement('p')
    paginas.textContent = `Pages:${pages}`;

    let leido =document.createElement('p');
    leido.textContent = `Read:${read}`;

    let info = document.createElement('div');
    info.classList.add('info');

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let like = document.createElement('button');
    like.classList.add('fav');
    like.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cards-heart</title><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>'


    info.appendChild(titulo);
    info.appendChild(autora);
    info.appendChild(paginas);
    info.appendChild(leido);

    buttons.appendChild(like);

    card.appendChild(info);
    card.appendChild(buttons);

    shelf.appendChild(card);

}

let add = document.querySelector('.add');
let dialog = document.querySelector('dialog')
let submit = document.querySelector('.submit');

let title = document.getElementById('title')
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.getElementById('read');


add.addEventListener('click',()=>{
    dialog.showModal();
})


dialog.addEventListener('close',()=>{
    let book = dialog.returnValue.split(',');
    addBookToArray(book);
})


submit.addEventListener('click',(e)=>{
    e.preventDefault();
    dialog.close([title.value, author.value, pages.value, read.value]);
})

