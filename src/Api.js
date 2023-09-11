import axios from "axios"

const credentialsUsername = "adrian+1004930927@nexudus.com"
const credentialsKey = "4efPNc*LM3-6q0"
const authUrl = "https://spaces.nexudus.com/api/token"
const productSearchUrl = "https://spaces.nexudus.com/api/billing/products"


export const getAuth = async () => {
    const params = new URLSearchParams()
    params.append("grant_type","password")
    params.append("username",credentialsUsername)
    params.append("password",credentialsKey)
    const res = await axios.post(authUrl, params, {
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
    })
    return res.data.access_token
  }
  
 export const searchProducts = async (page, size, auth) => {
  const options = {
    method: 'GET',
    url: productSearchUrl,
    params: {page: page, size: size},
    headers: {
      authorization: 'Bearer ' + auth  }
  };
  const res = await axios
    .request(options)
    .then(function (response) {
      console.log(response.data.Records);
      return response.data.Records
    })
    .catch(function (error) {
      console.error(error);
    });
  return res


}