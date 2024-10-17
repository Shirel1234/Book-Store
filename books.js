import data from "/json/data.json" with {type: 'json'};
let books = [];

document.addEventListener('DOMContentLoaded', () => {
    let saveBooks=localStorage.getItem('booksData');
    if ( saveBooks== null) {
        localStorage.setItem('booksData', JSON.stringify(data.books));
        renderBooks(data.books);
    }
    else{
        
        renderBooks(JSON.parse(saveBooks));
    }
    
    const addLink = document.getElementById("addLink");
    addLink.addEventListener('click', function (event) {
        event.preventDefault();
        openAddBook();
    });
    const btnAdd=document.getElementById("btnAdd");
    btnAdd.addEventListener('click', (event)=>{
        event.preventDefault();
        addBook();
    });

    const btnSubmit=document.getElementById("btnSubmit");
    btnSubmit.addEventListener('click', (event)=>{
        event.preventDefault();
        updateBook();
    });

    const btnSortTitle=document.getElementById("btnSortTitle");
    btnSortTitle.addEventListener('click', (event)=>{
        event.preventDefault();
        sortTable(1,'text' );
    });
    const btnSortPrice=document.getElementById("btnSortPrice");
    btnSortPrice.addEventListener('click', (event)=>{
        event.preventDefault();
        sortTable(2,'price' );
    });

});

function renderBooks(books) {
    const bookList = document.querySelector('#book-list tbody');
    bookList.innerHTML = '';
    for (let i = 0; i < books.length; i++) {
        const row = document.createElement('tr');
        // Book details
        row.innerHTML = `
            <td>${books[i].id}</td>
            <td>${books[i].title}</td>
            <td>${books[i].price}</td>
            <td>
                <button class="read-btn">Read</button>
                <button class="update-btn">Update</button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </td>
        `;
        const readBtn = row.querySelector('.read-btn');
        readBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            showBookDetails(books[i]);
        });
        const updateBtn = row.querySelector('.update-btn');
        updateBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            openUpdateBook(books[i]);
        });

        const deleteBtn = row.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteBook(i);
        });

        bookList.appendChild(row);

    }
}
function showBookDetails(book) {
    const divShow = document.getElementById('book-details');
    divShow.innerHTML = '';
    const title = document.createElement('h1');
    title.classList.add("titleBook");
    title.innerHTML = book.title;
    const cell = document.createElement('div');
    cell.classList.add("details");
    const img = document.createElement('img');
    img.id = "imgBook";
    img.src = book.image;
    const price = document.createElement('p');
    price.innerHTML = `Price: $${book.price}`;
    const divPriceRate = document.createElement('div');
    divPriceRate.classList.add("priceRate");
    const divRate = document.createElement('div');
    divRate.classList.add("rate")
    const txtLabel = document.createElement('label');
    txtLabel.innerHTML = "Rate:";
    const btnLess = document.createElement('button');
    btnLess.classList.add("btnRate");
    btnLess.id = "btnLessRate";
    btnLess.innerHTML = "-";
    const txtNum = document.createElement('label');
    txtNum.id = "numRate";
    txtNum.innerHTML = book.rating;
    const btnAdd = document.createElement('button');
    btnAdd.classList.add("btnRate");
    btnAdd.id = "btnAddRate";
    btnAdd.innerHTML = "+";
    const btnSave=document.createElement('button');
    btnSave.id="btnSaveRate"
    btnSave.innerHTML="Save";
    divRate.appendChild(txtLabel);
    divRate.appendChild(btnLess);
    divRate.appendChild(txtNum);
    divRate.appendChild(btnAdd);

    divPriceRate.appendChild(price);
    divPriceRate.appendChild(divRate);
    divPriceRate.appendChild(btnSave)

    cell.appendChild(img);
    cell.appendChild(divPriceRate);

    divShow.appendChild(title);
    divShow.appendChild(cell);

    const lessBtn =document.getElementById('btnLessRate');
    lessBtn.addEventListener('click', (event) => {
            event.preventDefault();
            lessRate();
        }
    );

    const addBtn =document.getElementById('btnAddRate');
    addBtn.addEventListener('click', (event) => {
            event.preventDefault();
            addRate();
        }
    );

    const saveBtn =document.getElementById('btnSaveRate');
    saveBtn.addEventListener('click', (event) => {
            event.preventDefault();
            saveRate(book);
        }
    );

}
function openAddBook() {
    document.getElementById("addForm").style.display = "block";
    var slider = document.getElementById("newRate");
    var output = document.getElementById("rateRes");
    output.innerHTML = slider.value;

    slider.oninput = function() {
    output.innerHTML = this.value;
}
}
function addBook() {
    let storedBasket = localStorage.getItem('booksData');
    books = storedBasket ? JSON.parse(storedBasket) : [];
    const newId = document.getElementById('newId').value;
    const existItem = books.find(basketItem => basketItem.id == newId);
    if(existItem){
        alert("Error: There is book with the same id");
    }
    else if(!newId){
        alert("Error: Can't add a new book without id");
    }
    
    else{
    const newTitle = document.getElementById('newTitle').value;
    const newPrice = document.getElementById('newPrice').value;
    const newRate =document.getElementById('newRate').value;
    const newUrl = document.getElementById('newUrl').value;
    const basketItem = {id: newId, title:newTitle, price:newPrice, rating: newRate, image: newUrl};
    books.push(basketItem);
    }
    localStorage.setItem('booksData', JSON.stringify(books));
    document.getElementById("addForm").style.display = "none";
    renderBooks(books);
}
function openUpdateBook(book) {
    const id = document.getElementById("updateId");
    id.innerHTML=book.id;
    const title = document.getElementById("updateTitle");
    title.value=book.title;
    const price = document.getElementById("updatePrice");
    price.value=book.price;
    const img = document.getElementById("updateUrl");
    img.value=book.image;
    document.getElementById("updateForm").style.display = "block";
}
function updateBook() {
    const id=document.getElementById("updateId").innerHTML;
    let storedBasket = localStorage.getItem('booksData');
    books = storedBasket ? JSON.parse(storedBasket) : [];
    const existItem = books.find(basketItem => basketItem.id == id);
    existItem.title=document.getElementById("updateTitle").value;
    existItem.price=document.getElementById("updatePrice").value;
    existItem.image=document.getElementById("updateUrl").value;

    localStorage.setItem('booksData', JSON.stringify(books));
    document.getElementById("updateForm").style.display = "none";
    renderBooks(books);
}

