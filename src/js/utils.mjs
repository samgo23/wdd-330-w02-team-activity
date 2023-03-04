// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  let jsonData;
  try {
    jsonData = JSON.stringify(data);
  } catch (e) {
    console.error(`Error parsing data to JSON: ${e}`);
    return;
  }
  localStorage.setItem(key, jsonData);
}


// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//create new function getParam that will get the parameter from the URL

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  
  const htmlStrings = list.map(templateFn);

  // if clear is true we need to clear out the contents of the parent.
  if (clear == true) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {

  parentElement.insertAdjacentHTML("afterbegin", template); 
  
  //if there is a callback...call it and pass data
  if(callback) {
    callback(data);
  }
}

async function loadTemplate(path) {

  const response = await fetch(path);

  if (response.ok) { // if HTTP-status is 200-299 get the response body
    const template = await response.text();
    return template;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

// Function that dynamically loads the header and footer into a page:
    export async function loadHeaderFooter() {
  // Set paths:
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  // Grab header & footer elements out of the DOM:
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  // Render the header & footer:
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  if (JSON.parse(localStorage.getItem("so-cart"))) {
    cartSuperscript();
  }
  newsletter();
}

// add a superscript numebr over the backpack icon to show how many items are in the cart
function cartSuperscript() {
  // Retrieve the value saved in the "so-cart" key of the local storage
  const cartValue = localStorage.getItem("so-cart");

  // Convert the retrieved value to an array of objects
  const cartArray = JSON.parse(cartValue);

  // Get the length of the array to determine the number of items in the cart
  const numInCart = cartArray.length;

  // Find the HTML element with the id "numberInCart"
  const numInCartElement = document.getElementById("numberInCart");

  // Set the innerHTML of the element to the value retrieved from local storage
  numInCartElement.innerHTML = numInCart;
}

function newsletter() {
  // Get the button and the sign-up form elements
  const signupBtn = document.getElementById("signup-btn");
  const signupForm = document.getElementById("signup-form");

  // Show the sign-up form when the button is clicked
  signupBtn.addEventListener("click", function() {
    signupBtn.style.display = "none";
    signupForm.style.display = "block";
  });

  // Handle form submission
  const form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    // Send the email address to the server to sign up for the newsletter
    // You would need to implement this server-side functionality yourself
    console.log("Signed up with email:", email);
    // Hide the form after submission
    signupForm.style.display = "none";
  });

}

// Create an alert messege on the top of the main:
export function alertMessage(message, scroll = true) {
  // Create element to hold the alert:
  const alert = document.createElement("div");
  // Add a class to style the alert:
  alert.classList.add("alert");
  // Set the contents:
  alert.innerHTML = (`<p>${message}</p><span>X</span>`);

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function(e) {
      if ( e.target.tagName == "SPAN") {
        main.removeChild(this);
      }
  });
  // Add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  
  if (scroll) {
    window.scrollTo(0,0);
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}