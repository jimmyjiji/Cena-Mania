document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

// Saves options to chrome.storage.sync.
function save_options() {

  //Save the nonempty items in the quote list to a string in JSON format.
  var quoteList = document.getElementsByClassName('quote');
  var quoteArray = [];
  for (var i = 0; i < quoteList.length; i++) {
    if (quoteList[i].value.length != 0) {
      quoteArray.push(quoteList[i].value);
    }
  }
  var quoteArrayJSON = JSON.stringify(quoteArray);

  var imageList = document.getElementsByClassName('image');
  var imageArray = [];
  for (var i = 0; i < imageList.length; i++) {
    if (imageList[i].value.length != 0) {
      imageArray.push(imageList[i].value);
    }
  }
  var imageArrayJSON = JSON.stringify(imageArray);

  var musicList = document.getElementsByClassName('music');
  var songName = musicList[0].value;

  chrome.storage.sync.set({
    'quotes': quoteArrayJSON,
    'images': imageArrayJSON,
    'music': songName
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    'music': 'http://memberfiles.freewebs.com/20/20/67812020/podcast/John%20Cena%20-%20Your%20time%20is%20up.mp3',
    'quotes': ["IF YOU WANT SOME COME GET SOME",
            "THE ONLY REAL JOHN IS JOHN CENA",
            "YOU CAN'T SEE ME",
            "THE CHAMP IS HERE",
            "ATTITUDE ADJUSTMENT", 
            "HUSTLE, LOYALTY, RESPECT",
            "NEVER GIVE UP", 
            "U CAN'T SEE ME", 
            "VINCE MCMAHON OWNS ME", 
            "WORD LIFE", 
            "BASIC THUGONOMICS", 
            "WHETHER FIGHTING OR SPITTING, MY DISCIPLINE IS UNFORGIVING!"],
    'images': ["http://worldinsport.com/wp-content/uploads/2014/08/johncena.jpg",
            "http://www.inspirationluv.com/wp-content/uploads/2015/03/john-cena-john-cena.jpg",
            "http://www2.pictures.gi.zimbio.com/John+Cena+Lions+Gate+Premiere+See+No+Evil+nPMaSdcrckVl.jpg",
            "http://chaddukeswrestlingshow.com/wp-content/uploads/2011/12/JON-CENA-john-cena-17402034-500-308.jpg",
            "http://i.imgur.com/rGaAhA1.jpg",
            "http://i.imgur.com/UiHqlME.jpg",
            "https://370c91614d34bfed666d6ea8a80d96f0b81747b5.googledrive.com/host/0B6Pvjxj4eVP5WndLVkdOWG9DNHc/JohnCenaRarePhotos",
            "http://healthyceleb.com/wp-content/uploads/2013/08/WWE-John-Cena-Bodybuilding.jpg",
            "http://cdn.papermag.com/uploaded_images/shia.jpg",
            "http://images.enstarz.com/data/images/full/3786/john-cena.jpg?w=580"]
  }, function(items) {
    try {
      var quotesArray = JSON.parse(items.quotes);
    }
    catch (err) {
      var quotesArray = items.quotes;
    }
    try {
      var imagesArray = JSON.parse(items.images);
    }
    catch (err) {
      var imagesArray = items.images;
    }
      var music = items.music;

    var musicList = document.getElementById('musicList');
    var quoteList = document.getElementById('quoteList');
    var imageList = document.getElementById('imageList');

    //add a table header for the music table.
    
    var musicHeaderRow = musicList.insertRow(0);
    var musicHeader = document.createElement('th');
    musicHeader.innerHTML = "Music: "
    musicHeaderRow.appendChild(musicHeader);

    if (music.length != 0) {
      //Just add one row without a delete button displaying a textbox with the current value.
      //Insert a new row into the table for music.
      var newMusicRow = musicList.insertRow(-1);
      var cellOne = newMusicRow.insertCell(0);

      //Insert editable text boxes for quotes to insert.
      var musicInput = document.createElement('input');
      musicInput.value = music;
      musicInput.className = "music";
      cellOne.appendChild(musicInput);
    }
    else {
      //Insert a new row into the table for music.
      var newMusicRow = musicList.insertRow(-1);
      var cellOne = newMusicRow.insertCell(0);

      //Insert editable text boxes for quotes to insert.
      var musicInput = document.createElement('input');
      musicInput.className = "music";
      cellOne.appendChild(musicInput);
    }

    //add a table header for the quotes table.
    
    var quoteHeaderRow = quoteList.insertRow(0);
    var quoteHeader = document.createElement('th');
    quoteHeader.innerHTML = "Quotes: "
    quoteHeaderRow.appendChild(quoteHeader);

    var addQuoteButton = document.createElement('button');
    addQuoteButton.innerHTML = "+";
    addQuoteButton.addEventListener('click', addQuoteRow);
    quoteHeaderRow.appendChild(addQuoteButton);

    for (var i = 0; i < quotesArray.length; i++) {
      //Insert a new row into the table for a quote.
      var newQuoteRow = quoteList.insertRow(-1);
      var cellOne = newQuoteRow.insertCell(0);
      var cellTwo = newQuoteRow.insertCell(1);

      //Insert editable text boxes for quotes to insert.
      var quoteInput = document.createElement('input');
      quoteInput.value = quotesArray[i];
      quoteInput.className = "quote";
      cellOne.appendChild(quoteInput);

      var deleteQuoteButton = document.createElement('button');
      deleteQuoteButton.innerHTML = "x";
      cellTwo.appendChild(deleteQuoteButton);
      deleteQuoteButton.addEventListener('click', deleteCurrentRow);
    }

        //add a table header for the images table.
    
    var imageHeaderRow = imageList.insertRow(0);
    var imageHeader = document.createElement('th');
    imageHeader.innerHTML = "Images: "
    imageHeaderRow.appendChild(imageHeader);

    var addImageButton = document.createElement('button');
    addImageButton.innerHTML = "+";
    addImageButton.addEventListener('click', addImageRow);
    imageHeaderRow.appendChild(addImageButton);

    for (var i = 0; i < imagesArray.length; i++) {
      //Insert a new row into the table for a image.
      var newImageRow = imageList.insertRow(-1);
      var cellOne = newImageRow.insertCell(0);
      var cellTwo = newImageRow.insertCell(1);

      //Insert editable text boxes for images to insert.
      var imageInput = document.createElement('input');
      imageInput.value = imagesArray[i];
      imageInput.className = "image";
      cellOne.appendChild(imageInput);

      var deleteImageButton = document.createElement('button');
      deleteImageButton.innerHTML = "x";
      cellTwo.appendChild(deleteImageButton);
      deleteImageButton.addEventListener('click', deleteCurrentRow);
    }
    
  });
}

