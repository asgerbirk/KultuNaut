

const fetchData = async () => {
  const data = require('./dummyData.json');
  try {
    //const response = await fetch(path);
    //const data = await response.json();
      //console.log(data.result[0]);
      console.log("Enddate:", data.result[1].Enddate);
      //setDateText(data.result[0].Enddate);
      //console.log("Title:", data.result[0].Title);
      //setHeadlineText(data.result[0].Title);
      //console.log("Location:", data.result[0].Longdescription);
      const newDate = formatDate(data.result[1].Enddate);
      console.log(newDate);


      //setLocationText(data.result[0].LocationName);
      //console.log("Address:", data.result[0].LocationAddress);
      //setAddressText(data.result[0].LocationAddress);
    } catch (error) {
      console.error('Error:', error);
    }
  };
fetchData();
function formatDate(dateString){
    const [day, month, year] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
    const formattedDate = date.toLocaleDateString('da-DK', options);
    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    return capitalizedDate;
}