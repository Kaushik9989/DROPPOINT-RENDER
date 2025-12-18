const axios = require("axios");

const SMARTPING_ACCOUNT_ID = "Ltowy0SKWQUxNK5tRV14";

const SMARTPING_API_KEY = "mGwY2blgvdEnJKuR7NYQEAzHabqmEoTSj8vaj5Hr";

const SMARTPING_SENDER = process.env.SMARTPING_SENDER;

const baseUrl = `https://restapi.smscountry.com/v0.1/Accounts/${SMARTPING_ACCOUNT_ID}/SMSes/`;

async function sendSMS(number,text) {
  const url = "https://restapi.smscountry.com/v0.1/Accounts/Ltowy0SKWQUxNK5tRV14/SMSes/";
  const payload = {
    Text: text,
    Number: number,
    SenderId: SMARTPING_SENDER,
    DRNotifyUrl: "https://www.domainname.com/notifyurl",
    DRNotifyHttpMethod: "POST",
    Tool: "API",
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Basic " + Buffer.from(`${SMARTPING_ACCOUNT_ID}:${SMARTPING_API_KEY}`).toString("base64"),
  };


  try {
    const res = await axios.post(baseUrl, payload, { headers, timeout: 10000 });
    return { success: true, response: res.data };  // ALWAYS return on success
  } catch (err) {
    return { success: false, error: err.response?.data || err.message }; // ALWAYS return on error
  }
}

module.exports = {sendSMS};
