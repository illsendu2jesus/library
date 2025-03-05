

const books = [];


class Book{
    constructor(title,author,pages,read){
        this.title = title;
        this.author  =author;
        this.pages = pages;
        this.read = read;
    }

    updateRead(newVal){
        this.read = newVal;
    }
}





/*Book.prototype.updateRead = function(newVal){
    this.read = newVal;
}*/

function addBookToArray(book){
    

    // Destructure the book array for clarity
    const [title, author, pages, read] = book;

    // Create a new Book object
    const newBook = new Book(title, author, pages, read);

    // Add the new book to the books array
    books.push(newBook);

    //console.log(books);

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

    //couldn't add an Event Listener later beacuse buttons are dynamically created as a result there are not yet present on the page so the NOde list stays empty,thus I should ttach them here
    // Event Dlegation is another useful method to do so ,maybe better


    let like = document.createElement('button');
    like.classList.add('fav');
    like.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cards-heart</title><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>';
    like.addEventListener('click',()=>{
        //console.log(like.parentElement.parentElement.id);
        let path = like.querySelector('path');
        manageFavorites(like.parentElement.parentElement.id, path);

    })


    let remove = document.createElement('button');
    remove.classList.add("remove");
    remove.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>window-close</title><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>';
    remove.addEventListener('click',()=>{
        //console.log(remove.parentElement.parentElement);
        //shelf.removeChild(remove.parentElement.parentElement);
        deleteBook(shelf, remove.parentElement.parentElement);
    })

    let change = document.createElement('button');
    change.classList.add('change');
    change.textContent = 'Change Read Status';
    change.addEventListener('click',()=>{
        //console.log(change.parentElement.parentElement.id);
        changeReadStatus(change);
    })
    

    info.appendChild(titulo);
    info.appendChild(autora);
    info.appendChild(paginas);
    info.appendChild(leido);

    buttons.appendChild(change);
    buttons.appendChild(like);
    buttons.appendChild(remove);

    card.appendChild(info);
    card.appendChild(buttons);

    shelf.appendChild(card);

}

function manageFavorites(index,btn){
    // when I tried asssing the val below to var it made a copy and hence wouldn't change the real val
    books[index].fav = books[index].fav == false ? true : false;

    if(books[index].fav){
        btn.style.fill='red';
    }

    else{
        btn.style.fill='inherit';
    }
}

function deleteBook(parent,book){
    let idx = book.id;
    books.splice(idx,1);
    parent.removeChild(book);
    //console.log(books);
}

function changeReadStatus(btn){
    let state = btn.parentElement.parentElement.querySelector('.info').children[3];
    let content = state.textContent;
    
    if (content[5] === 'R') {
      content = 'Read:Currently reading'; // This modifies the string, not the DOM
      state.textContent = content; // Update the DOM element's textContent
    }
    else if(content[5] === 'C'){
        content = 'Read:Not read';
        state.textContent = content;
    }
    else{
        content = 'Read:Read';
        state.textContent = content;
    }

    books[btn.parentElement.parentElement.id].updateRead(content)
    //console.log(books);
}


let add = document.querySelector('.add');
let dialog = document.querySelector('dialog')
let submit = document.querySelector('.submit');
let cancel = document.querySelector('.cancel');

let title = document.getElementById('title')
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.getElementById('read');


add.addEventListener('click',()=>{
    dialog.showModal();
})


dialog.addEventListener('close',()=>{
    let book = dialog.returnValue.split(',');

    //console.log(book,book.length)
    if(book.length>1){ 
        addBookToArray(book);
    }
})


submit.addEventListener('click',(e)=>{
    e.preventDefault();
    dialog.close([title.value, author.value, pages.value, read.value]);
})

cancel.addEventListener('click',(e)=>{

    e.preventDefault();
    dialog.close([]);
})