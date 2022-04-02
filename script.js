const quoteContainer = document.getElementById("quote-container");
const apiUrl = "https://type.fit/api/quotes";
const quoteLabel = document.getElementById("quote");
const authorLabel = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const showLoadingSpinner = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = function () {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

//? Get Quote from API
const getQuotes = async function () {
  showLoadingSpinner();
  try {
    const response = await fetch(apiUrl);
    const apiQuotes = await response.json();
    const randomNumber = [Math.floor(Math.random() * apiQuotes.length)];

    //* Get Quote and Author
    const [quote, author] = [
      apiQuotes[randomNumber].text,
      (apiQuotes[randomNumber].author ??= "Anonymous"),
    ];
    //* Set quote
    authorLabel.textContent = author;

    //* Dinamycally reduce font size for long quotes
    quote.length > 120
      ? quoteLabel.classList.add("long-quote")
      : quoteLabel.classList.remove("long-quote");

    //* Set quote
    quoteLabel.textContent = quote;
    removeLoadingSpinner();
  } catch (err) {
    console.log(err.message);
    getQuotes();
  }
};

//? Tweet Quote
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteLabel.textContent}-${authorLabel.textContent}`;
  window.open(twitterUrl, "_blank");
};

//? Event Listener
newQuoteButton.addEventListener("click", getQuotes);
twitterButton.addEventListener("click", tweetQuote);
