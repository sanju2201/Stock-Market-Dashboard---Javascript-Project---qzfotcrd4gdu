

// key ==> 3KSL9WN0OHTD9PZI
// Examples (click for JSON output)
// https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo */


// fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=5min&apikey=3KSL9WN0OHTD9PZI")
//   .then((res) => res.json())
//   .then((fetchedObj) => {
//     console.log(fetchedObj);


//   })
//   .catch((error) => {
//     console.log("ERROR IN API CALL", error);
//   });


  const localData ={
    "Meta Data": {
        "1. Information": "Intraday (5min) open, high, low, close prices and volume",
        "2. Symbol": "AMZN",
        "3. Last Refreshed": "2023-01-30 20:00:00",
        "4. Interval": "5min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
    },
    "Time Series (5min)": {
        "2023-01-30 20:00:00": {
            "1. open": "136.3700",
            "2. high": "135.3700",
            "3. low": "135.3700",
            "4. close": "135.3700",
            "5. volume": "248"
        },
        "2023-01-30 19:55:00": {
            "1. open": "136.3700",
            "2. high": "135.3900",
            "3. low": "135.3900",
            "4. close": "135.3900",
            "5. volume": "285"
        },
        "2023-01-30 19:50:00": {
            "1. open": "132.3700",
            "2. high": "135.3900",
            "3. low": "135.3900",
            "4. close": "135.3900",
            "5. volume": "285"
        },
        "2023-01-30 19:45:00": {
            "1. open": "139.3700",
            "2. high": "135.3900",
            "3. low": "135.3900",
            "4. close": "135.3900",
            "5. volume": "285"
        },
        "2023-01-30 19:40:00": {
            "1. open": "131.3700",
            "2. high": "135.3900",
            "3. low": "135.3900",
            "4. close": "135.3900",
            "5. volume": "285"
        },
    }
}

