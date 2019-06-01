# iStock

### Overview

The user can search for a stock by typing in the ticker and selecting from a dropdown list. Then clicking "search stock" the stock will be displayed to a table.  Stocks that have been search for are saved to the SQL database.  If the user creates an account and logs in the stocks they have search for before will be displayed.  Once a stock is displayed in the table the user can click the "Remove" button and the stock will be removed from the table on the page and from the database. Clicking the stock ticker button will display a chart of the stock below the table.

### Technologies Used

This is a Node application.

* Express: Used for the server
* Passport.js: Authentication/Login
* mysql and sequelize: Database interaction
* Request: Server side api requests
* Handlebars: HTML page managment

### Deployed On Heroku

https://istock-tropic.herokuapp.com/
