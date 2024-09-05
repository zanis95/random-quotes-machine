document.addEventListener("DOMContentLoaded", async function () {
    const textElement = document.getElementById("text");
    const authorElement = document.getElementById("author");
    const buttonElement = document.getElementById("new-quote");
  
    function getRandomValue() {
      return Math.random() * 255;
    }
  
    async function fetchquote() {
      try {
        textElement.textContent = "Loading...";
        authorElement.textContent = "-???";
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (data.hasOwnProperty("content")) {
          textElement.innerHTML =
            '<i class="fas fa-quote-left"></i> ' + data.content;
          authorElement.textContent = `-${data.author}`;
          document.documentElement.style.setProperty(
            "--randcolor-color1",
            `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`
          );
        } else {
          textElement.textContent =
            "I couldn't find any quotes at the moment. Please try again later";
          authorElement.textContent = "";
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
        textElement.textContent =
          "I couldn't find any quotes at the moment. Please try again later";
        authorElement.textContent = "";
      } finally {
        buttonElement.blur();
      }
    }
  
    buttonElement.addEventListener("click", fetchquote);
  
    // Initial new quote
    fetchquote();
  });
  