import axios from 'axios';
var md5=require('md5')
export default {
  getAll: async (user,password) => {
    console.log(user,password)
    let res = await axios.get(`/api/contact/`+user+`/`+md5(password));
    // console.log(Object.values(res.data))
    // console.log(typeof(res.data[0]["contacts"]))
    return res.data[0]["contacts"] || [];
  }
}