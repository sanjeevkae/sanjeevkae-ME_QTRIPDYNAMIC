import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log("from getAdventureIdFromURL function ")
  console.log(window.location.search)
  console.log(search)
  //console.log()
  let idStr=search.split("=")
  let adventureId =idStr[1];
  //console.log(adventureId );
  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try
  {
    let data =await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let adventureDetails= await data.json();
    console.log("from fetchAdventureDetails function ")
    console.log( adventureDetails);
    return adventureDetails;

  }  
  catch(err)
  {
    return null;

  }
  


  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log("from addAdventureDetailsToDOM function ")
  // console.log(adventure)
  
  let advenName=document.getElementById("adventure-name");
  advenName.textContent=adventure.name;
  let advenSubtitle=document.getElementById("adventure-subtitle");
  advenSubtitle.textContent=adventure.subtitle;

  for(let i=0;i<adventure.images.length;i++)
  {
    let pic=document.getElementById("photo-gallery");      
    let img=document.createElement("img");
    img.setAttribute("class","activity-card-image");    
    img.setAttribute("src",adventure.images[i]);        
    pic.append(img);
  }

  let advenContent=document.getElementById("adventure-content");
  advenContent.textContent=adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // console.log("from addBootstrapPhotoGallery function ")
  // console.log(images);
  let dom =document.getElementById("photo-gallery");
  dom.innerHTML="";
  let carousel=document.createElement("div");
  carousel.setAttribute("id","carouselExampleIndicators")
  carousel.setAttribute("class","carousel slide")
  carousel.setAttribute("data-bs-ride","carousel slide")
  let carouselIndicators=document.createElement("div");
  carouselIndicators.setAttribute("class","carousel-indicators")
  //creating buttons
  for(let i=0;i<images.length;i++)
  {
    let button=document.createElement("button");
    button.setAttribute("type","button");
    button.setAttribute("data-bs-target","carouselExampleIndicators");
    button.setAttribute("data-bs-slide-to",i);
    if(i===0)
    {
      button.setAttribute("class","active");
      button.setAttribute("aria-current","true");
    }
    carouselIndicators.append(button)    
  }

carousel.append(carouselIndicators);

let carouselInner=document.createElement("div");
carouselInner.setAttribute("class","carousel-inner");
 for(let i=0;i<images.length;i++)
    {

      let carouselItem=document.createElement("div");
      carouselItem.setAttribute("class","carousel-item");
      if(i===0)
      {
        carouselItem.setAttribute("class","carousel-item active");
      }

      let img=document.createElement("img");
      img.setAttribute("src",images[i]);
      img.setAttribute("class","d-block w-100 h-100");
      carouselItem.append(img);
      carouselInner.append(carouselItem);
    }  

  carousel.append(carouselInner)
  dom.append(carousel);
  
  let prevButton=document.createElement("button");
  prevButton.setAttribute("class","carousel-control-prev");
  prevButton.setAttribute("type","button");
  prevButton.setAttribute("data-bs-target","#carouselExampleIndicators");
  prevButton.setAttribute("data-bs-slide","prev");
  let prevSpan1=document.createElement("span");
  prevSpan1.setAttribute("class","carousel-control-prev-icon")
  prevSpan1.setAttribute("aria-hidden","true")
  let prevSpan2=document.createElement("span");
  prevSpan2.setAttribute("class","visually-hidden")
  prevSpan2.textContent="Previous";
  prevButton.append(prevSpan1);
  prevButton.append(prevSpan2);

  carousel.append(prevButton);
 

  let nextButton=document.createElement("button");
  nextButton.setAttribute("class","carousel-control-next");
  nextButton.setAttribute("type","button");
  nextButton.setAttribute("data-bs-target","#carouselExampleIndicators");
  nextButton.setAttribute("data-bs-slide","next");
  let nextSpan1=document.createElement("span");
  nextSpan1.setAttribute("class","carousel-control-next-icon")
  nextSpan1.setAttribute("aria-hidden","true")
  let nextSpan2=document.createElement("span");
  nextSpan2.setAttribute("class","visually-hidden")
  nextSpan2.textContent="Next";
  nextButton.append(nextSpan1);
  nextButton.append(nextSpan2);

  carousel.append(nextButton);
  dom.append(carousel);

  }



//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log("from conditionalRenderingOfReservationPanel function ")
  // console.log(adventure);
  if(adventure.available===true)
  {
    let hideSoldOut=document.getElementById("reservation-panel-sold-out");
    hideSoldOut.style.display="none";
    let updateCost=document.getElementById("reservation-panel-available");
    updateCost.style.display="block";
    let costPerhead=document.getElementById("reservation-person-cost");
    costPerhead.innerHTML=adventure.costPerHead;
  }
  else
  {
    let hideReservation=document.getElementById("reservation-panel-available");
    hideReservation.style.display="none";
    let reservationPanel=document.getElementById("reservation-panel-sold-out");
    reservationPanel.style.display="block";

  }


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log("from calculateReservationCostAndUpdateDOM function ")
  console.log("adventure:",adventure);
  console.log("persons:",persons);
  let totalCost=(adventure.costPerHead * persons);
  let dom = document.getElementById("reservation-cost");
  dom.innerHTML=totalCost;  

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let name = form.elements.name.value;
    console.log("name:",name);
    let date = form.elements.date.value;
    console.log("date:",date);
    let noOfPersons = form.elements.person.value;
    console.log("headcount:",noOfPersons);

    let URL = config.backendEndpoint + "/reservations/new";
    let dataToSend = {
      name: name,
      date: date,
      person: noOfPersons,
      adventure: adventure.id,
    };
    let settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    try {
      let response = await fetch(URL, settings);
      if (response.ok) 
      {
        alert("Success!");
        location.reload();
      }
       else 
       {
        alert("Failed!");
      }
    } 

    catch (err) {
      console.log(err);
      return null;
    }
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log("from showBannerIfAlreadyReserved function");
  console.log("adventue:",adventure);
  if(adventure.reserved===true){
    let banner=document.getElementById("reserved-banner");
    banner.style.display="block";
  }
  else{
    let banner=document.getElementById("reserved-banner");
    banner.style.display="none";

  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
