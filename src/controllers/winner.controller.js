//"use strict";
const axios = require('axios')
const Web3 = require('web3')
const Common = require('ethereumjs-common').default;
var Tx = require('ethereumjs-tx').Transaction;

//infura mainnet
const url ='https://polygon-mainnet.infura.io/v3/c0b119f79d23415c8c9d27e4dfa5e54e';

//approveUrl 1inch
const approveURL='http://api.1inch.exchange/v3.0/137/approve/calldata';

//Private Key
const privateKey ='437ce4515614c23b2b163ab8b6e6e403a453390e6bf837ec3c07f442cd3d71e3';

const ADDRESS ='0xA1ed309b6E219E6a4A48b57c4Cf5E89D599B5f26';

//Api to Approve Token
exports.findAllData = async function (req, res) {
//Receive Request data
const web3 = new Web3(url);
const tokenAddress = req.params.token;
const amount = req.params.amount;

let nonce =await web3.eth.getTransactionCount(ADDRESS).then(data=>{
  return data;
}) 

 const globalData = await approveApiCaller(approveURL, amount, tokenAddress, nonce);


  const signed_Tx = await web3.eth.accounts.signTransaction(globalData,privateKey).then(data=>{return data});
 const signedTransaction= await web3.eth.sendSignedTransaction(signed_Tx.rawTransaction).then(data=>{return data});
 console.log(signedTransaction)
 

 var x = "jlk";
    return res.send(x);
};


async function approveApiCaller(url, value, tokenAddress, nonce) {
  url += (value > -1 || value != null ? "?amount=" + value + "&" : "") //tack on the value if it's greater than -1
      + "tokenAddress=" + tokenAddress             //complete the called URL
  let temp =  await axios.get(url);
console.log("Before temp======================================");
  console.log(temp);
  
  temp = temp.data;                               //we only want the data object from the api call
  
  let gasPrice = parseInt(temp["gasPrice"]);
  console.log(gasPrice)
  gasPrice = '0x' + gasPrice.toString(16);        //convert to hexadecimal string
  temp["value"] = "0x" + temp["value"];           //convert value to hecadecimal
  temp["gasPrice"] = gasPrice;                    //change the gas price in the tx object
  temp["gas"] = "0xc3500";                         //gas limit of 50,000, may need to be higher for certain tokens
  temp["from"] = ADDRESS;
  temp["nonce"] = nonce;
  return temp;
}


