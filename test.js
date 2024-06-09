const axios = require('axios');

const url = 'https://tg-bot-tap.laborx.io/api/v1/auth/validate-init';

const headers = {
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
    'Content-Length': '296',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'empty'
};

const data = 'query_id=AAEGqQ0cAAAAAAapDRx6VsyO&user=%7B%22id%22%3A470657286%2C%22first_name%22%3A%22Eniseyin%22%2C%22last_name%22%3A%22Olajide%22%2C%22username%22%3A%22ennyolajide%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1717872386&hash=f9223fd007c51b9c5cfc9d3f46fbf5551cf1a9a73ff9247a9971743d3f1f834c';

axios.post(url, data, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
