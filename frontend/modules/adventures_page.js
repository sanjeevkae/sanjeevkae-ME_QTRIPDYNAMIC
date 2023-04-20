
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let urlParams = new URLSearchParams(search);
  let params = urlParams.get("city");
  return params;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data  
  try{
    let data = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    let res=await data.json();
    // console.log("from async function");
    // console.log(res);
    return res;
  }
  catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log("addAdventureToDOM function");
  console.log(adventures);
  let dom =document.getElementById("data");

  for (let i=0;i<adventures.length;i++){
    let parentDiv=document.createElement("div");
    parentDiv.setAttribute("class","col-lg-3 col-sm-6 col-6 mb-4")
    // parentDiv.setAttribute("id",adventures[i].name)
    let anchorTag=document.createElement("a");
    anchorTag.setAttribute("id",adventures[i].id)
    anchorTag.href ="detail/?adventure="+ adventures[i].id;
    let card=document.createElement("div");
    card.setAttribute("class","activity-card");    
    let banner=document.createElement("div");
    banner.setAttribute("class","category-banner");
    banner.textContent=adventures[i].category
    let cardimg=document.createElement("img");
    cardimg.setAttribute("src",adventures[i].image)
    cardimg.setAttribute("class","activity-card img")
    let text=document.createElement("div");
    text.setAttribute("class","w-100")
    let nameCostText=document.createElement("div");
    nameCostText.setAttribute("class","card-text d-flex flex-wrap justify-content-between w-100")
    // nameCostText.textContent=adventures[i].name
    // nameCostText.append(adventures[i].costPerHead)
    let nameSpan = document.createElement('span');
    nameSpan.textContent = adventures[i].name;
    let costSpan = document.createElement('span');
    costSpan.textContent = adventures[i].costPerHead;
    nameCostText.append(nameSpan);
    nameCostText.append(costSpan)
    let durationText=document.createElement("div");
    durationText.setAttribute("class","card-text d-flex flex-wrap justify-content-between w-100")
    // durationText.textContent="Duration"
    // durationText.append(adventures[i].duration)
    let durationSpan = document.createElement("span");
    durationSpan.textContent ="Duration";
    let hourSpan = document.createElement('span');
    hourSpan.textContent = adventures[i].duration;
    durationText.append(durationSpan);
    durationText.append(hourSpan);   
    text.append(nameCostText)
    text.append(durationText)  
    card.append(cardimg)
    card.append(text)
    card.append(banner)
    anchorTag.append(card)
    parentDiv.append(anchorTag)
    dom.append(parentDiv)     
  } 

}



//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList  = [];
  // console.log("from filteByCategory");
  // console.log(list);
  // console.log(categoryList);
  for(let i=0;i<categoryList.length;i++)
  {
  //console.log("inside for loop of category filter");
    
     for(let j = 0; j < list.length;j++) {
      if(list[j].category === categoryList[i]) {
        filteredList.push(list[j])
      }
     }
      
  }
  
  return  filteredList ;    

}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  //console.log("from filte");
  // console.log(filters);
  // console.log(list);
  let filteredList  = [];
  for(let i=0;i<list.length;i++)
  {     
     if ( (list[i].duration>=low) && (list[i].duration<=high) )
     {
      filteredList.push(list[i]);
     }
      
  }
  return filteredList;

}


// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  console.log("from filterFunction");
  console.log(filters);
   console.log(list);
   let listToDom=list;  
  if( (filters.category.length!==0) && (filters.duration==="") )
  { 
    let categoryList=filters.category;
     listToDom =  filterByCategory(list,categoryList);    
  }

  else if ( (filters.duration!=="") && (filters.category.length===0) )
  {
    let splittedData=filters.duration.split("-")
    let low=splittedData[0];
    let high=splittedData[1];
    listToDom=  filterByDuration(list,parseInt(low),parseInt(high)); 

  }

  else if ( (filters.duration!=="") && (filters.category.length!==0) )  
  {
    let categoryList=filters.category;
    let categoryFiltersList =  filterByCategory(list,categoryList);
    let splittedData=filters.duration.split("-")
    let low=splittedData[0];
    let high=splittedData[1];
    let catAndDurationFiltersList = filterByDuration(categoryFiltersList,parseInt(low),parseInt(high));   
    listToDom  = catAndDurationFiltersList;

  }
 
  // // Place holder for functionality to work in the Stubs
  return listToDom;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let filtersStr=JSON.stringify(filters)
  localStorage.setItem("filters",filtersStr);
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters=localStorage.getItem("filters");
  // console.log("from getFiltersFromLocalStorage function")
  // console.log(filters)
  let filtersObj=JSON.parse(filters);
  // console.log("filtersObj :")
  // console.log(filtersObj);

  // Place holder for functionality to work in the Stubs
  return filtersObj;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // console.log("from generateFilterPillsAndUpdateDOM");
  // console.log(filters);
  if (filters.duration != "") {
    document.getElementById("duration-select").value = filters.duration;
  }

  let dom=document.getElementById("category-list");  
  for(let i=0;i<filters.category.length;i++)
  {
    let pill=document.createElement("div");
    pill.setAttribute("class","category-filter d-flex");    
    pill.textContent=filters.category[i]+" ";
    let closeIcon=document.createElement("span");
    closeIcon.setAttribute("id","close");    
    pill.append(closeIcon);
    dom.append(pill);

  }
 
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
