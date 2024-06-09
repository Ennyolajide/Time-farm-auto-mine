require('dotenv').config();

const env = process.env;

const baseUrl = 'https://tg-bot-tap.laborx.io/api/v1';

function setToken(token) {
    return { 'Authorization': `Bearer ${token}` };
}

function buildAuthQuery() {
    return env.AUTH_QUERY;
}

function getHeaders(headers = {}) {

    return {
        ...headers,
        'Host': 'tg-bot-tap.laborx.io',
        'Accept': '*/*',
        'Sec-Fetch-Site': 'same-site',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Mode': 'cors',
        'Content-Type': 'text/plain;charset=UTF-8',
        'Origin': 'https://tg-tap-miniapp.laborx.io',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://tg-tap-miniapp.laborx.io/',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty'
    };
}

const urls = {
    auth: `${baseUrl}/auth/validate-init`,
    farmingInfo: `${baseUrl}/farming/info`,
    startFarming: `${baseUrl}/farming/start`,
    claimFarming: `${baseUrl}/farming/finish`,
}

function getUsernameFromAuthQuery() {
    const params = new URLSearchParams(env.AUTH_QUERY);
    const userParam = params.get('user');
    if (userParam) {
        const user = JSON.parse(decodeURIComponent(userParam));
        return user.username.toUpperCase();
    }
    return null;
}


module.exports = { urls, setToken, buildAuthQuery, getHeaders, getUsernameFromAuthQuery }
