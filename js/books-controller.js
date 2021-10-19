'use strict';

function init() {
    createBooks()
    setPrice(gCurrLang)
    renderBooks()
}

function renderBooks() {
    if (gCurrLang === 'en'){
        var start = `<table class="tableAdmin" border="1"> <tbody> <tr> <td class="td-title">Title</td> <td class="td-title">price</td> <td class="td-title">Read</td> <td class="td-title">Update</td> <td class="td-title"> Delete</td></tr>`
        var strHtmls = gBooks.map((book) => {
            return `<tr> <td class="cell"> ${book.title}</td> <td class="cell">${book.price}</td><td class="cell"> <button onclick="onBookDetails('${book.id}')">Read</button></td><td class="cell"> <button onclick="onUpdateBook('${book.id}')">Update</button></td><td class="cell"> <button onclick="onRemoveBook('${book.id}')">Delete</button></td></tr>`
        })
        var end = `</tbody></table>`
        document.querySelector('.table').innerHTML = (start + strHtmls.join('') + end)
    }
    else {
        var start = `<table class="tableAdmin" style="font-family: Arial, Helvetica, sans-serif;" border="1"> <tbody> <tr> <td class="td-title">כותר</td> <td class="td-title">מחיר</td> <td class="td-title">נתונים</td> <td class="td-title">עדכן</td> <td class="td-title">מחק</td></tr>`
        var strHtmls = gBooks.map((book) => {
            return `<tr> <td class="cell"> ${book.title}</td> <td class="cell">${book.price}</td><td class="cell"> <button onclick="onBookDetails('${book.id}')">קרא</button></td><td class="cell"> <button onclick="onUpdateBook('${book.id}')">עדכן</button></td><td class="cell"> <button onclick="onRemoveBook('${book.id}')">מחק</button></td></tr>`
        })
        var end = `</tbody></table>`
        document.querySelector('.table').innerHTML = (start + strHtmls.join('') + end)
    }
}

function onSetSorted(sortBy) {
    setSort(sortBy);
    renderBooks()
}

function onUpdateBook(bookId) { //update price
    updateBook(bookId)
    renderBooks()
}

function onBookDetails(bookId) { //read
    bookDetails(bookId) 
}

function onRemoveBook(bookId) { //delete
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    const elTitle = document.querySelector('input.new-book');
    const newTitle = elTitle.value
    if (!(newTitle)) return
    const elPrice = document.querySelector('input.new-price')
    const newPrice = elPrice.value
    addBook(newTitle, newPrice)
    renderBooks();
    elTitle.value = '';
    elPrice.value = '';
}

function onCloseModal() {
    document.querySelector('.read-details').hidden = true
}

function onSetLang(lang) {
    setLang(lang);
    setPrice(lang);
    var elBody = document.querySelector('body')
    if(lang === 'he'){
       elBody.classList.add('rtl')
    } else {
        elBody.classList.remove('rtl')
    }
    doTrans();
    renderBooks()
    ;
}