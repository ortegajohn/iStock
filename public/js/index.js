// gloval variables
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

var API = {
  saveExample: function(example) {
    console.log("example: " + example);
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  }
}

  // Getting todos from database when page loads
  getStocks();

  // This function resets the todos displayed with new todos from the database
  function initializeRows() {
    $tablecontent.empty();
    var stocksToAdd = [];
    for (var i = 0; i < stocks.length; i++) {
      stocksToAdd.push(createNewRow(stocks[i]));
    }
    $tablecontent.prepend(stocksToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getStocks() {
    $.get("/api/examples", function(data) {
      // stocks = data;
      // initializeRows();
    });
  }

  // function createNewRow(stocks) {
  //   var $newInputRow = $(
  //     [
  //       "<li class='list-group-item todo-item'>",
  //       "<span>",
  //       stocks.id + " ",
  //       stocks.name,
  //       stocks.price,
  //       stocks.percentChange,
  //       stocks.dayHigh,
  //       stocks.dayLow,
  //       stocks.marketCap,
  //       "</span>",
  //       "<input type='text' class='edit' style='display: none;'>",
  //       "</li>"
  //     ].join("")
  //   );

  //   $newInputRow.find("button.delete").data("id", stocks.id);
  //   $newInputRow.find("input.edit").css("display", "none");
  //   $newInputRow.data("stocks", stocks);
  //   if (stocks.complete) {
  //     $newInputRow.find("span").css("text-decoration", "line-through");
  //   }
  //   return $newInputRow;
  // }

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

for(j=0;j<tickers11.length;j++){
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

//  all frontend code like jquery and what not
$(document).ready(function () {

  $(document).on("click", ".button", function (e) {
    event.preventDefault();
    var get_input = $(".input").val().toUpperCase()
    get_input_ticker = get_input.split(" ", 1)
    console.log("get_input_ticker: ", get_input_ticker)
    console.log("get_input_ticker.join(): ", get_input_ticker.join())
    var ticker = get_input_ticker.join()
    var tickerObject = {ticker: ticker};

    API.saveExample(tickerObject);

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


      async function getStockData(ticker) {
        // await set_symbol(ticker)
        // await get_market_cap(ticker)
        // // await get_ticker_info(ticker)
        // await choose_price_api(ticker)
        // // await get_ticker_company(ticker)
        // await choose_name_api(ticker)
      }

      getStockData(ticker)
      // newsfeed(ticker)
      // stockinfo(ticker)
      // // console.log("table_values: ", table_values)

      $(".input").val("")
      update_chart(ticker)
      $(".tradingview-widget-container").show()
      hide_news()
      // iex_price(ticker)
      $('.symbol').removeAttr('style'); // removes the backgound for the selected ticker that was darkened 
    }//end is_real_ticker if()
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
    stockinfo(ticker_of_row)
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
});

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
// autocomplete(document.getElementById("myInput"), tickers_names);