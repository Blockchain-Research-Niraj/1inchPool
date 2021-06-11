const axios = require('axios');
const BASE_URI = 'https://api.1inch.exchange/v3.0/137/swap';
const Web3 = require('web3')
//infura mainnet
const url ='https://polygon-mainnet.infura.io/v3/c0b119f79d23415c8c9d27e4dfa5e54e';
const privateKey ='437ce4515614c23b2b163ab8b6e6e403a453390e6bf837ec3c07f442cd3d71e3';

const ADDRESS ='0xA1ed309b6E219E6a4A48b57c4Cf5E89D599B5f26';


async function get(req,res){

    const web3 = new Web3(url);
    const fromTokenAddress = req.params.fromTokenAddress;
    const toTokenAddress = req.params.toTokenAddress ;
    const amount = req.params.amount;
    const fromAddress = req.params.fromAddress;
    const slippage = req.params.slippage;
    
    const temp = [];
    temp['fromTokenAddress'] = fromTokenAddress;
    temp['toTokenAddress'] = toTokenAddress;
    temp['amount'] = amount;
    temp['fromAddress'] = fromAddress;
    temp['slippage'] = slippage;
    const finalURI = getURI(temp);
    console.log(finalURI);
    const resData = await axios.get(finalURI).then(data=>{
        return data;
    });
console.log(resData.data.tx);

    const signed_Tx = await web3.eth.accounts.signTransaction(resData.data.tx,privateKey).then(data=>{return data});
 const signedTransaction= await web3.eth.sendSignedTransaction(signed_Tx.rawTransaction).then(data=>{return data});
 console.log(signedTransaction)
    return res.send("Hello");
}

function getURI(arr){
    let uri = '?';
    for (var key in arr) {
        uri+=key+'='+arr[key]+'&';
    }
    const finalURI =BASE_URI + uri.slice(0, -1);
    return finalURI;
}

module.exports = {
    get
}