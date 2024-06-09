const chalk = require('chalk');
const axios = require('axios');
const moment = require('moment');
const { urls, setToken, getHeaders, getUsernameFromAuthQuery } = require('./config');

function farmOrClaimOrWait(token, data) {
    const { farmingDurationInSec } = data;
    const { activeFarmingStartedAt } = data;
    const farmingTime = (farmingDurationInSec/3600);
    const farmingStartAt = moment(activeFarmingStartedAt);
    const farmingEndAt = farmingStartAt.add(farmingTime, 'hours');
    farmingEndAt.isBefore(moment()) ? claimFarm(token) : false;
}

async function startFarming(token) {
    const _headers = getHeaders(setToken(token));
    return await axios.post(urls.startFarming, {}, { headers: _headers }).then((res) => {
        const { balance } = res.data;
        balance ? logFarming(res.data) : false;
    }).catch((error) => {
        console.log(chalk.red(error?.response?.data?.error?.message));
    });
}

async function claimFarm(token) {
    const _headers = getHeaders(setToken(token));
    return await axios.post(urls.claimFarming, {}, { headers: _headers }).then((res) => {
        const { balance } = res.data;
        balance ? logFarmClaim(res.data) : false;
        balance ? startFarming(token) : exitProcess();
    }).catch((error) => {
        console.log(chalk.red(error?.response?.data?.error?.message));
    });
}

function logInfo(obj) {
    console.log(
        'User:', chalk.blue(getUsernameFromAuthQuery()),
        '| Balance:', chalk.yellow(Number(obj?.balance).toLocaleString()),
        '| Status:', chalk.green(obj?.user?.status)
    );
}

function logFarming(data) {
    console.log(
        'Farming ... :', chalk.green('\u2714'),
        '| Farm Reward:', chalk.green(data?.farmingReward),
        '| Farm Started At:', chalk.yellow(data?.activeFarmingStartedAt)
    );
}

function logFarmClaim(data) {
    console.log(
        'Farm Claiming ... :', chalk.green('\u2714'),
        '| Balance:', chalk.yellow(data?.balance)
    );
}

function logInfoError() {
    console.log(chalk.red('Error getting account info'));
    process.exit();
}

function logError(error) {
    console.log(error.response ? error.response.data : error.request ? error.request : 'Error', error.message);
}

function exitProcess() {
    console.log(chalk.red('Error || Completed. Exiting...'));
    process.exit(); //end the process
}

module.exports = { logInfo, farmOrClaimOrWait, logInfoError, logError, exitProcess }
