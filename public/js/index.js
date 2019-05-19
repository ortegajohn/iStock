// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// var dropDown = require("../../data");
// console.log("dropDown.tickersNYSE: ", dropDown.tickersNYSE);

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    console.log("Test");
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      // url: "/",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });
    location.reload();

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
    // location.reload();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
$(document).on("click", ".button", function(e) {
  e.preventDefault();
  var getinput = $(".input")
    .val()
    .toUpperCase();
  console.log("get_input: ", getinput);
  var getInputTicker = getinput.split(" ", 1);
  console.log("get_input_ticker: ", getInputTicker);
  console.log("get_input_ticker.join(): ", getInputTicker.join());
  var ticker = getInputTicker.join();

  updateChart(ticker);
  $(".input").val("");
});

function updateChart(ticker) {
  //"https://www.tradingview.com/symbols/NYSE-MMM/"
  // $("#web_chart").attr("href","https://www.tradingview.com/symbols/NYSE-MMM/")
  // TradingView.widget["symbol"]="NYSE:AAPL"

  new TradingView.widget({
    width: 880,
    height: 510,
    symbol: getIndex(ticker) + ":" + ticker,
    interval: "D",
    timezone: "Etc/UTC",
    theme: "Light",
    style: "1",
    locale: "en",
    // eslint-disable-next-line camelcase
    toolbar_bg: "#f1f3f6",
    // eslint-disable-next-line camelcase
    enable_publishing: false,
    // eslint-disable-next-line camelcase
    allow_symbol_change: true,
    // eslint-disable-next-line camelcase
    container_id: "tradingview_72e3c"
    // "container_id": "tradingview_845d6"
  });
}

function getIndex(ticker) {
  var index = "";
  for (i = 0; i < tickersNASDAQ.length; i++) {
    if (i === ticker.toUpperCase()) {
      index = "NASDAQ";
    }
  }

  for (i = 0; i < tickersNYSE.length; i++) {
    if (i === ticker.toUpperCase()) {
      index = "NYSE";
    }
  }

  for (i = 0; i < tickersAMEX.length; i++) {
    if (i === ticker.toUpperCase()) {
      index = "AMEX";
    }
  }
  // console.log("index: ",index)
  return index;
}

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_autocomplete
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    console.log(e);
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          console.log(e);
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) {
      x = x.getElementsByTagName("div");
    }
    if (e.keyCode === 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode === 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode === 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) {
          x[currentFocus].click();
        }
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) {
      return false;
    }
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) {
      currentFocus = 0;
    }
    if (currentFocus < 0) {
      currentFocus = x.length - 1;
    }
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}

$(document).ready(function() {
  console.log("ready!");
  console.log("dropDown.tickersAMEX: ", dropDown.tickersAMEX);
});

var tickers11 = [];
var names = [];
var tickersNames = [];

tickers11 = tickers11.concat(tickersAMEX);
tickers11 = tickers11.concat(tickersNASDAQ);
tickers11 = tickers11.concat(tickersNYSE);

names = names.concat(AMEX_names);
names = names.concat(NASDAQ_names);
names = names.concat(NYSE_names);

for (j = 0; j < tickers11.length; j++) {
  tickersNames[j] = tickers11[j] + " " + names[j];
}

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), tickersNames);
