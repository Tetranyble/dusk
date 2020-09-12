const LocationService = () => {
  let cordinate = {
    latitude: "",
    longitude: ""
  }
  if(!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
  } else {
      navigator.geolocation.getCurrentPosition((location) => {
        cordinate.latitude = location.coords.latitude;
        cordinate.longitude = location.coords.longitude;
        // eslint-disable-next-line no-console
        console.log(location.coords.latitude)
      }, (error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      });
  }
  const getCordinate = () => {
    return cordinate;
  }
  return {
    getCordinate: getCordinate
  }
}

module.exports = LocationService()
