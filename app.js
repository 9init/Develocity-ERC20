const express = require('express')
const Web3 = require('web3')

const app = express()

// Connect to Ethereum network using Infura API
const web3 = new Web3("https://mainnet.infura.io/v3/c906d6aa2f324848a8fa4caa608ac29c")

// Replace YOUR_CONTRACT_ADDRESS with the actual address of your ERC-20 contract
// here are a few examples of contract addresses for well-known ERC-20 tokens:
// USDC (USD Coin): 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
// DAI: 0x6b175474e89094c44da98b954eedeac495271d0f
// UNI (Uniswap): 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984
// LINK (Chainlink): 0x514910771af9ca656af840dff83e8264ecf986ca
const contractAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'

// ERC-20 contract ABI supports (name, symbol, totalSupply) methods
const contractABI = [{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const contract = new web3.eth.Contract(contractABI, contractAddress)

app.get('/token-info', async (req, res, next) => {
  try {
    const name = await contract.methods.name().call()
    const symbol = await contract.methods.symbol().call()
    const totalSupply = await contract.methods.totalSupply().call()

    res.json({ name, symbol, totalSupply })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal server error' })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})