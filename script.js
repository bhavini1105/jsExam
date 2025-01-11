let bookName = document.getElementById('inputBook');
let authorName = document.getElementById('inputAuthor');
let tableData = document.getElementById('table');
let isEdit = false;

let books = () => {
    let data = JSON.parse(localStorage.getItem("book data")) || [];
    return data;
}

let submitbtn = () => {
    event.preventDefault();

    if(isEdit){
        let record = {
            id: Math.floor(Math.random() * 1000),
            bookName: bookName.value,
            authorName: authorName.value,
        }

        let bookData = books();
        let oneRecord = bookData.map((r) => (r.id == record.id) ? record : r);

        localStorage.setItem("book data", JSON.stringify(bookData));

        isEdit = false;
    } else {
        let newRecord = {
            id: Math.floor(Math.random() * 1000),
            bookName: bookName.value,
            authorName: authorName.value,
        }

        let bookData = books();
        bookData.push(newRecord);
        localStorage.setItem("book data", JSON.stringify(bookData));
    }

    bookName.value = '';
    authorName.value = '';
    showData();
}

let editbtn = (id) => {
    let erecord = books();
    let editRecord = erecord.find((e_id) => e_id.id == id);

    if(editRecord) {
        isEdit = true;
        bookName.value = editRecord.bookName;
        authorName.value = editRecord.authorName;
    }
}

let deletebtn = (id) => {
    let drecord = books();
    let deleteRecord = drecord.filter((d_id) => d_id.id != id);
    localStorage.setItem("book data", JSON.stringify(deleteRecord));
    showData();
}

let showData = () => {
    let bookData = books();

    tableData.innerHTML = "";

    bookData.forEach((book, index) => {
        tableData.innerHTML += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${book.bookName}</td>
            <td>${book.authorName}</td>
            <td><button onclick="editbtn(${book.id})">Edit</button>  <button onclick="deletebtn(${book.id})">Delete</button></td>
        </tr>`;
    });
}

showData();
