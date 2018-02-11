/******************************************************************************* 
 * Topic 3: JSON
 *   JSON Parse
 *   Stringify
 * Topic 4: XMLHTTPRequest
 *   Using XMLHTTPRequest to Consume a JSON Web Service
*******************************************************************************/

// define the empty quote object
let quote = {
    quote: "",
    author: "",
    permalink: "",
    tweetURL: "https://twitter.com/intent/tweet?text="
};

// publish first quote
getRandomQuote();

// get new quote when #getMessage clicked
document.querySelector('#getMessage').addEventListener('click', getRandomQuote);

// tweet quote when #tweet clicked
document.querySelector('#tweet').addEventListener('click', tweet);


// changes html to match new quote
let changeQuote = function(data) {
    document.querySelector('.message').textContent = `C:\\> ${data.quote}`;
    document.querySelector('.author').innerHTML = `<br> - ${data.author}`;
    document.querySelector('.permalink').innerHTML = `<br><a class="dos-prompt-text" href=" ${data.permalink} "target="_blank">C:\\> Permalink</a>`;
}

let getRandomQuote = function() {
    // create handle to XMLHttpRequest object
    var xhttp = new XMLHttpRequest();
    // set the onreadystatechange behavior
    // 0 UNSENT             Client has been created. open() not called yet.
    // 1 OPENED             open() has been called.
    // 2 HEADERS_RECEIVED   send() has been called, and headers and status are available.
    // 3 LOADING            Downloading; responseText holds partial data.
    // 4 DONE               The operation is complete.
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            processJSON(this.responseText);
        }
    };
    // Initializes a request (method, url, async, user, password)
    xhttp.open("GET", "http://quotes.stormconsultancy.co.uk/random.json", true);
    // Sends the request (data)
    xhttp.send();
};

function processJSON (text) {
    var data = JSON.parse(text);
    console.log(data);
    var string = JSON.stringify(data);
    console.log(string);
    quote.quote = data.quote;
    quote.author = data.author;
    quote.permalink = data.permalink;
    changeQuote(quote);
}

/*
// retreives new JSON quote object from external source
let getRandomQuote = function() {
    fetch('http://quotes.stormconsultancy.co.uk/random.json')
      .then(function(response) { 
      // Convert to JSON
      return response.json();
    }).then(function(data) {
        quote.quote = data.quote;
        quote.author = data.author;
        quote.permalink = data.permalink;
        changeQuote(quote);
    }).catch(function(err) {
        quote.quote = "oops! something went wrong";
        quote.author = "error";
        quote.permalink = "";
        changeQuote(quote)
        console.log(err);
        throw new Error("Failed to fetch!");
    });
};
*/

// open up tweet box in new window
let tweet = function() {
    var url = quote.tweetURL;
    window.open(url.concat(quote.quote.split(" ").join("+")), "_blank");
};