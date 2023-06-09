import axios from "axios"

const base_url = process.env.REACT_APP_PROD ? "https://ssvault.adtruz.com/api/v1" : "http://178.18.250.242:4545/api/v1"


export default axios.create({
    baseURL: "https://sandsvault.io/api/v1",
    headers: {
        "access-control-allow-origin": "*",
    },
})  
