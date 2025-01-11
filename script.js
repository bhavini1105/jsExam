let bookName = document.getElementById('inputBook');
let authorName = document.getElementById('inputAuthor');
let tableData = document.getElementById('table');
let bookData = [];
let isEdit = false;

let books = ()=>{
    let data = JSON.parse(localStorage.getItem("bookData")) || [];
    return data;
}

let submitbtn = () => {
    event.preventDefault();

    if(isEdit){
        let record = {
            id : id.value,
            bookName : bookName.value,
            authorName : authorName.value ,
        }

        let bookData = books();
        let oneRecord = bookData.map((r) => (r.id == id) ? record : r);

        localStorage.setItem("book data", JSON.stringify(bookData));

        isEdit = false;
        book_id = " ";
    }
    else {
        let newRecord = {
            id : Math.floor(Math.random() * 1000),
            bookName : bookName.value,
            authorName : authorName.value ,
        }

        let bookData = books();
        bookData.push(newRecord);
        localStorage.setItem("book data" , JSON.stringify(bookData));
    }


    bookName.value = '';
    authorName.value = '';

}

let editbtn = (id) => {

    let erecord = books();

    let editRecord = erecord.find( (e_id) => {
        return  e_id.id == id;
    });

    if(editRecord) {
        isEdit = true;
        id.value = editRecord.id;
        bookName.value = editRecord.bookName;
        authorName.value = editRecord.authorName;
    }



}

let deletebtn = (id) => {

    let drecord = books() ;

    let deleteRecord = drecord.filtter((d_id) => {
        d_id.id != id;
    });

    localStorage.setItem("book Data" , JSON.stringify(deleteRecord));
}

let showData = () => {

    let bookData = books();

    tableData.innerHTML = " ";

    bookData.forEach((book ,index)=>{
        tableData.innerHTML +=`<tr>
            <th scope="row">${index+1}</th>
            <td>${book.bookName}</td>
            <td>${book.bookAuthor}</td>
            <td><button onclick="return editbtn(${book.id})">Edit</button>  <button onclick="return deletebtn(${book.id})">Delet</button></td>
          </tr>`
    })
}

showData();
