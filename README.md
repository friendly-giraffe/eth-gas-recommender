# Eth Gas Recommender

## Background

Hey - so I developed this project during the Scaling Ethereum 2021 Hackathon: https://hack.ethglobal.co/scaling

Joined on April 14 knowing nothing about Crypto. Objective wasn't to win any prizes but just to learn some stuff and have fun. Didn't want to join a team due to my lack of experience.

Tbh I didn't make anything too substantial but learned a lot coming from no real ethereum knowledge. 

## Overview

The purpose of this project is to show some gas prices similar to https://ethgasstation.info/ 

I'm going to limit the scope of this to just transferring money from 1 person (wallet) to another.

### How much does it cost to send ethereum to another person (aka a transaction)?

This cost isn't constant and depends on the network congestion. For instance, check out this site showing the : https://ycharts.com/indicators/ethereum_average_transaction_fee



### What is the transaction pool?

### What is gas? 

Gas is used for "doing stuff" in ethereum (sending transactions, executing smart contracts, etc). 

1 ether = 10^9 GWEI = 10^18 WEI

## Technology
### Frontend
- react https://reactjs.org/
- bootstrap https://getbootstrap.com/

### Backend
- node/npm https://nodejs.org/en/
- web3.js https://web3js.readthedocs.io/
- openethereum https://github.com/openethereum/openethereum

## Project Guide

- Start local eth node to mainnet via ` ./openethereum --cache-size 4096 --pruning fast`

- Start the backend
- Start the frontend on http://localhost:3000/
- Start blockchain


# References
- https://ethereum.org/en/developers/docs/gas/
- https://medium.com/@eric.conner/understanding-ethereum-gas-blocks-and-the-fee-market-d5e268bf0a0e
- https://www.youtube.com/watch?v=AJvzNICwcwc
- https://ycharts.com/indicators/ethereum_average_transaction_fee
- https://nodejs.org/en/knowledge/HTTP/clients/how-to-create-a-HTTP-request/
- https://github.com/websockets/ws
- https://stackoverflow.com/questions/12636613/how-to-calculate-moving-average-without-keeping-the-count-and-data-total
- https://stackoverflow.com/questions/48757972/react-js-how-to-only-allow-component-to-update-once-per-second
