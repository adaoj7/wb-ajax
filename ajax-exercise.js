import axios from 'axios';

// PART 1: Show Dog Photo

async function showDogPhoto(evt) {
  // waits for the async data from the API which allows our server to communicate with another server and get data using parsed data called JSON or javascript object notation
  const response = await axios.get("https://dog.ceo/api/breeds/image/random")
  // within that data, which is a large string, we need to access the files we want in this case the url picture of the dog. We then save that to a variable to be used.
  const imgUrl = response.data.message
  console.log(imgUrl)
  // then we pass that variable into the dive with the id 'dog image' and insert it into an image tag which using template literals passes in our variable into the string thus showing us the image of the dog.
  document.querySelector("#dog-image").innerHTML =`<img src=${imgUrl}>`
}
// ** the function is not called until the click, and the async nature of the function means that it does not have to load the whole html page again just the function that was called
// waits for clicks on the button created in the html that calls the function showDogPhoto
document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;
  const url =`/weather.txt?zipcode=${zipcode}`
  const response = await axios.get(url)

  // TODO: request weather with that URL and show the forecast in #weather-info
  console.log(url)
  document.querySelector('#weather-info').innerText = response.data
}
// *start here
document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  evt.preventDefault()
  const cookieOrder = {}
  const cookieType = document.querySelector('#cookie-type-field').value
  const qty = document.querySelector('#qty-field').value
  cookieOrder.cookieType = cookieType
  cookieOrder.qty = qty
  console.log(cookieOrder)
  const response = await axios.post('/order-cookies.json',cookieOrder)

  // TODO: show the result message after your form
  console.log(response)
  // document.querySelector('#order-status').innerText = response.data.message

  const orderStat = document.querySelector('#order-status')
  console.log(orderStat)
  orderStat.innerText = response.data.message
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  if (response.data.resultCode === 'ERROR'){
    orderStat.classList.add('order-error')
  } else {
    orderStat.classList.remove('order-error')
  }

}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  const formData = {'term': searchTerm};
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;
  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
const response = await axios.get(url)
let displayString = ''
console.log(response.data.results[0].artistName)
for (const element of response.data.results) {
  // const {artistName,trackName} = response.data.results[result]
  // let i = 0
  // console.log(response.data.results[i].trackName)
  // let j = 1
  // console.log(response.data.results[j].trackName)

  // i += 1
  console.log(element.artistName)

  // console.log(response.data.results[result].trackName)

  // let artistName = response.data.results[result].artistName.value
  // let trackName = response.data.results[result].trackName.value
  // console.log(response.data.results)
  displayString += `<li>Artist: ${element.artistName} Song: ${element.trackName}</li>`
}
document.querySelector('#itunes-results').innerHTML = displayString
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
