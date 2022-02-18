import axios from 'axios';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;


export default function get_corruption_data(){

    axios.get('https://en.wikipedia.org/wiki/Corruption_Perceptions_Index')
    .then(response => {
        const text = response.text();
        const dom = new JSDOM(text);
        return text;
    })
    .catch(err => {
        return 'we got an error '+err;
    })
}