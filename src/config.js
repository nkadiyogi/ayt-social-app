const dev = {
    apiUrl :'http://localhost:3001/v1',
    port :3000,
    xApiKey :'c0fa1bc00534b69726b6d616e20000000722227335444556666c657321a516ea6ea959d6658e'
}

const prod = {
    apiUrl :process.env.REACT_APP_API_URL,
    port :process.env.REACT_APP_PORT,
    xApiKey :process.env.REACT_APP_X_API_KEY
}
const config = process.env.NODE_ENV == "development" ? dev : prod;
console.log('process.env.NODE_ENV == development ',process.env.NODE_ENV == "development",config)
  
export default {...config};
