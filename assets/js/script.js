var locationbutton = document.getElementById('location-button');
var datebutton = document.getElementById('insert-date');


function getTMData() {
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&apikey=rRT5qi1DbciQBObUX3LdsQWbrMfyiroH'
    fetch(requestUrl)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data._embedded);
            var html = data._embedded.events
                .map(user => {
                    return `
                    <div class="user">
                    <p><img src=${user.images.url}/></p>
                    <p>Name: ${user.name}</p>
                    <p>Venue: ${user._embedded.venues.name}</p>
                    
                    </div>
                    `;
            })
            .join("");
            console.log(html)
            document.querySelector('#app').innerHTML = (html)
            })
        .catch(error => {
            console.log(error);
        });
    }
    
locationbutton.addEventListener('click', getTMData);

