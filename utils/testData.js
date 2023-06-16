async function fetchData (){
    const response = await fetch('https://api.dataforsyningen.dk/postnumre')
    if(response){
        const result = await response.json();
        console.log(result[0].nr);
    }
}
console.log("Fetching data")
fetchData();