// console.log(myObj["work"]);
const mainContainer = document.getElementById("container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const optionButton = document.querySelectorAll(".option-button");
const intraday = document.getElementById("intraday");
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");
const listContainer = document.getElementById("watchlist-container");
let closeButton = document.getElementById("close");


// Watchlist to be stored in local Storage
const myWatchlist = new Map();
// localStorage.setItem("myList",myWatchlist);

// ///////// Active Button /////////////
optionButton.forEach((item)=>{
    item.addEventListener("click",()=>{
        changeActiveItem();
        item.classList.add("active");
        // console.log(item.value);
    })
});

const changeActiveItem = ()=>{
optionButton.forEach((item)=>{
    item.classList.remove("active");
})
};

// //////// Taking Data from Input ///////////
/*
searchButton.addEventListener("click", ()=>{
let symbol = searchInput.value;
let type = document.querySelector(".option-button.active").value;

if(symbol && type){
changeActiveItem();

 // here to fetch API based on the symbol and type

let fetchSymbol = fetchedObj["Meta Data"]["2. Symbol"];
let fetchType = fetchedObj["Meta Data"]["1. Information"].split(" ")[0];

let output = fetchedObj["Time Series (5min)"];
let openPrice = Object.keys(output);
let currentPrice = output[openPrice[0]]["1. open"];
let oldPrice = output[openPrice[1]]["1. open"];
 
createNewListElement(fetchSymbol, currentPrice, oldPrice, fetchType);

searchInput.value = "";
type = "";
}
});

*/

searchButton.addEventListener("click", ()=>{
let symbol = searchInput.value;
let type = document.querySelector(".option-button.active").value;
// console.log(symbol)
// console.log(type)

if(symbol && type){
changeActiveItem();

fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${type}&symbol=${symbol}&interval=5min&apikey=3KSL9WN0OHTD9PZI`)
  .then((res) => res.json())
  .then((fetchedObj) => {  
let fetchSymbol = fetchedObj["Meta Data"]["2. Symbol"];
let fetchType = fetchedObj["Meta Data"]["1. Information"].split(" ")[0];

let mainKeys = Object.keys(fetchedObj);
let output = fetchedObj[mainKeys[1]];

let openPrice = Object.keys(output);
let currentPrice = output[openPrice[0]]["1. open"];
let oldPrice = output[openPrice[1]]["1. open"];

createNewListElement(fetchedObj, fetchSymbol, currentPrice, oldPrice, fetchType);
searchInput.value ="";
symbol= "";
type = "";
console.log("then chlra ha")
 })
 .catch((error) => {
     symbol= "";
     type = "";
     searchInput.value = "";
     console.log("ERROR IN API CALL",error);
    // alert("Wrong Symbol Entered");
  });
}
});



// Function to check for input and if not Present add to watchlist
function createNewListElement(fetchedObj, fetchSymbol, currentPrice, oldPrice, fetchType){
if (myWatchlist.has(`${fetchSymbol}-${fetchType}`)){
    console.log("aleady present");
    // let removeClass = listContainer.querySelector(`.${fetchSymbol}-${fetchType}`);
    // removeClass.classList.remove("removed");
}  else{
let listItem = document.createElement("ul");
listItem.classList.add(`${fetchSymbol}-${fetchType}`)
listItem.classList.add("watchlist");
listItem.setAttribute("onclick","showDetails(event)");
currentPrice = (Number(currentPrice)).toFixed(2);

listItem.innerHTML = `<li id="symbol" class="${fetchSymbol}-${fetchType} symbol">${fetchSymbol}</li>
            <li  id="price" class="${fetchSymbol}-${fetchType} price">${currentPrice}</li>
            <li  id="information" class="${fetchSymbol}-${fetchType} time">${fetchType.toUpperCase()}</li>
            <li  id="close" class="${fetchSymbol}-${fetchType} close" onclick="closeElement(event)">
            <i class="${fetchSymbol}-${fetchType} fa-solid fa-xmark"></i>
           </li>`;

listContainer.append(listItem);  
// let priceCheck = document.getElementById("price");
// console.log(listItem);

let watchlist = document.querySelector(".watchlist:last-child");
let priceCheck = watchlist.querySelector(".price");

if(oldPrice > currentPrice){
    priceCheck.classList.add("bg-red");
} else if(oldPrice < currentPrice){
    priceCheck.classList.add("bg-green");
} else {
     priceCheck.classList.add("bg-white");
}

myWatchlist.set(`${fetchSymbol}-${fetchType}`,getLastFiveDetails(fetchedObj, fetchType));

}
console.log(myWatchlist);
}


// Fetching last 5 details
function getLastFiveDetails(fetchedObj ,fetchType){

let mainKeys = Object.keys(fetchedObj);
let output = fetchedObj[mainKeys[1]];
let dayObject = Object.keys(output);

let returnedMap = new Map();
for(let i=0;i<5;i++){
    if(fetchType === "Intraday"){
    returnedMap.set(dayObject[i].split(" ")[1], output[dayObject[i]]); 
    } else{
    returnedMap.set(dayObject[i].split(" ")[0], output[dayObject[i]]); 
    }
}
return returnedMap;
}


function closeElement(event){
    event.stopPropagation();
    
    let clickedElement = event.target.classList[0];
    let elementToBeRemoved = listContainer.querySelector(`.${clickedElement}`);
    elementToBeRemoved.classList.add("removed");
    
    myWatchlist.delete(clickedElement);
    



    // clickedElement.classList.remove("");
    console.log(myWatchlist)
    // watchlist.classList.remove("removed");

}


function createModal(){
    let divContainer = document.createElement("div");
    divContainer.classList.add();
}


function showDetails(event){
    // console.log("Clicked on Item");
    let clickedElement = event.target.classList[0];
    let result = myWatchlist.get(clickedElement);
     console.log(result);

}



// listContainer.addEventListener("keydown",()=>{});

// listContainer.addEventListener("keyup", (event) => {
//   if (event.keyCode === 13) {
//     console.log('Enter key pressed')
//   }
// });


// https://sentry.io/answers/save-arrays-objects-browser-storage/#:~:text=The%20code%20example%20below%20shows,jsonArray%20as%20the%20value%20localStorage.

//     let output = myObj["time"];
//    Object.keys(output).forEach(key => {
//   console.log(key, output[key]);
// });

// listContainer.addEventListener("click",()=>{
//     console.log("You clicked Me");
// })

/*
Map Methods
Method	Description
new Map()	Creates a new Map object
set()	Sets the value for a key in a Map
get()	Gets the value for a key in a Map
clear()	Removes all the elements from a Map
delete()	Removes a Map element specified by a key
has()	Returns true if a key exists in a Map
forEach()	Invokes a callback for each key/value pair in a Map
entries()	Returns an iterator object with the [key, value] pairs in a Map
keys()	Returns an iterator object with the keys in a Map
values()	Returns an iterator object of the values in a Map
*/

/*
{
    "Meta Data": {
        "1. Information": "Monthly Prices (open, high, low, close) and Volumes",
        "2. Symbol": "AMZN",
        "3. Last Refreshed": "2023-01-31",
        "4. Time Zone": "US/Eastern"
    },
    "Monthly Time Series": {
        "2023-01-31": {
            "1. open": "85.4600",
            "2. high": "103.4850",
            "3. low": "81.4300",
            "4. close": "103.1300",
            "5. volume": "1523798384"
        }
    }
}*/ 

/*
{
    "Meta Data": {
        "1. Information": "Intraday (5min) open, high, low, close prices and volume",
        "2. Symbol": "AMZN",
        "3. Last Refreshed": "2023-01-31 20:00:00",
        "4. Interval": "5min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
    },
    "Time Series (5min)": {
        "2023-01-31 20:00:00": {
            "1. open": "102.4200",
            "2. high": "102.5000",
            "3. low": "102.3900",
            "4. close": "102.4100",
            "5. volume": "23326"
        }
    }
}*/ 

/*{
    "Meta Data": {
        "1. Information": "Weekly Prices (open, high, low, close) and Volumes",
        "2. Symbol": "AMZN",
        "3. Last Refreshed": "2023-01-31",
        "4. Time Zone": "US/Eastern"
    },
    "Weekly Time Series": {
        "2023-01-31": {
            "1. open": "101.0900",
            "2. high": "103.3484",
            "3. low": "99.0100",
            "4. close": "103.1300",
            "5. volume": "137219113"
        }
    }
} */

/*
{
    "Meta Data": {
        "1. Information": "Daily Time Series with Splits and Dividend Events",
        "2. Symbol": "AMZN",
        "3. Last Refreshed": "2023-01-31",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
    },
    "Time Series (Daily)": {
        "2023-01-31": {
            "1. open": "101.155",
            "2. high": "103.3484",
            "3. low": "101.14",
            "4. close": "103.13",
            "5. adjusted close": "103.13",
            "6. volume": "66527253",
            "7. dividend amount": "0.0000",
            "8. split coefficient": "1.0"
        }
    }
} */ 