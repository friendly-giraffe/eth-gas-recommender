const https = require('https')

console.log("hello")


var Eth = require('web3-eth');

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
var eth = new Eth(Eth.givenProvider || 'ws://127.0.0.1:8546');


// 1 ether = 10^9 GWEI = 10^18 WEI

// get current price
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


// or using the web3 umbrella package

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8546');

web3.eth.getGasPrice()
    .then(console.log);


web3.eth.getGasPrice().then((result) => {
    console.log(web3.utils.fromWei(result, 'ether'))
}).catch((err) => {
    console.log("there was an error");
    console.log(err);
})

// web3.eth.getPendingTransactions().then(console.log).catch((err) => {
//     console.log("there was an error: " + err)
// })

const subscription = web3.eth.subscribe('pendingTransactions')

// Subscribe to pending transactions
subscription.subscribe((error, result) => {
    if (error) console.log(error)
})
    .on('data', async (txHash) => {
        try {
            // Instantiate web3 with HttpProvider
            // const web3Http = new Web3('https://rinkeby.infura.io/')

            // Get transaction details
            const trx = await web3.eth.getTransaction(txHash)

            // const valid = validateTransaction(trx)
            // // If transaction is not valid, simply return
            // if (!valid) return

            total_price_str = web3.utils.toBN(trx.gas).mul(web3.utils.toBN(trx.gasPrice)).toString();
            total_price_eth_str = web3.utils.fromWei(total_price_str)
            total_price_usd_str = web3.utils.fromWei(total_price_str)


            console.log(`New transaction: ${trx.from}->${trx.to} (${trx.gas} gas x ${trx.gasPrice} gas price = ${total_price_eth_str} ETH)`);
            //console.log('Transaction value is: ' + process.env.AMOUNT)
            //console.log('Transaction hash is: ' + txHash + '\n')

            // Initiate transaction confirmation
            // confirmEtherTransaction(txHash)

            // Unsubscribe from pending transactions.
            // subscription.unsubscribe()
        }
        catch (error) {
            console.log(error)
        }
    })

console.log("done")
