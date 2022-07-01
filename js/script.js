<!--
    -- dapat menambahkan data berupa buku baru
    -- dapat menghapus data buku
    -- memiliki MINIMAL dua rak buku dan berikut adalah isinya.
        -- rak buku belum selesai dibaca
        -- rak buku sudah selesai dibaca
        -- rak buku psikologi
        -- rak buku filsafat
        -- rak buku kesehatan
    -- dapat memindahkan buku antar rak buku
    
    -- menggunakan local storage untuk menyimpan data buku
    -- tidak boleh ada bug atau error


const storageKey = 'STORAGE_KEY';
const submitAction = document.getElementById('form-data-guru');

function checkForStorage() {
    return typeof(Storage) !== 'undefined';
}

function putBookList(data){
    if (checkForStorage()){
        let bookData = [];
        if(localStorage.getItem(storageKey) !== null){
            bookData = JSON.parse(localStorage.getItem(storageKey));
        }
    
        bookData.unshift(data);
        if(bookData.length > 5){
            bookData.pop();
        }
    
        localStorage.setItem(storageKey, JSON.stringify(bookData));
    }
    
    
}
function getBookList(){
    if(checkForStorage()){
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    } else{
        return[];
    }
}


function renderBookList(){
    const bookData = getBookList();
    const bookList = document.querySelector('#user-list-detail');

    bookList.innerHTML = '';
    for(let book of bookData){
        let row = document.createElement('tr');
        row.innerHTML = '<td>' + book.judul + '</td>';
        row.innerHTML += '<td>' + book.jenis + '</td>';

        bookList.appendChild(row);
    }
}


submitAction.addEventListener("submit", function(event){
    const inputJudul = document.getElementById('judul').value;
    const inputJenis = document.getElementById('jenis').value;
    const newBookData = {
        judul: inputJudul,
        jenis: inputJenis,
    };

    putBookList(newBookData);
    renderBookList();
});

window.addEventListener('load', function(){
    if(checkForStorage){
        if(localStorage.getItem(storageKey) !== null){
            renderBookList();
        }
    }else{
        alert('browser yang anda gunakan tidak mendukung web storage')
    }
})