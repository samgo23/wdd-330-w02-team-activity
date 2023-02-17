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

}