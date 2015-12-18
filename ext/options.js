document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

// Saves options to chrome.storage.sync.
function save_options() {
  var quoteList = document.getElementsByClassName('quote');
  var quoteArray = [];
  for (var i = 0; i < quoteList.length; i++) {
    if (quoteList[i].value.length != 0) {
      quoteArray.push(quoteList[i].value);
    }
  }
  var quoteArrayJSON = JSON.stringify(quoteArray);
  console.log(quoteArrayJSON);
  chrome.storage.sync.set({
    'quotes': quoteArrayJSON
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
            "WHETHER FIGHTING OR SPITTING, MY DISCIPLINE IS UNFORGIVING!"]
  }, function(items) {
    var quotesArray = JSON.parse(items.quotes);

    var quoteList = document.getElementById('quoteList');
    console.log(quoteList);

    //add a table header for the quotes table.
    
    var quoteHeaderRow = quoteList.insertRow(0);
    var quoteHeader = document.createElement('th');
    quoteHeader.innerHTML = "Quotes: "
    quoteHeaderRow.appendChild(quoteHeader);

    var addQuoteButton = document.createElement('button');
    addQuoteButton.innerHTML = "+";
    addQuoteButton.addEventListener('click', addQuoteRow);
    quoteHeaderRow.appendChild(addQuoteButton);

    console.log(quotesArray.length);
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
      //deleteQuoteButton.addEventListener('click', deleteCurrentRow(deleteQuoteButton));
    }

    
  });
}

function deleteCurrentRow(button) {
  var currentRow = button.parentNode.parentNode; //get the grandparent node, which is the row containing the cell containing the button.
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
    //deleteQuoteButton.addEventListener('click', deleteCurrentRow(deleteQuoteButton));
}