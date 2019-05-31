// gloval variables
require("../../views/")
var price;
var company;
var tickers_already_used = [];
var rotate_price_api = 0;
var rotate_name_api = 0;

var $submitBtn = $("#button");

var html_col_values = {
  column_symbol: $("<th>"),
  column_company: $("<th>"),
  column_price: $("<th>"),
  column_market: $("<th>")
}
var $tablecontent = $("#table_content");
var stocks = [];

// var API = {
//   saveExample: function (example) {
//     console.log("example: " + example);
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   }
// }

var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    }).then(function(){
      location.reload();
    });
  },
  getExamples: function (somedata) {
    console.log("somedata: ", somedata)
     $.ajax({
      url: "api/examples",
      // url: "/",
      type: "GET",
      data: JSON.stringify(somedata)
    }).then(function(){
      location.reload();
    })
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// Getting todos from database when page loads
// getStocks();

// This function grabs todos from the database and updates the view
function getStocks() {
  $.get("/api/examples", function (data) {
    // res.redirect("/")
    stocks = data;
    // console.log("stocks: " + JSON.stringify(stocks));

    // initializeRows();
  });
  // location.reload();
}

var table_values = {
  symbol: "",
  price: "",
  company: "",
  market: "",
}

var tickers11 = [];
var names = [];
var tickers_names = [];

tickers11 = tickers11.concat(AMEX_tickers);
tickers11 = tickers11.concat(NASDAQ_tickers);
tickers11 = tickers11.concat(NYSE_tickers);

names = names.concat(AMEX_names);
names = names.concat(NASDAQ_names);
names = names.concat(NYSE_names);

for (j = 0; j < tickers11.length; j++) {
  tickers_names[j] = tickers11[j] + " " + names[j];
}

// frontend functions
// function table(ticker) {
//   var symbol_table = $("<tr  class='hover1'>")
//   // var placeHolder = "#"

//   symbol_table.append(`<th id="${ticker}_symbol" class= "symbol" scope="col"></th>`)
//   // symbol_table.append(`<th id="${ticker}_company" class= "company" scope="col"></th>`)
//   // symbol_table.append(`<th id="${ticker}_price" class= "price" scope="col"></th>`)
//   // symbol_table.append(`<th id="${ticker}_market" class= "market" scope="col"></th>`)
//   // symbol_table.append(`<th class="del_button" scope="col"> <button ticker="${ticker}" class="buttons" id="${ticker}_deletebtn">delete</button></th>`)

//  $("#table_content").append(symbol_table)
// }

// function set_symbol(x) {
//   $("#" + x + "_symbol").text(x)
// }

function get_index(ticker) {
  var index = "";
  for (i = 0; i < NASDAQ_tickers.length; i++) {
    if (i === ticker.toUpperCase()) {
      index = "NASDAQ";
    }
  }
  for (i = 0; i < NYSE_tickers.length; i++) {
    if (i === ticker.toUpperCase()) {
      index = "NYSE";
    }
  }
  for (i = 0; i < AMEX_tickers.length; i++) {
    if (i === ticker.toUpperCase()) {
      index = "AMEX";
    }
  }
  // console.log("index: ",index)
  return index
}

function update_chart(ticker) {
  //"https://www.tradingview.com/symbols/NYSE-MMM/"
  // $("#web_chart").attr("href","https://www.tradingview.com/symbols/NYSE-MMM/")
  // TradingView.widget["symbol"] = "NYSE:​MMM"
  new TradingView.widget(
    {
      "width": 880,
      "height": 510,
      "symbol": get_index(ticker) + ":" + ticker,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "Light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_72e3c"
      // "container_id": "tradingview_845d6"
    }
  );
};

function hide_news() {
  $("#stocknews_id").hide()
}
function show_news() {
  $("#stocknews_id").show()
}

function hide_stockinfo() {
  $("#stockinfo_id").hide()
}

function show_stockinfo() {
  $("#stockinfo_id").show()
}

function newsfeed(symbol) {

  $.ajax({
    ///stock/aapl/batch?types=quote,news,chart&range=1m&last=1
    url: "https://api.iextrading.com/1.0/stock/" + symbol + "/batch?types=quote,news,chart&range=1m&last=10",

    method: "GET"
  }).then(function (response) {

    var stocknews = response.news
    // console.log(stocknews);
    $("#stocknews_id").empty()
    for (var i = 0; i < stocknews.length; i++) {

      var stockheadline = stocknews.headline
      var newsDiv = $("<div>")

      var link = $("<a>")
      var newsSource = $("<p>").text("Source: " + stocknews[i].source)
      var newsdateline = $("<p>").text("DateTime: " + stocknews[i].datetime)
      var newsPara = $("<p>").text("News: " + stocknews[i].headline)
      var newsURL = $("<p>").text("URL:" + stocknews[i].url)
      link.attr("href", stocknews[i].url)
      link.attr("target", "_blank")
      // newsURL.append(link);
      // newsURL.addClass("urlclass")
      link.append(newsURL)
      link.addClass("urlclass")
      newsDiv.append(newsdateline)
      newsDiv.append(newsSource)
      newsDiv.append(newsPara)
      // newsDiv.append(newsURL)
      newsDiv.append(link)

      // $("#stockcontent").append(newsDiv);
      $("#stocknews_id").append(newsDiv);
      $("#stocknews_id").append("</br>");
    }
  });
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
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
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
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
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
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
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

//  all frontend code like jquery and what not
$(document).ready(function () {

  $(document).on("click", ".button", function (e) {
    e.preventDefault();

    // getStocks();
    // location.reload();
    var get_input = $(".input").val().toUpperCase()
    get_input_ticker = get_input.split(" ", 1)
    // console.log("get_input_ticker: ", get_input_ticker)
    // console.log("get_input_ticker.join(): ", get_input_ticker.join())
    var ticker = get_input_ticker.join()
    var tickerObject = { ticker: ticker };
    // var stockId = $(this).data("id");
    // console.log("stock id = " + stockId);

    API.saveExample(tickerObject);
    // API.getExamples(tickerObject);

    // $.ajax({
    //   type: "PUT",
    //   url: "/api/examples",

    // }).then(getStocks); 

    //   $(".tradingview-widget-container").show();
    //   location.reload();


    // console.log("ticker: ",ticker)
    // console.log("tickers_already_used: ", tickers_already_used.indexOf(ticker))

    var is_real_ticker = false

    console.log("AMEX_tickers: ", AMEX_tickers.indexOf(ticker))
    if (AMEX_tickers.indexOf(ticker) > -1) {
      is_real_ticker = true;
    }
    console.log("NASDAQ_tickers: ", NASDAQ_tickers.indexOf(ticker))
    if (NASDAQ_tickers.indexOf(ticker) > -1) {
      is_real_ticker = true;
    }
    console.log("NYSE_tickers: ", NYSE_tickers.indexOf(ticker))
    if (NYSE_tickers.indexOf(ticker) > -1) {
      is_real_ticker = true;
    }
    console.log("is_real_ticker: ", is_real_ticker)
    if (is_real_ticker) {

      // if (tickers_already_used.indexOf(ticker) <= -1) {
      //   tickers_already_used.push(ticker);
      //   table(ticker)
      // }


      // async 
      function getStockData(ticker) {
        // await set_symbol(ticker)
        // await get_market_cap(ticker)
        // // await get_ticker_info(ticker)
        // await choose_price_api(ticker)
        // // await get_ticker_company(ticker)
        // await choose_name_api(ticker)
        // location.reload();
      }

      // getStockData(ticker)
      // newsfeed(ticker)
      // stockinfo(ticker)
      // // console.log("table_values: ", table_values)
      // location.reload();

      $(".input").val("")
      // location.reload();
      // update_chart(ticker)
      // $(".tradingview-widget-container").show()
      hide_news()
      // iex_price(ticker)
      // $('.symbol').removeAttr('style'); // removes the backgound for the selected ticker that was darkened 
      // location.reload();
    }
    //end is_real_ticker if()
  })
});

$(document).on("click", "#news_tab", function (e) {
  $("#info_tab").removeClass()
  $("#news_tab").addClass("is-active")
  show_news()
  hide_stockinfo()
});

$(document).on("click", "#info_tab", function (e) {
  $("#info_tab").addClass("is-active")
  $("#news_tab").removeClass()
  hide_news()
  show_stockinfo()
});

$(document).on("click", ".symbol", function (e) {
  $('.symbol').removeAttr('style'); // removes the backgound for the selected ticker that was darkened 
  var x = $(this)["0"];
  var y = $(this)["0"];
  console.log("y: ", y)

  var ticker_of_row = x.textContent;

  $(this).css('background-color', 'grey');
  update_chart(ticker_of_row)
  newsfeed(ticker_of_row)
  // stockinfo(ticker_of_row)
});

$(document).on("click", ".buttons", function (e) {
  // console.log("e",e.originalEvent.path)
  console.log("e", e)
  console.log("e", e.target.id)
  var x = e.target.id
  var y = x.split("_", 1)
  var z = y.join();
  console.log("z: ", z)

  $(this).closest('tr').remove()
  // tickers_already_used = []
  for (var i = 0; i < tickers_already_used.length; i++) {
    if (tickers_already_used[i] === z) {
      tickers_already_used.splice(i, 1);
    }
  }
});

$(document).on("click", "#deletebtn", function (e) {
  e.preventDefault();
  
  console.log("This is data-id: ", $(this).attr("data-id"));
  $.ajax({
    method: "DELETE",
    url: "/api/examples/" + $(this).attr("data-id")
  }).then(getStocks);
  location.reload();
});


/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), tickers_names);