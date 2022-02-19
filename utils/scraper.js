// import axios from 'axios';
// const fetch = require("node-fetch");

// const SCRAPING_URL = "https://en.wikipedia.org/wiki/Corruption_Perceptions_Index";

// export default function get_corruption_data(){

//     fetch(SCRAPING_URL)
//     .then(response => {
//         "reposne is "+response;
//     }).then(data => {
//         return data;
//     })
//     // .catch(err => {
//     //     return "error is "+err;
//     // })
// }

const fetch = require("node-fetch");

// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

// URL for data
const URL = "https://en.wikipedia.org/wiki/Cricket_World_Cup";

// start of the program
const getCricketWorldCupsList = async () => {
   const cricketWorldCupRawData = await getRawData(URL);
   return cricketWorldCupRawData;
};

// invoking the main function
export default getCricketWorldCupsList();
