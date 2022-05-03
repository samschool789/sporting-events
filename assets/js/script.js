var locationbutton = document.getElementById("location-button");
var datebutton = document.getElementById("insert-day");
var searchAllButton = document.getElementById("search-all");
//https://app.ticketmaster.com/discovery/v2/events?apikey=WnWHht4MA16AjiAHUluHIRgWaK2QymjF&locale=*&city=kansas%20city%20&countryCode=US&classificationName=music
function getTMData(event) {
  console.log(event.currentTarget.dataset.type);
  var requestUrl =
    "https://app.ticketmaster.com/discovery/v2/events?classificationName=music&locale=*&countryCode=US&apikey=rRT5qi1DbciQBObUX3LdsQWbrMfyiroH";
  if (event.currentTarget.dataset.type === "location" || event.currentTarget.dataset.type === "all") {
    var locationInput = document.getElementById("input-location");
    requestUrl = requestUrl + "&city=" + locationInput.value;
  } 
  if (event.currentTarget.dataset.type === "day" || event.currentTarget.dataset.type === "all") {
    var dateInput = document.getElementById("input-day");
    requestUrl =
      requestUrl + "&startDateTime=" + moment(dateInput.value).format();
  }
  console.log(requestUrl);
  fetch(requestUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
       console.log(data._embedded.events);
      var html = data._embedded.events
        .map((user) => {
          return `
                    <div class="user">
                    <p><img src="${user.images[0].url}"/></p>
                    <p>Name: ${user.name}</p>
                    <p>Venue: ${user._embedded.venues[0].name}</p>
                   
                    </div>
                    `;
        })
        .join("");
      //console.log(html)
      document.querySelector("#app").innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

locationbutton.addEventListener("click", getTMData);
datebutton.addEventListener("click", getTMData);
searchAllButton.addEventListener("click", getTMData);