import 'dotenv/config'; 
import { Web3 } from 'web3';
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
const privateKey = process.env.PRIVATE_KEY;  // Replace this with your wallet's private key (keep it secure!)

async function addWebsiteToContract() {
    try {
        const nonce = await web3.eth.getTransactionCount(ownerAddress, 'latest'); // nonce for the transaction

        // Estimate gas
        const gasEstimate = await contract.methods.setResource(
            "/",
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Web3 Website Demo</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <div class="container">
                    <h1>Welcome to Web3 Website</h1>
                    <p>This is a demo of a website stored on the blockchain.</p>
                    <button id="changeColorBtn">Change Background Color</button>
                    <div id="counter">
                        <span>Counter: </span>
                        <span id="count">0</span>
                        <button id="incrementBtn">Increment</button>
                    </div>
                </div>
                <script src="script.js"></script>
            </body>
            </html>`,
            "text/html"
        ).estimateGas({ from: ownerAddress });

        const gasPrice = await web3.eth.getGasPrice(); // Get current gas price

        // Create the transaction object
        const tx = {
            to: contractAddress,
            data: contract.methods.setResource(
                "/",
                `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Web3 Website Demo</title>
                    <link rel="stylesheet" href="web3://0x5aC85C4BbA7924e49383FE935b9BE86B40bF61C3/styles.css">
                </head>
                <body>
                    <div class="container">
                        <h1>Welcome to Web3 Website</h1>
                        <p>This is a demo of a website stored on the blockchain.</p>
                        <button id="changeColorBtn">Change Background Color</button>
                        <div id="counter">
                            <span>Counter: </span>
                            <span id="count">0</span>
                            <button id="incrementBtn">Increment</button>
                        </div>
                    </div>
                    <script src="web://0x5aC85C4BbA7924e49383FE935b9BE86B40bF61C3/script.js"></script>
                </body>
                </html>`,
                "text/html"
            ).encodeABI(),  // Encoded data
            gas: gasEstimate*BigInt(2),  // Estimated gas
            gasPrice: gasPrice*BigInt(2),  // Gas price
            nonce: nonce,  // Transaction nonce
        };

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        // Send the signed transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Transaction successful with hash:", receipt.transactionHash);

		 // Estimate gas for the CSS
		 const gasEstimateCSS = await contract.methods.setResource(
            "/styles.css",
            `
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                transition: background-color 0.3s ease;
            }
            .container {
                width: 80%;
                margin: auto;
                overflow: hidden;
                padding: 20px;
            }
            h1 {
                color: #333;
            }
            button {
                display: inline-block;
                background: #333;
                color: #fff;
                border: none;
                padding: 10px 20px;
                margin: 5px;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                font-size: 15px;
                font-family: inherit;
            }
            button:hover {
                background: #666;
            }
            #counter {
                margin-top: 20px;
            }
            #count {
                font-weight: bold;
                font-size: 18px;
            }
            `,
            "text/css"
        ).estimateGas({ from: ownerAddress });

        // Create the CSS transaction
        const txCSS = {
            to: contractAddress,
            data: contract.methods.setResource(
                "/styles.css",
                `
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    transition: background-color 0.3s ease;
                }
                .container {
                    width: 80%;
                    margin: auto;
                    overflow: hidden;
                    padding: 20px;
                }
                h1 {
                    color: #333;
                }
                button {
                    display: inline-block;
                    background: #333;
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    margin: 5px;
                    border-radius: 5px;
                    cursor: pointer;
                    text-decoration: none;
                    font-size: 15px;
                    font-family: inherit;
                }
                button:hover {
                    background: #666;
                }
                #counter {
                    margin-top: 20px;
                }
                #count {
                    font-weight: bold;
                    font-size: 18px;
                }
                `,
                "text/css"
            ).encodeABI(),
            gas: gasEstimateCSS * BigInt(2),
            gasPrice: gasPrice * BigInt(2),
            nonce: nonce + BigInt(1),  // Increment nonce for next transaction
        };

        // Sign and send the CSS transaction
        const signedTxCSS = await web3.eth.accounts.signTransaction(txCSS, privateKey);
        const receiptCSS = await web3.eth.sendSignedTransaction(signedTxCSS.rawTransaction);
        console.log("CSS added successfully with hash:", receiptCSS.transactionHash);

		 // Estimate gas for the JavaScript
		 const gasEstimateJS = await contract.methods.setResource(
            "/script.js",
            `
            document.addEventListener('DOMContentLoaded', (event) => {
                const changeColorBtn = document.getElementById('changeColorBtn');
                const incrementBtn = document.getElementById('incrementBtn');
                const countDisplay = document.getElementById('count');
                let count = 0;
                changeColorBtn.addEventListener('click', () => {
                    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                    document.body.style.backgroundColor = "#" + randomColor;
                });
                incrementBtn.addEventListener('click', () => {
                    count++;
                    countDisplay.textContent = count;
                });
            });
            `,
            "application/javascript"
        ).estimateGas({ from: ownerAddress });

        // Create the JavaScript transaction
        const txJS = {
            to: contractAddress,
            data: contract.methods.setResource(
                "/script.js",
                `
                document.addEventListener('DOMContentLoaded', (event) => {
                    const changeColorBtn = document.getElementById('changeColorBtn');
                    const incrementBtn = document.getElementById('incrementBtn');
                    const countDisplay = document.getElementById('count');
                    let count = 0;
                    changeColorBtn.addEventListener('click', () => {
                        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                        document.body.style.backgroundColor = "#" + randomColor;
                    });
                    incrementBtn.addEventListener('click', () => {
                        count++;
                        countDisplay.textContent = count;
                    });
                });
                `,
                "application/javascript"
            ).encodeABI(),
            gas: gasEstimateJS * BigInt(2),
            gasPrice: gasPrice * BigInt(2),
            nonce: nonce + BigInt(2),  // Increment nonce for next transaction
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
