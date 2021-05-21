import config from "../config";

// const apiUrl = process.env.REACT_APP_API_URL;
// const xApiKey = process.env.REACT_APP_X_API_KEY;
export const resetPassword = ({newPassword, resetToken}) => {
  console.log('services .js config',config);
  const {apiUrl,xApiKey} = config;
  console.log('services .js reset pass config',apiUrl,xApiKey);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "X-API-KEY": xApiKey,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({newPassword, resetToken}),
  };
  console.log('options.body ',options.body)
  return fetch(`${apiUrl}/reset-password`,options).then((response) => response.json());
};
