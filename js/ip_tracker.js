// pull from different file
const secret_api ='1a2eb2d8f3274d0f9c0de27e47f41cd1'
const api_uri = 'https://api.ipgeolocation.io/ipgeo'

// elements to update 
let current_ip = document.getElementById('current_ip')
let current_town = document.getElementById('current_town')
let current_zone = document.getElementById('current_zone')
let current_isp = document.getElementById('current_isp')

// form elements 
const entered_ip = document.getElementById('ip_address') 
const search_btn = document.getElementById('search_btn')

 
const map = L.map('display-map', {
    'center': [0,0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})

function updateMarker(update_marker){
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

 
async function fetchDetails(default_ip)  
{
    try{
        if(default_ip == undefined){
            var ip_url = `${api_uri}?apiKey=${secret_api}`
        }
        else {
            var ip_url = `${api_uri}?apiKey=${secret_api}&ip=${default_ip}`
        }
        const res = await fetch(ip_url);
        const data = await res.json();
        current_ip.innerHTML = data.ip
        current_town.innerHTML = `${data.city} ${data.country_name} ${data.zipcode}`
        current_zone.innerHTML = data.time_zone.name
        current_isp.innerHTML = data.isp
        updateMarker([data.latitude, data.longitude])
    }
    catch(error){
        alert("Unable to get IP details")
        console.log(error)
    }
}


document.addEventListener('load', fetchDetails())

search_btn.addEventListener('click', e => {
    e.preventDefault()
    console.log(entered_ip.value);
    if (entered_ip.value != '' && entered_ip.value != null) {
        fetchDetails(entered_ip.value)
        return
    }
    fetchDetails();
    alert("Please enter a valid IP address");
})