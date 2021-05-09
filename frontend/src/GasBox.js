import React from 'react';
import Web3 from "web3";
var web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8546');

class GasBox extends React.Component {
    state = {
        approx_avg: 0,
        total: 0,
        transactions: 0,
        total_price_usd_str: null
    }

    componentDidMount() {
        web3.eth.subscribe('pendingTransactions').subscribe((err, result) => {
            if (err) {
                console.log(`error: ${err}`)
            }
        }).on('data', async (txHash) => {
            try {
                const trx = await web3.eth.getTransaction(txHash)
                const total_price = web3.utils.toBN(trx.gas).mul(web3.utils.toBN(trx.gasPrice))
                const total_price_str = total_price.toString();
                const total_price_eth_str = web3.utils.fromWei(total_price_str)
                const current_eth_price = 3925.91; // TODO - get dynamically
                const total_price_usd = (current_eth_price * total_price)/10e18


                console.log(`New transaction: ${trx.from}->${trx.to} (${trx.gas} gas x ${trx.gasPrice} gas price = ${total_price_eth_str} ETH = ${total_price_usd} USD)`);
                this.setState({
                    approx_avg: this.state.transactions < 1 ? 0 :
                        this.state.approx_avg - (this.state.approx_avg/this.state.transactions) + total_price_usd/this.state.transactions,
                    transactions: this.state.transactions + 1,
                    total: this.state.total += total_price_usd,
                    total_price_usd: total_price_usd
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

    shouldComponentUpdate(nextProps, nextState){
        return nextState.transactions % 10 == 0; // equals() is your implementation
    }

    render() {
        return<div>
            <h2>Last Transaction USD Price: ${this.state.total_price_usd !== undefined ? this.state.total_price_usd : 'loading...'}</h2>
            <h2>Total Transactions Scanned So Far: {this.state.transactions}</h2>
            <h2>Moving average: ${this.state.approx_avg}</h2>
            <h2>Total transaction fees: ${this.state.total}</h2>
        </div>;
    }
}

export default GasBox;
