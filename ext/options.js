document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

// Saves options to chrome.storage.sync.
function save_options() {
  var color = document.getElementById('color').value;
  var likeValue = document.getElementById('like').checked;
  var quoteList = document.getElementsByClassName('quote');
  var quoteArray = [];
  for (var i = 0; i < quoteList.length; i++) {
    quoteArray.push(quoteList[i].value);
  }
  console.log(quoteArray);
  chrome.storage.sync.set({
    'favoriteColor': color,
    'likesColor': likeValue,
    'quotes': quoteArray
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
            "WHETHER FIGHTING OR SPITTING, MY DISCIPLINE IS UNFORGIVING!"],
    'favoriteColor': 'red',
    'likesColor': true
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
    var quotes = items.quotes;
    var quoteList = document.getElementById('quoteList');

    for (var i = 0; i < quotes.length; i++) {
      //Insert a new row into the table for a quote.
      var newQuoteRow = quoteList.insertRow(i);
      var cellOne = newQuoteRow.insertCell(0);
      var cellTwo = newQuoteRow.insertCell(1);

      //Insert editable text boxes for quotes to insert.
      var quoteInput = document.createElement('input');
      quoteInput.value = quotes[i];
      quoteInput.class = "quote";
      cellOne.appendChild(quoteInput);
    }

    //add a table header for the quotes table.
    var quoteHeaderRow = quoteList.insertRow(0);
    var quoteHeader = document.createElement('th');
    quoteHeader.innerHTML = "Quotes: "
    quoteHeaderRow.appendChild(quoteHeader);
  });
}
