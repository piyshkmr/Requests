let customParams = {};

/**
 * make a get request and fetch data
 * @param url of the api with endpoints
 * @returns response and status code
 */
const getRequest = async (url) => {
  document.getElementById("outputContainer").innerText = "Please Wait ...";

  // requesting data from api
  const res = await fetch(url);
  // getting data and extracting in text
  const data = await res.text();

  return { data: data, status: res.status };
};

/**
 * make a post request and fetch data
 * @param url of the api with endpoints
 * @returns the response and status code
 */

const postRequest = async (url) => {
  let body;
  // checks if body type json or custom parameters
  if (document.getElementById("bodyContentType").value === "JSON") {
    body = document.getElementById("bodyJson").value;
  } else {
    body = JSON.stringify(customParams);
  }

  // making post Request
  const res = await fetch(url, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  // getting data and extracting in text
  const data = await res.text();

  return { data: data, status: res.status };
};

function loading() {
  const button = document.getElementById("button-submit");
  button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...`;
}

/**
//  * gets the url and check whether method is get or post and accordingly call thier methods and the the url and get the resposnse from methods and show on output
 */

const sendRequest = async () => {
  // getting url
  const url = document.getElementById("url").value;
  // checks the url
  if (url) {
    const method = document.getElementById("method").value;
    let response;
    // checks the method
    if (method === "GET") {
      loading();
      response = await getRequest(url);
    } else if (method === "POST") {
      loading();
      response = await postRequest(url);
    }

    // showing the outputs
    const outputContainer = document.getElementById("outputContainer");
    document.getElementById("status").innerHTML = response.status;
    outputContainer.innerHTML = response.data;
    Prism.highlightAll();
    document.getElementById("button-submit").innerHTML = "Send";
  } else {
    alert("Please enter the url");
  }
};

/**
 * changes the body content type
 */

const bodyContentChange = () => {
  const bodyContentType = document.getElementById("bodyContentType").value;
  if (bodyContentType === "JSON") {
    document.getElementById("customParams").style.display = "none";
    document.getElementById("bodyJson").style.display = "block";
  } else if (bodyContentType === "CUSTOM") {
    document.getElementById("bodyJson").style.display = "none";
    document.getElementById("customParams").style.display = "flex";
  }
};

/**
 * adds custom ekey value pairs
 */

const addKeyValuePairs = () => {
  const bodyContent = document.getElementById("bodyContent");
  const key = document.getElementById("key").value;
  const value = document.getElementById("value").value;
  if (!key || !value) {
    alert("Please enter key and value both to add on parameters");
    return;
  }
  customParams = { ...customParams, [key]: value };

  bodyContent.innerHTML += `<div class="row my-2" id="${key}" >
    <div class="col-md-5">
      <input type="text" class="form-control" value=${key} />
    </div>
    <div class="col-md-5">
      <input type="text" class="form-control" value=${value} />
    </div>
    <div class="col-md-2">
      <button onclick="removeParam(this)"  class="btn button"> -</button>
    </div>
  </div>`;
};

/**
 * removes key value pairs from custom params objects and also in body
 * @param e means current element
 */

const removeParam = (e) => {
  const key = e.parentElement.parentElement.childNodes[1].childNodes[1].value;
  const a = delete customParams[key];
  e.parentElement.parentElement.remove();
};
