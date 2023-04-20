import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("from init()");  
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let res=0;
  try{
    let data= await fetch(config.backendEndpoint+"/cities");
    let res= await data.json();
    console.log(res);
    return res;
  }
  catch(err){
    return null;
  }           
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  let parentDiv=document.createElement("div");
  parentDiv.setAttribute("class","col-lg-3 col-sm-6 col-12 mb-4");
  parentDiv.href = "pages/adventures/?city="+id;
  parentDiv.setAttribute("id",id);
  let anchorTag=document.createElement("a");
  anchorTag.setAttribute("href","pages/adventures/?city="+id);
  let card=document.createElement("div");
  card.setAttribute("class","tile");
  let img=document.createElement("img");
  img.setAttribute("src",image);
  img.setAttribute("alt",id);
  card.append(img);
  let text=document.createElement("div");
  text.setAttribute("class","tile-text");
  let cityName=document.createElement("h4");
  cityName.textContent=city;
  let placesCount=document.createElement("p");
  placesCount.textContent=description;
  text.append(cityName);
  text.append(placesCount);
  card.append(text);
  anchorTag.append(card);
  parentDiv.append(anchorTag);
  let dom=document.getElementById("data");
  dom.append(parentDiv);
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

}

export { init, fetchCities, addCityToDOM };
