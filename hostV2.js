import 'dotenv/config'; 
import { Web3 } from 'web3';
import fs from 'fs'; // Import fs module to read files
const web3 = new Web3(`${process.env.INFURA_API}`);

const contractAddress = '0x5aC85C4BbA7924e49383FE935b9BE86B40bF61C3';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "path",
				"type": "string"
			}
		],
		"name": "removeResource",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "path",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contentType",
				"type": "string"
			}
		],
		"name": "setResource",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "path",
				"type": "string"
			}
		],
		"name": "getResource",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contract = new web3.eth.Contract(contractABI, contractAddress);

const ownerAddress = '0x2DDE975DC63413dc35487E875d5681f3d9cf0dAE';
const privateKey = process.env.PRIVATE_KEY;  // Use .env to store your private key

async function addWebsiteToContract() {
    try {
        const nonce = await web3.eth.getTransactionCount(ownerAddress, 'latest'); // nonce for the transaction
        const gasPrice = await web3.eth.getGasPrice(); // Get current gas price

        // Read the HTML, CSS, and JS files from the file system
        const htmlContent = fs.readFileSync('dist/index.html', 'utf8');
        const cssContent = fs.readFileSync('dist/assets/index-Cha6hc4w.css', 'utf8');
        const jsContent = fs.readFileSync('dist/assets/index-BmOqvr_F.js', 'utf8');

        // Estimate gas for HTML
        const gasEstimateHTML = await contract.methods.setResource("/", htmlContent, "text/html").estimateGas({ from: ownerAddress });

        // Create the HTML transaction
        const txHTML = {
            to: contractAddress,
            data: contract.methods.setResource("/", htmlContent, "text/html").encodeABI(),
            gas: gasEstimateHTML * BigInt(2),
            gasPrice: gasPrice * BigInt(2),
            nonce: nonce,
        };

        // Sign and send the HTML transaction
        const signedTxHTML = await web3.eth.accounts.signTransaction(txHTML, privateKey);
        const receiptHTML = await web3.eth.sendSignedTransaction(signedTxHTML.rawTransaction);
        console.log("HTML added successfully with hash:", receiptHTML.transactionHash);

        // Estimate gas for CSS
        const gasEstimateCSS = await contract.methods.setResource("/styles.css", cssContent, "text/css").estimateGas({ from: ownerAddress });

        // Create the CSS transaction
        const txCSS = {
            to: contractAddress,
            data: contract.methods.setResource("/styles.css", cssContent, "text/css").encodeABI(),
            gas: gasEstimateCSS * BigInt(2),
            gasPrice: gasPrice * BigInt(2),
            nonce: nonce + BigInt(1),  // Increment nonce for next transaction
        };

        // Sign and send the CSS transaction
        const signedTxCSS = await web3.eth.accounts.signTransaction(txCSS, privateKey);
        const receiptCSS = await web3.eth.sendSignedTransaction(signedTxCSS.rawTransaction);
        console.log("CSS added successfully with hash:", receiptCSS.transactionHash);

        // Estimate gas for JS
        const gasEstimateJS = await contract.methods.setResource("/script.js", jsContent, "application/javascript").estimateGas({ from: ownerAddress });

        console.log(gasEstimateJS);
        
        // Create the JavaScript transaction
        const txJS = {
            to: contractAddress,
            data: contract.methods.setResource("/script.js", jsContent, "application/javascript").encodeABI(),
            gas: gasEstimateJS * BigInt(2),
            gasPrice: gasPrice * BigInt(2),
            nonce: nonce + BigInt(0),  // Increment nonce for next transaction
        };

        // Sign and send the JavaScript transaction
        const signedTxJS = await web3.eth.accounts.signTransaction(txJS, privateKey);
        const receiptJS = await web3.eth.sendSignedTransaction(signedTxJS.rawTransaction);
        console.log("JavaScript added successfully with hash:", receiptJS.transactionHash);

    } catch (error) {
        console.error("Error adding website to contract:", error);
    }
}

addWebsiteToContract();
