// Here we modify the initial geo json data to add countries corruption ranks to it
// corruption rank is needed to determine each country color

const modified_geoJSON = (corruption_data, geoJSON_data) => {
    // variable to be modified --
    let new_geoJSON = geoJSON_data;

    new_geoJSON.features.forEach(country => {
        corruption_data.forEach(data => {
            if(country.properties.ADMIN == data.name){
                country.properties.rank = data.rank;
                country.properties.values = data.values;
                country.properties.link = data.link;
                country.properties.image = data.link;
            }
        })
    })

    return new_geoJSON;
}

export { modified_geoJSON }