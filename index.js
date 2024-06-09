require('dotenv').config();
const axios = require('axios');
const { urls, setToken, buildAuthQuery, getHeaders } = require('./config');
const { logInfo, logInfoError, farmOrClaimOrWait, logError } = require('./requests');


async function main() {
    axios.post(urls.auth, buildAuthQuery(), { headers: getHeaders() })
        .then((res) => {
            const { token, balanceInfo } = res.data;
            balanceInfo ? logInfo(balanceInfo) : false;
            const _headers = getHeaders(setToken(token));
            axios.get(urls.farmingInfo, { headers: _headers }).then((res) => {
                res.data ? farmOrClaimOrWait(token, res.data) : logInfoError();
            }).catch((error) => {
                logError(error);
                process.exit();
            });
        })
        .catch(error => {
            logError(error);
            process.exit();
        });
}

main();