function deleteCurrentRow() {
  var currentRow = this.parentNode.parentNode; //get the grandparent node, which is the row containing the cell containing the button.
  currentRow.parentNode.removeChild(currentRow); //delete the row in the table
}

function addQuoteRow() {
   var quoteList = document.getElementById('quoteList');

   //Insert a new row into the table for a quote.
    var newQuoteRow = quoteList.insertRow(-1);
    var cellOne = newQuoteRow.insertCell(0);
    var cellTwo = newQuoteRow.insertCell(1);

    //Insert editable text boxes for quotes to insert.
    var quoteInput = document.createElement('input');
    quoteInput.className = "quote";
    cellOne.appendChild(quoteInput);

    var deleteQuoteButton = document.createElement('button');
    deleteQuoteButton.innerHTML = "x";
    cellTwo.appendChild(deleteQuoteButton);
    deleteQuoteButton.addEventListener('click', deleteCurrentRow);
}

function addImageRow() {
   var imageList = document.getElementById('imageList');

   //Insert a new row into the table for a image.
    var newImageRow = imageList.insertRow(-1);
    var cellOne = newImageRow.insertCell(0);
    var cellTwo = newImageRow.insertCell(1);

    //Insert editable text boxes for images to insert.
    var imageInput = document.createElement('input');
    imageInput.className = "image";
    cellOne.appendChild(imageInput);

    var deleteImageButton = document.createElement('button');
    deleteImageButton.innerHTML = "x";
    cellTwo.appendChild(deleteImageButton);
    deleteImageButton.addEventListener('click', deleteCurrentRow);
}