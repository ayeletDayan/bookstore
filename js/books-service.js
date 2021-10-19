'use strict';

var gBooks = [];
var gSortBy;
var gCurrLang = 'en';

var gTrans = {
    title: {
        en: 'Welcome to my Bookshop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    sort: {
        en: 'Sort by',
        he: 'מיין',
    },
    TITLE: {
        en: 'Title',
        he: 'כותר',
    },
    PRICE: {
        en: 'Price',
        he: 'מחיר'
    },
    'Add-Book': {
        en: 'Add Book',
        he: 'הוסף ספר',
    },
    'new-book': {
        en: 'Book title',
        he: 'כותר',
    },
    'new-price': {
        en: 'Price',
        he: 'מחיר',
    },
    Add: {
        en: 'Add',
        he: 'הוסף',
    }
}

function bookDetails(bookId) {
    var book = getBookById(bookId);
    if (gCurrLang === 'en') {
        var strHtmls = `<button style="display: flex; align-items: flex-end; margin-inline-start" onclick="onCloseModal()">x</button>
        <h5>${book.title}</h5>
        <div><img src="${book.img}" alt=""> </div><br>
        <h7>Id: ${book.id}, Price: ${book.price}</h7><br><br>
        Rate:<br>
        <button onclick="add('${book.id}')">+</button> <span class="rate">${book.rate}</span> <button onclick="reduce('${book.id}')">-</button>`
        document.querySelector('.read-details').innerHTML = strHtmls
        var elBook = document.querySelector('.read-details')
        elBook.hidden = false;
    }
    else {
        var strHtmls = `<button style="display: flex; align-items: flex-end; margin-inline-start" onclick="onCloseModal()">x</button>
        <h5>${book.title}</h5>
        <div><img src="${book.img}" alt=""> </div><br>
        <h7> מק"ט: ${book.id} , מחיר: ${book.price} </h7><br><br>
        דירוג:<br>
        <button onclick="add('${book.id}')">+</button> <span class="rate">${book.rate}</span> <button onclick="reduce('${book.id}')">-</button>`
        document.querySelector('.read-details').innerHTML = strHtmls
        var elBook = document.querySelector('.read-details')
        elBook.hidden = false;
    }
}

function updateBook(bookId) {
    gBooks = loadFromStorage('Books');
    var book = getBookById(bookId);
    book.price = prompt('Insert new price');    
    saveToStorage('Books', gBooks);
    init()    
}

function removeBook(bookId) {
    gBooks = loadFromStorage('Books');
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(idx, 1)    
    saveToStorage('Books', gBooks);
    init();
}

function createBooks() {
    var books = loadFromStorage('Books')
    if (books && books.length) {
        gBooks = books
    } else {
        gBooks = _createBooks()
        saveToStorage('Books', gBooks)
    }
    console.log(gBooks);
}

function _createBooks() {
    return [
        _createBook("Harry Potter and the Sorcerer's Stone", '30', 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5903/9780590353427.jpg'),
        _createBook("Winnie-the-Pooh", '50', 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5254/9780525444435.jpg'),
        _createBook("The Cat in the Hat", '40', 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0071/9780007158447.jpg')
    ]
}

function _createBook(title, price, img) {
    var book = {
        id: makeId(),
        title,
        price,
        img,
        rate: 0
    }
    return book
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return bookId === book.id
    })
}

function add(bookId) {
    var book = getBookById(bookId);
    book.rate++
    updatRate(bookId, book.rate)
}

function reduce(bookId) {
    var book = getBookById(bookId);
    if (!book.rate) return
    book.rate--
    updatRate(bookId, book.rate)
}

function updatRate(bookId, newRate) {
    gBooks = loadFromStorage('Books');
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks[idx].rate = newRate    
    var strHTML = '' + newRate;
    var elRate = document.querySelector(".rate");
    elRate.innerHTML = strHTML;
    saveToStorage('Books', gBooks);
    init();
}

function setSort(sortBy) {
    if (sortBy === 'TITLE')
        gBooks.sort((book1, book2) => (book1.title > book2.title ? 1 : -1));

    if (sortBy === 'PRICE')
        gBooks.sort((book1, book2) => book1.price - book2.price);
}

function addBook(newTitle, newPrice) {
    gBooks = loadFromStorage('Books');
    gBooks.push(_createBook(newTitle, newPrice, ''))
    saveToStorage('Books', gBooks);
    init();
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var elTrans = el.dataset.trans
        if (el.nodeName === 'INPUT') {
            el.placeholder = getTrans(elTrans)
        } else {
            el.innerText = getTrans(elTrans)
        }
    })
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en;
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

function setPrice(lang) {
    if (lang === 'he') {
        gBooks = loadFromStorage('Books');
        gBooks.forEach((book) => {
            book.price = formatCurrencyHe(book.price * 3.22);
        })
    }
    else {
        gBooks = loadFromStorage('Books');
        gBooks.forEach((book) => {
            book.price = formatCurrencyEn(book.price)
        })
    }
}

function formatCurrencyHe(num) {

    return new Intl.NumberFormat('he-IL',
        { style: 'currency', currency: 'ILS' }).format(num);
}

function formatCurrencyEn(num) {
    return new Intl.NumberFormat('IN',
        { style: 'currency', currency: 'USD' }).format(num);
}