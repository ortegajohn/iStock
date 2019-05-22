
// gloval variables
var price;
var company;
var tickers_already_used = [];
var rotate_price_api = 0;
var rotate_name_api = 0;

var html_col_values = {
  column_symbol: $("<th>"),
  column_company: $("<th>"),
  column_price: $("<th>"),
  column_market: $("<th>")
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

for(j=0;j<tickers11.length;j++){
  tickers_names[j] = tickers11[j] +" " +names[j];
}

// frontend functions




//  all frontend code like jquery and what not
$(document).ready(function () {

  $(document).on("click", ".button", function (e) {
    event.preventDefault();
    var get_input = $(".input").val().toUpperCase()
    get_input_ticker = get_input.split(" ", 1)
    console.log("get_input_ticker: ", get_input_ticker)
    console.log("get_input_ticker.join(): ", get_input_ticker.join())
    var ticker = get_input_ticker.join()

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

      if (tickers_already_used.indexOf(ticker) <= -1) {
        tickers_already_used.push(ticker);
        table(ticker)
      }

      async function getStockData(ticker) {
        await set_symbol(ticker)
        await get_market_cap(ticker)
        // await get_ticker_info(ticker)
        await choose_price_api(ticker)
        // await get_ticker_company(ticker)
        await choose_name_api(ticker)
      }

      orm.getStockData(ticker)
      orm.newsfeed(ticker)
      orm.stockinfo(ticker)
      // console.log("table_values: ", table_values)

      $(".input").val("")
      orm.update_chart(ticker)
      $(".tradingview-widget-container").show()
      orm.hide_news()
      // iex_price(ticker)
      $('.symbol').removeAttr('style'); // removes the backgound for the selected ticker that was darkened 
    }//end is_real_ticker if()
  });

  $(document).on("click", "#news_tab", function (e) {
    $("#info_tab").removeClass()
    $("#news_tab").addClass("is-active")
    orm.show_news()
    orm.hide_stockinfo()
  });

  $(document).on("click", "#info_tab", function (e) {
    $("#info_tab").addClass("is-active")
    $("#news_tab").removeClass()
    orm.hide_news()
    orm.show_stockinfo()
  });

  $(document).on("click", ".symbol", function (e) {
    $('.symbol').removeAttr('style'); // removes the backgound for the selected ticker that was darkened 
    var x = $(this)["0"];
    var y = $(this)["0"];
    console.log("y: ", y)

    var ticker_of_row = x.textContent;

    $(this).css('background-color', 'grey');
    orm.update_chart(ticker_of_row)
    orm.newsfeed(ticker_of_row)
    orm.stockinfo(ticker_of_row)
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
orm.autocomplete(document.getElementById("myInput"), tickers_names);