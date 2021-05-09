const https = require('https')
var ss = require('simple-statistics')
var Eth = require('web3-eth');
var eth = new Eth(Eth.givenProvider || 'ws://127.0.0.1:8546');


// 1 ether = 10^9 GWEI = 10^18 WEI

function getCurrentEthPrice() {

    // TODO unhardcode and use below code / parse
    return "3925.91"; // "ethusd_timestamp":"1620538598"
    // get current price from etherscan free api
// https://api.etherscan.io/api?module=stats&action=ethprice
    const current_price_req = https.request({
        hostname: 'api.etherscan.io',
        port: 443,
        path: '/api?module=stats&action=ethprice',
        method: 'GET'
    }, res => {
        var str = ''
        res.on('data', d=> {
            str += d;
        })
        res.on('end', () => {
            console.log("printing the string:")
            console.log(str);
        })
    })
}

current_eth_price = getCurrentEthPrice();


// or using the web3 umbrella package

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8546');

web3.eth.getGasPrice()
    .then(console.log);


web3.eth.getGasPrice().then((result) => {
    console.log(`current gas price: ${web3.utils.fromWei(result, 'ether')}`)
}).catch((err) => {
    console.log(`there was an error getting the current gas price: ${err}`);
})

// web3.eth.getPendingTransactions().then(console.log).catch((err) => {
//     console.log("there was an error: " + err)
// })


web3.eth.subscribe('pendingTransactions').subscribe((err, result) => {
    if (err) {
        console.log(`error: ${err}`)
    }
}).on('data', async (txHash) => {
        try {
            const trx = await web3.eth.getTransaction(txHash)
            total_price = web3.utils.toBN(trx.gas).mul(web3.utils.toBN(trx.gasPrice))
            total_price_str = total_price.toString();
            total_price_eth_str = web3.utils.fromWei(total_price_str)
            total_price_usd_str = (getCurrentEthPrice() * total_price)/10e18


            console.log(`New transaction: ${trx.from}->${trx.to} (${trx.gas} gas x ${trx.gasPrice} gas price = ${total_price_eth_str} ETH = ${total_price_usd_str} USD)`);

        }
        catch (error) {
            console.log(error)
        }
    })

console.log("Successfully initialized subscription to pending Ethereum transactions.")
