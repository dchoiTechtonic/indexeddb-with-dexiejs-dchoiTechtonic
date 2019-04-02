
async function showTable(newBookTitle) {
  const tBody = document.querySelector('tbody');
  const columns = ['cover', 'title', 'author', 'numberOfPages', 'synopsis', 'publishDate', 'rating'];
  tBody.innerHTML='';
    let allBooks = await db.books.where('numberOfPages').aboveOrEqual(0).toArray()

    for (let i = allBooks.length - 1; i >= 0; i--) {
      const row = document.createElement('tr');

      for (let j = 0; j < columns.length; j++) {
        var td = document.createElement('td');
        var value = allBooks[i][columns[j]]
        td.innerText = value ? value : null;
        row.append(td);
      }
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      row.append(deleteBtn);
      tBody.append(row);

      deleteBtn.addEventListener("click", function(){
        deleteBook(allBooks[i].title);
      })
    }
}

function onDatabaseReady() {
    showTable() // DO NOT TOUCH THIS LINE until step #4
    document.querySelector(".btn").addEventListener("click",function(event){
      event.preventDefault();
    });
    console.log(db);
    // DexieJS docs: https://dexie.org/
}


function deleteBook(key) {
  var deletedBook = db.books.delete(key);

  deletedBook.then(function(res) {
    console.log(res);
  }).catch(function(rej) {
    console.log(rej);
  });
  showTable();
}



function addBook(event) {
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


function editBook(event,obj) {

  var updatedBook = db.books.update(event,obj);

  updatedBook.then(function(resolved) {
    console.log(resolved)
  }).catch(function(rejected) {
    console.log(rejected);
  })
}

// document.getElementsByClassName("deleteButton").addEventListener("click", deleteBook());
// ************ 4. (BONUS) Comment out line 67 in ../index.HTML and write your own 'populateTableUI' function in app.js ************


// Now that you’ve cloned your project lets start by testing our code. Let's start live
//server and open up our project in the browser. Open up your console and you should see
//some logs outputting book objects. These object are predefined in books.json and added to
//our database called library_database in indexedDB. We can also navigate to the
//application tab in the chrome console (storage in firefox) and take a look at the indexedDB
//storage We created this for you in indexedDB.js if you feel inclined to take a look.

// We've populated the table so the UI reflects what's currently in our local
// library_database in indexedDB.  We've logged the database above so you can see exactly
// what you're working with


// 1.) Now add functionality to remove a row  which will need remove the object from the books store in
//indexedDB database as well as the UI once the delete operation is complete. This will take some
//effort on the UI. Use the title as your UID (Unique identifier) which you can find in the application console
//in Chrome (storage in Firefox).

// 2.) From here we want to be able to add a book. Hook up the form below the table to add a
//book to the books store in indexedDB and auto-update the table without refreshing the page.
//Hint: This add operation is on the front page of DexieJS.  Both is and Table.put() can be
// used to add this book.

// 3.) Now make each table row editable and update the database when the edit is complete. This will
//take a lot of effort from the html to the js. Use the title as your UID (Unique identifier)
//which you can find in the application console
