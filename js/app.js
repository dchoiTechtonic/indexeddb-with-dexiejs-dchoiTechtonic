function onDatabaseReady() {
    showTable() // DO NOT TOUCH THIS LINE until step #4
    document.querySelector(".btn").addEventListener("click",function(event){
      event.preventDefault();
      document.querySelector("form").reset();
      document.getElementById("inputTitle").setAttribute('value','');
      document.getElementById("inputAuthor").setAttribute('value','');
      document.getElementById("inputPages").setAttribute('value','');
      document.getElementById("inputCover").setAttribute('value','');
      document.getElementById("inputSynopsis").setAttribute('value','');
      document.getElementById("inputDate").setAttribute('value','');
      document.getElementById("inputRating").setAttribute('value','');
      document.getElementById("addBook").innerHTML="❀ Add Book... ❀"
      document.getElementById("formSubmit").innerHTML="Submit"
    });
    console.log(db);
    // DexieJS docs: https://dexie.org/
}

// creating table ui
async function showTable(newBookTitle) {
  const tBody = document.querySelector('tbody');
  const columns = ['cover', 'title', 'author', 'numberOfPages', 'synopsis', 'publishDate', 'rating'];
  // prevents default books from populating every time function is called
  tBody.innerHTML='';
  // creates the rows
    let allBooks = await db.books.where('numberOfPages').aboveOrEqual(0).toArray()

    for (let i = allBooks.length - 1; i >= 0; i--) {
      const row = document.createElement('tr');

      for (let j = 0; j < columns.length; j++) {
        var td = document.createElement('td');
        var value = allBooks[i][columns[j]]
        if(j>0){
          td.innerText = value ? value : null;
          row.append(td);
          // else if it is the first column for the cover images
        } else{
          td.innerHTML = `<img src=${value}>`;
          row.append(td);
        }

      }
      // adding delete button to table
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      row.append(deleteBtn);
      tBody.append(row);
      // event listener for delete button
      deleteBtn.addEventListener("click", function(){
        deleteBook(allBooks[i].title);
      })
      // adding edit button to table
      const editBtn = document.createElement('button');
      editBtn.innerText = 'Edit';
      row.append(editBtn);
      tBody.append(row);
      // adding event listener to edit button
      editBtn.addEventListener("click", function(event){
        // pressing edit button populates the add book form with this book's information
        document.getElementById("inputTitle").setAttribute('value',allBooks[i].title);
        document.getElementById("inputAuthor").setAttribute('value',allBooks[i].author);
        document.getElementById("inputPages").setAttribute('value',allBooks[i].numberOfPages);
        document.getElementById("inputCover").setAttribute('value',allBooks[i].cover);
        document.getElementById("inputSynopsis").setAttribute('value',allBooks[i].synopsis);
        document.getElementById("inputDate").setAttribute('value',allBooks[i].publishDate);
        document.getElementById("inputRating").setAttribute('value',allBooks[i].rating);
        document.getElementById("formSubmit").innerHTML="Save Changes"
        document.getElementById("addBook").innerHTML="❀ Edit Book... ❀"
        // preventing default to not refresh page every time
        event.preventDefault();
      })
    }
}
// deletes books
function deleteBook(key) {
  var deletedBook = db.books.delete(key);

  deletedBook.then(function(res) {
    console.log(res);
  }).catch(function(rej) {
    console.log(rej);
  });
  showTable();
}


// adding book using form with event handler on submit button
function addBook(event) {
  // adding book based on form values
  var addedBook = db.books.put({
    title: document.getElementById("inputTitle").value,
    author:document.getElementById("inputAuthor").value,
    numberOfPages:document.getElementById("inputPages").value,
    cover:document.getElementById("inputCover").value,
    synopsis:document.getElementById("inputSynopsis").value,
    publishDate:document.getElementById("inputDate").value,
    rating:document.getElementById("inputRating").value
  });
    addedBook.then(function(res) {
      console.log(res);
    }).catch(function(rej){
      console.log(rej);
    })
    showTable(event);
}

// did not use this function because I used addbook as my edit function as well....the only issue is that editing the title(object key) will just add a new book with a new title instead of actually editing the book....


// function editBook(title,obj) {
//   var updatedBook = db.books.update(title,obj);
//   console.log("hi");
//   document.getElementById("inputTitle").setAttribute('placeholder',allBooks[i].title)
//
//   updatedBook.then(function(resolved) {
//     console.log(resolved)
//   }).catch(function(rejected) {
//     console.log(rejected);
//   })
// }
