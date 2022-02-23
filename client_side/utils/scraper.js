import axios from 'axios';

const URL = "https://www.bullion-rates.com/gold/INR/2007-1-history.htm";

const get_corruption_data = () => {
   axios({
      url: URL,
      method: 'get',
      headers:{
         "Access-Control-Allow-Origin": "*"
     }
   })
   .then(res => {
      return res.data;
   })
   .catch(err => {
      return err.response.data;
   });
}

export default get_corruption_data;