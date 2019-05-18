

// bring overjquery functions from original code and store in orm

var orm = {
    get_index: function (ticker) {
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
    },
    update_chart: function (ticker) {
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
            });
    },
    table: function (ticker) {
        var symbol_table = $("<tr  class='hover1'>")

        symbol_table.append(`<th id="${ticker}_symbol" class= "symbol" scope="col"></th>`)
        symbol_table.append(`<th id="${ticker}_company" class= "company" scope="col"></th>`)
        symbol_table.append(`<th id="${ticker}_price" class= "price" scope="col"></th>`)
        symbol_table.append(`<th id="${ticker}_market" class= "market" scope="col"></th>`)
        symbol_table.append(`<th class="del_button" scope="col"> <button ticker="${ticker}" class="buttons" id="${ticker}_deletebtn">delete</button></th>`)

        $("#table_content").append(symbol_table)
    },
    set_symbol: function (x) {
        $("#" + x + "_symbol").text(x)
    },
    get_ticker_company: function (ticker) {
        $.ajax({
            url: "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + ticker + "&apikey=VWWIWESKA8BRE45M",
            method: "GET"
        }).then(function (response2) {
            // console.log("response2: ",response2.bestMatches[0]["2. name"])
            company = response2.bestMatches[0]["2. name"]
            // set_company(company)
            $("#" + ticker + "_company").text(response2.bestMatches[0]["2. name"])
        });//.then
    },
    worldtradingdata_ticker_company: function (ticker) {
        $.ajax({
            url: "https://www.worldtradingdata.com/api/v1/stock?symbol=" + ticker + "&api_token=NwKKaeNpI8lA9hVpjtqqdvqYWWqHf7EMegaRidS6DdgdwVja8b67OyCdH9n7",
            method: "GET"
        }).then(function (response) {
            var worldtradingdata_name = response.data[0].name
            console.log("worldtradingdata_name: ", response.data[0].name)
            $("#" + ticker + "_company").text(worldtradingdata_name)
        });
    },
    iex_company: function (symbol) {
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + symbol + "/batch?types=quote",
            method: "GET"
        }).then(function (response) {
            var iex_p_name = response.quote.companyName
            console.log("iex_name: ", response.quote.companyName)
            $("#" + symbol + "_company").text(iex_p_name)
        });
    },
    choose_name_api: function (ticker) {
        if (rotate_name_api === 0) {
            rotate_name_api = 1;
            console.log("Using worldtradingdata name")
            worldtradingdata_ticker_company(ticker)
        } else if (rotate_name_api === 1) {
            rotate_name_api = 2;
            console.log("Using iex name")
            iex_company(ticker)
        } else if (rotate_name_api === 2) {
            rotate_name_api = 0;
            console.log("Using alpha name")
            get_ticker_company(ticker)
        }
    },
    choose_price_api: function (ticker) {
        if (rotate_price_api === 0) {
            rotate_price_api = 1;
            console.log("Using alpha price")
            get_ticker_info(ticker)
        } else if (rotate_price_api === 1) {
            rotate_price_api = 2;
            console.log("Using iex price")
            iex_price(ticker)
        } else if (rotate_price_api === 2) {
            rotate_price_api = 3;
            console.log("Using unibit_price price")
            unibit_price(ticker)
        } else if (rotate_price_api === 3) {
            rotate_price_api = 0;
            console.log("Using worldtradingdata price")
            worldtradingdata_price(ticker)
        }
    },
    get_ticker_info: function (ticker) {
        var time_series = [];

        $.ajax({
            // url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&apikey=VWWIWESKA8BRE45M",
            //https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo
            url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + ticker + "&apikey=VWWIWESKA8BRE45M",
            method: "GET"
        }).then(function (response) {
            // console.log("response: ",response)
            price = response["Global Quote"]["05. price"]
            var two_dec_format = sting_to_float(price)
            $("#" + ticker + "_price").text(two_dec_format)

            var pricedb1 = firebase.database().ref(ticker);
            pricedb1.update({
                pricedb: two_dec_format
            });
            // console.log("fb_price "+ticker +": "+get_fb_price(ticker) )
            $("#" + ticker + "_price").text(get_fb_price(ticker))
        });//.then  
    },
    sting_to_float: function (x) {
        var r = parseFloat(x)
        var aq = r.toFixed(2)
        return "$" + aq
    },
    iex_price: function (ticker) {
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + ticker + "/batch?types=quote",
            method: "GET"
        }).then(function (response) {
            var iex_p = response.quote.latestPrice
            var two_dec_format = sting_to_float(iex_p)
            // console.log("iex: ",response.quote.latestPrice)
            $("#" + ticker + "_price").text(two_dec_format)
            var pricedb1 = firebase.database().ref(ticker);
            pricedb1.update({
                pricedb: iex_p
            });
            $("#" + ticker + "_price").text(get_fb_price(ticker).toFixed(2))
        });
    },
    worldtradingdata_price: function (ticker) {
        $.ajax({
            url: "https://www.worldtradingdata.com/api/v1/stock?symbol=" + ticker + "&api_token=NwKKaeNpI8lA9hVpjtqqdvqYWWqHf7EMegaRidS6DdgdwVja8b67OyCdH9n7",
            method: "GET"
        }).then(function (response) {
            var worldtradingdata = response.data[0].price
            var two_dec_format = sting_to_float(worldtradingdata)
            console.log("intrinio: ", response.data[0].price)
            $("#" + ticker + "_price").text(two_dec_format)
            var pricedb1 = firebase.database().ref(ticker);
            pricedb1.update({
                pricedb: two_dec_format
            });
            $("#" + ticker + "_price").text(get_fb_price(ticker).toFixed(2))
        });
    },
    unibit_price: function (ticker) {
        $.ajax({
            url: "https://api.unibit.ai/realtimestock/" + ticker + "?size=1&datatype=json&AccessKey=uL7aYHqtSvJIxAXo9XfS4-_0cNDx5faU",
            method: "GET"
        }).then(function (response) {
            var unibit_price = response[0].price
            var two_dec_format = sting_to_float(unibit_price)
            console.log("unibit_price: ", response[0].price)
            $("#" + ticker + "_price").text(two_dec_format)
            var pricedb1 = firebase.database().ref(ticker);
            pricedb1.update({
                pricedb: two_dec_format
            });
            $("#" + ticker + "_price").text(get_fb_price(ticker).toFixed(2))
        });
    },
    stockinfo: function (symbol) {
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
    },
    newsFeed: function (symbol) {
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
    },
    hide_news: function() {
        $("#stocknews_id").hide()
    },
    show_news: function() {
        $("#stocknews_id").show()
    },
    hide_stockinfo: function() {
        $("#stockinfo_id").hide()
    },
    show_stockinfo: function() {
    $("#stockinfo_id").show()
    }
};