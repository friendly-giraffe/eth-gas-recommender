import React from 'react';
import Web3 from "web3";
import BigNumber from 'bignumber.js'
var web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8546');

const current_eth_price = 3925.91; // TODO - get dynamically

class GasBox extends React.Component {

    state = {
        last_transaction_wei: null,
        approx_avg: 0,
        total: new BigNumber(0),
        num_transactions: 0
    }

    constructor() {
        super();
        this.lastUpdateDate = new Date();
    }

    getTotalPriceUsd(wei) {
        return (current_eth_price * wei)/10e18
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.lastUpdateDate = new Date();
    }

    componentDidMount() {
        web3.eth.subscribe('pendingTransactions').subscribe((err, result) => {
            if (err) {
                console.log(`error: ${err}`)
            }
        }).on('data', async (txHash) => {
            try {
                const trx = await web3.eth.getTransaction(txHash)
                const tx_gas_in_wei = web3.utils.toBN(trx.gas).mul(web3.utils.toBN(trx.gasPrice)) // in wei
                // const total_price_str = total_price.toString();
                // const total_price_eth_str = web3.utils.fromWei(total_price_str)
                // const total_price_usd = this.getTotalPriceUsd(total_price)


                // console.log(`New transaction: ${trx.from}->${trx.to} (${trx.gas} gas x ${trx.gasPrice} gas price = ${total_price_eth_str} ETH = ${total_price_usd} USD)`);
                this.setState({
                    last_transaction_wei: tx_gas_in_wei,
                    approx_avg: this.state.num_transactions < 1 ? 0 :
                        this.state.approx_avg - (this.state.approx_avg/this.state.num_transactions) + tx_gas_in_wei/this.state.num_transactions,
                    num_transactions: this.state.num_transactions + 1,
                    total: this.state.total.plus(tx_gas_in_wei)
                });
            }
            catch (error) {
                console.log(error)
            }
        })
        //
        // web3.eth.getGasPrice()
        //     .then((gasPrice) => {
        //         gasPrice /= 10e9;
        //         console.log(`current gas price: ${gasPrice}`);
        //         this.setState({gasPrice});
        //     });
    }

    shouldComponentUpdate() {
        const now = new Date();
        var seconds = (now.getTime() - this.lastUpdateDate.getTime()) / 1000;
        return seconds >= 1;
    }

    render() {
        return<div>
            <h2>Total Transactions Scanned So Far: {this.state.num_transactions}</h2>
            <h2>Last Transaction USD Price: ${this.state.last_transaction_wei !== undefined ? this.getTotalPriceUsd(this.state.last_transaction_wei) : 'loading...'}</h2>
            <h2>Moving average: {(this.state.approx_avg/10e18).toFixed(6)} ETH (${this.getTotalPriceUsd(this.state.approx_avg)} USD)</h2>
            <h2>Total transaction fees: ${this.getTotalPriceUsd(this.state.total.toNumber())}</h2>
        </div>;
    }
}

export default GasBox;
