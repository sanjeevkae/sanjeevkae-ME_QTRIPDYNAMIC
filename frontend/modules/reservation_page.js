import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let data = await fetch(`${config.backendEndpoint}/reservations/`);
    let res = await data.json();
    console.log("from fetchReservations function");
    console.log("res:", res);
    return res;
  } catch (err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  console.log("from addReservationToTable function");
  console.log("reservation:", reservations);

  // let table = document.getElementById("reservation-table");
  // for (var x of reservations) {
  //   const date = new Date(x.date);
  //   //console.log(date.toLocaleDateString("en-IN"));
  //   const time = new Date(x.time)
  //     .toLocaleDateString("en-IN", {
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //       hour12: true,
  //       hour: "numeric",
  //       minute: "numeric",
  //       second: "numeric",
  //     })
  //     .replace(" at ", ", ");
  //   //console.log(time);

  //   let trow = document.createElement("tr");
  //   trow.innerHTML = `
  //      <td>${x.id}</td>
  //      <td>${x.name}</td>
  //      <td>${x.adventureName}</td>
  //      <td>${parseInt(x.person)}</td>
  //      <td>${date.toLocaleDateString("en-IN")}</td>
  //      <td>${x.price}</td>
  //      <td>${time}</td>
  //     `;
  //   // let button = document.createElement("button");
    // button.innerHTML = "Visit Adventure";
    // button.setAttribute("id",x.id);
    // button.setAttribute("class" , "reservation-visit-button")
    //button.onclick = `window.location.href = ${config.backendEndpointTemp}:8081/frontend/pages/adventures/detail/?adventure=${x.adventure}`;
    //console.log(`${config.backendEndpointTemp}:8081/frontend/pages/adventures/detail/?adventure=${x.adventure}`)
    //let td = document.createElement("td");
    // let anchorTag = document.createElement("a");
    // anchorTag.href = `${config.backendEndpoint}/frontend/pages/adventures/detail/?adventure=${x.adventure}`;
    // button.appendChild(anchorTag);
    //let OuterAnchorTag = document.createElement("a");
    //OuterAnchorTag.href = `${config.backendEndpoint}/frontend/pages/adventures/detail/?adventure=${x.adventure}`;
    // OuterAnchorTag.setAttribute("href",`${config.backendEndpoint}/frontend/pages/adventures/detail/?adventure=${x.adventure}`);
    // OuterAnchorTag.appendChild(button);
    // td.appendChild(OuterAnchorTag);
    // trow.append(td);
    // table.appendChild(trow);
    // const tr_tag = document.createElement("tr");
    // tr_tag.innerHTML = ` 
    //   <td><b>${reservations[i].id}</b></td>
    //   <td>${reservations[i].name}</td>
    //   <td>${reservations[i].adventureName}</td>
    //   <td>${reservations[i].person}</td>
    //   <td>${date_text}</td> 
    //   <td>${reservations[i].price}</td> 
    //   <td>${time_text}</td> <td id=${reservations[i].id}><a href="/pages/adventures/detail/?adventure=${reservations[i].adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td> `;
    // table.append(tr_tag);
    const tbody_tag = document.getElementById("reservation-table"); 
    for(let i = 0;i<reservations.length;i++){ 
      const date = new Date(reservations[i].date); 
      let date_text = date.toLocaleDateString("en-IN",{ day:"numeric", month:"numeric", year:"numeric" }); 
      const time = new Date(reservations[i].time); 
      let time_text = time.toLocaleDateString("en-IN",{ year:"numeric", month:"long", day:"numeric", hour:"numeric", minute:"numeric", second:"numeric", hour12:true }).replace(" at",","); 
      const tr_tag = document.createElement("tr");
      tr_tag.innerHTML = ` 
      <td><b>${reservations[i].id}</b></td>
       <td>${reservations[i].name}</td>
        <td>${reservations[i].adventureName}</td> 
        <td>${reservations[i].person}</td> 
        <td>${date_text}</td> 
        <td>${reservations[i].price}</td> 
        <td>${time_text}</td>
         <td id=${reservations[i].id}><a href="/workspace/sanjeevkae-ME_QTRIPDYNAMIC/frontend/pages/adventures/detail/?adventure=${reservations[i].adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td> ` 
        tbody_tag.append(tr_tag); }
     


  }


export { fetchReservations, addReservationToTable };
