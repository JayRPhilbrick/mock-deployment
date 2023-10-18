# Project Details

## Project Name

Mock

## Team Members and Contributions

Blake Horne - behorne

Jay Philbrick - jphilbr1

### Contributions:

We split this project roughly equally -- we divided particular features between the two of us, completed them separately, and then reviewed and edited each other's code to imrpove understandinga and functionality. We also co-wrote some code. We met in-person and completed almost all code together in-person.

In terms of features that were tackled separately:

Jay handled: search, mock data, load_file
Blake handled: view, mode, history, formatting output, refactoring code, 

### Total Estimated Time for Completion

11 hours

## Repository Link

https://github.com/cs0320-f23/mock-behorne-jphilbr1

# Design Choices

The main functionality of the program is shared between three classes: REPL, REPLHistory, and REPLInput. 

REPL is the top level class of the project and contains REPLHistory and REPLInput. 

REPLHistory is responsible for displaying the responses sent by the application. The command and output history is stored as an array of 2D arrays of strings: the code takes each 2D array and turns it to an HTMLTable to be displayed. We learned to do this with help from an outside source at https://www.geeksforgeeks.org/how-to-build-an-html-table-using-reactjs-from-arrays/, which does the same function in JavaScript. 

REPLInput is responsible for handling submissions to the application. It reads a command and calls for a function that mocks the functionality that would be performed on the backend. To do our mocking we created maps which map from pretend parameters to datasets. These are stored in a class called mockedJson. Other data structures we used besides the maps were booleans to represent things like if a file is loaded, if a file is loaded with headers, etc. Also as previously mention, our history was done as string[][][], which made it easy to add single word outputs as well as the datasets to our responses.

## Data Structures

History: String[][][]
CSV Body: String[][]
CSV Headers: String[]

Filename to Search Results Map: Map from string to (Map from string[] to string[][])
The latter represents a Map from search parameters to search results for a given file

# Errors/Bugs

We have no known errors or bugs at this time. 

# Tests

For our tests, we first tested basic expected responses of our program. Then we began to look at ways to give the program issues such as sending ill-formed commands, repeatedly loading files, repeatedly calling mode, etc.

We include both unit testing of single commands as well as integration testing of sets of commands, testing both on different shapes of data as well. 

# How To…

## Run the Program

The server is started with the terminal command npm start. Then, navigating to the URL http://localhost:8000/ loads the web interface. Commands can be issued into the text box provided by typing them, then clicking the submit button.

Supported commands are:

### load_file

Syntax: load_file filepath {has_headers}

This command loads a CSV file with a specified filepath into memory. It makes a call to the mocked data, using the specified filepath as a key, to obtain the CSV body and, optionally, the data headers. The has_headers optional argument defaults to false, meaning a CSV is loaded, but its first row is not set as the headers. If has_headers is true, a CSV is loaded with its first row as the headers.

### view

Syntax: view

This command displays the currently loaded CSV in a table. If no CSV is loaded, an error message is printed. 

### search

Syntax: search column value

This command searches a loaded CSV file's given column for a specific value, returning any row where that column is equal to the provided value. It makes a call to the mocked data, using the specified filepath as a key, to obtain the map from search parameters to search results, then passes in the search parameters into this map to obtain results.

The column argument can either be a column index, for all CSVs, or a column name, if the CSV was loaded with the has_headers boolean as true. 

Searches that return empty results output an error message.


## Run the Tests You Wrote/Were Provided

To run tests: `npx playwright test`

To run tests in UI mode: `npx playwright test --ui`