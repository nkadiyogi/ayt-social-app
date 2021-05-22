import config from "../config";

// const apiUrl = process.env.REACT_APP_API_URL;
// const xApiKey = process.env.REACT_APP_X_API_KEY;
console.log("config services", config);
export const resetPassword = ({ newPassword, resetToken }) => {
  console.log("services .js config", config);
  const { apiUrl, xApiKey } = config;
  console.log("services .js reset pass config", apiUrl, xApiKey);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "X-API-KEY": xApiKey,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ newPassword, resetToken }),
  };
  console.log("options.body ", options.body);
  return fetch(`${apiUrl}/reset-password`, options).then((response) =>
    response.json()
  );
};

export const updateUserProfile = ({ form, token }) => {
  const { apiUrl, xApiKey } = config;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "X-API-KEY": xApiKey,
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  };

  return fetch(`${apiUrl}/user/${form.id}`, options).then((response) =>
    response.json()
  );
};

export const updateUserStatus = ({ userId,status, token ,adminId}) => {
  const { apiUrl, xApiKey } = config;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "X-API-KEY": xApiKey,
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status:status,
      userId
  }),
  };

  return fetch(`${apiUrl}/user/status/${adminId}`, options).then((response) =>
    response.json()
  );
};

export const approvUser = ({ userId, token ,adminId}) => {
  const { apiUrl, xApiKey } = config;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "X-API-KEY": xApiKey,
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId
  }),
  };

  return fetch(`${apiUrl}/user/approve/${adminId}`, options).then((response) =>
    response.json()
  );
};