function deleteBook(index){
    let storedBasket = localStorage.getItem('booksData');
    books = storedBasket ? JSON.parse(storedBasket) : [];
    books.splice(index, 1);
    localStorage.setItem('booksData', JSON.stringify(books));
    renderBooks(books);
}

function sortTable(index, type){
    var table = document.getElementById("book-list");
    var rows = Array.from(table.rows).slice(1);
    rows.sort(function(rowA, rowB){
    var cellA = rowA.cells[index].innerText;
    var cellB = rowB.cells[index].innerText;

    if(type=='price'){
        return parseFloat(cellA) - parseFloat(cellB);
    }else if (type=='text'){
        return cellA.localeCompare(cellB);
    }
    });
    rows.forEach(function (row) {
        table.tBodies[0].appendChild(row);
    });
}
function lessRate(){
    const numRate=document.getElementById('numRate');
    numRate.innerHTML=numRate.innerHTML-1;
    if(numRate.innerHTML<0){
        numRate.innerHTML=0;
    }
}
function addRate(){
    const numRate=document.getElementById('numRate');
    numRate.innerHTML=Number(numRate.innerHTML)+1;
    if(numRate.innerHTML>10){
        numRate.innerHTML=10;
    }
}
function saveRate(book){
    let storedBasket = localStorage.getItem('booksData');
    books = storedBasket ? JSON.parse(storedBasket) : [];
    const num = document.getElementById('numRate').innerHTML;
    const existItem = books.find(basketItem => basketItem.id == book.id);
    existItem.rating= num;
    localStorage.setItem('booksData', JSON.stringify(books));
    renderBooks(books);
}