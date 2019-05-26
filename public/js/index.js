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

// var tickers11 = [];
// var names = [];
// var tickers_names = [];

// tickers11 = tickers11.concat(AMEX_tickers);
// tickers11 = tickers11.concat(NASDAQ_tickers);
// tickers11 = tickers11.concat(NYSE_tickers);

// names = names.concat(AMEX_names);
// names = names.concat(NASDAQ_names);
// names = names.concat(NYSE_names);

// for(j=0;j<tickers11.length;j++){
//   tickers_names[j] = tickers11[j] + " " + names[j];
// }

// frontend functions
function table(ticker) {
  console.log("This is ticker in table: ", ticker)
  var symbol_table = $("<tr  class='hover1'>")
  // var placeHolder = "#"

  symbol_table.append(`<th id="${ticker}_symbol" class= "symbol" scope="col"></th>`)
  // symbol_table.append(`<th id="${ticker}_company" class= "company" scope="col"></th>`)
  // symbol_table.append(`<th id="${ticker}_price" class= "price" scope="col"></th>`)
  // symbol_table.append(`<th id="${ticker}_market" class= "market" scope="col"></th>`)
  // symbol_table.append(`<th class="del_button" scope="col"> <button ticker="${ticker}" class="buttons" id="${ticker}_deletebtn">delete</button></th>`)

  $("#table_content").append(symbol_table)
}

function set_symbol(x) {
  $("#" + x + "_symbol").text(x)
}

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

function stockinfo(symbol) {

  $.ajax({
    url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=MVG2GAAJUF1WORNH",
    method: "GET"
  }).then(function (response) {
    // console.log(response)

    var time_series = [];
    for (i in response["Time Series (Daily)"]) {
      time_series.push(i)
    }
    a = time_series[0].replace(/^\s+/, "")
    var openPrice = response["Time Series (Daily)"][a]["1. open"]
    // console.log(price);

    b = time_series[1].replace(/^\s+/, "")
    var highPrice = response["Time Series (Daily)"][b]["2. high"]

    c = time_series[2].replace(/^\s+/, "")
    var lowPrice = response["Time Series (Daily)"][c]["3. low"]

    d = time_series[3].replace(/^\s+/, "")
    var closePrice = response["Time Series (Daily)"][d]["4. close"]

    e = time_series[4].replace(/^\s+/, "")
    var volumePrice = response["Time Series (Daily)"][d]["5. volume"]

    // var symbol = $(".input").val();
    var symbolName = $("<div>");
    var p1 = $("<p>");
    p1.text("Symbol:  " + symbol);
    p1.addClass("para")

    var open = $("<div>");
    var p2 = $("<p>");
    p2.text("price: " + openPrice)
    p2.addClass("para")

    var high = $("<div>")
    var p3 = $("<p>");
    p3.text("High Price   " + highPrice);
    p3.addClass("para")

    var low = $("<div>");
    var p4 = $("<p>");
    p4.text("low price " + lowPrice);
    p4.addClass("para")

    var close = $("<div>");
    var p5 = $("<p>");
    p5.text("close price " + closePrice)
    p5.addClass("para")

    var volume = $("<div>");
    var p6 = $("<p>")
    p6.text("Volume " + volumePrice)
    p6.addClass("para")

    symbolName.append(p1)
    open.append(p2)
    high.append(p3)
    low.append(p4)
    close.append(p5)
    volume.append(p6)

    $("#stockinfo_id").empty();
    $("#stockinfo_id").append(symbolName)
    $("#stockinfo_id").append(open)
    $("#stockinfo_id").append(high)
    $("#stockinfo_id").append(low)
    $("#stockinfo_id").append(close)
    $("#stockinfo_id").append(volume)
  });
};

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


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/saveticker",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      // url: "/",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

function gittickers() {

  $.get("/api/getuserid", function (req, res) {
    console.log("/api/getuserid.req", req.userid)
    console.log("/api/getuserid.res", res)
    var savetodatabaseid = {
      user_id: req.userid
    };
    console.log("savetodatabaseid", savetodatabaseid)
    API.getExamples(savetodatabaseid).then(function (data) {
      // console.log("Save Ticker To Database", req)
      console.log("data: ", data)
      for (i = 0; i < data.length; i++) {
        console.log("data[i].ticker: ", data[i].ticker)
        table(data[i].ticker)
        set_symbol(data[i].ticker)
  
      }
    });

  });


  // API.getExamples().then(function (data) {
  //   console.log("data: ", data)
  //   for (i = 0; i < data.length; i++) {
  //     console.log("data[i].ticker: ", data[i].ticker)
  //     table(data[i].ticker)
  //     set_symbol(data[i].ticker)

  //   }

  // });

}


//  all frontend code like jquery and what not
$(document).ready(function () {

  gittickers()


  $(document).on("click", ".button", function (e) {
    event.preventDefault();
    // $.ajax({
    //   method: "GET",
    //   url: "/api/getuserid"
    // })
    //   .then(function(res) {
    //     console.log("AAAAAAAAAAAA")
    //     console.log("AAAAAAAAAAAA",res)
    //   });



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
        // await get_market_cap(ticker)
        // // await get_ticker_info(ticker)
        // await choose_price_api(ticker)
        // // await get_ticker_company(ticker)
        // await choose_name_api(ticker)
      }


      $.get("/api/getuserid", function (req, res) {
        console.log("/api/getuserid.req", req.userid)
        console.log("/api/getuserid.res", res)
        var savetodatabase = {
          ticker: ticker,
          user_id: req.userid
        };
        console.log("savetodatabase", savetodatabase)
        API.saveExample(savetodatabase).then(function () {
          // console.log("Save Ticker To Database", req)
        });

      });

      getStockData(ticker)
      newsfeed(ticker)
      stockinfo(ticker)
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
