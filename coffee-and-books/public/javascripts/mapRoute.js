const ironhackBCN = {
  lat: 41.386230, 
  lng: 2.174980
};
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackBCN
  });
  const bounds = new google.maps.LatLngBounds();
  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer({map})
  console.log(marks)
 marks.forEach(e=>{
  position={
    lat:e.location.coordinates[0],
    lng:e.location.coordinates[1]
  }
  new google.maps.Marker({
      position,  
      map,
      title:e.name
    })
    bounds.extend(position)
  })
    console.log(marks)
    map.fitBounds(bounds);
    directionsService.route({
      origin:{
        lat:marks[0].location.coordinates[0],
        lng:marks[0].location.coordinates[1]
      },
      destination:{
        lat:marks[1].location.coordinates[0],
        lng:marks[1].location.coordinates[1]
      },
      travelMode:"DRIVING"

    })