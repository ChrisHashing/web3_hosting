import 'dotenv/config'; 
import { Web3 } from 'web3';
import fs from 'fs'; // Import fs module to read files
const web3 = new Web3(`${process.env.INFURA_API}`);

const contractAddress = '0x11C4Db762562B5464e3d4BBb2EB1458dD84589B2';
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
		"name": "setResourceChunk",
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
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getResourceChunk",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "path",
				"type": "string"
			}
		],
		"name": "getTotalChunks",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
]
const contract = new web3.eth.Contract(contractABI, contractAddress);
const ownerAddress = '0x2DDE975DC63413dc35487E875d5681f3d9cf0dAE';
const privateKey = process.env.PRIVATE_KEY;  

const CHUNK_SIZE = 14576; 

async function addWebsiteInChunks(path, content, contentType) {
    try {
        const totalChunks = Math.ceil(content.length / CHUNK_SIZE);
        console.log(`Total chunks to upload for ${contentType}: ${totalChunks}`);

        // Get the total chunks already uploaded to compare
        const existingTotalChunks = await contract.methods.getTotalChunks(path).call();

        for (let i = 0; i < totalChunks; i++) {
            const chunk = content.substring(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

            // Check if chunk already exists before uploading
            if (i < existingTotalChunks) {
                const existingChunk = await contract.methods.getResourceChunk(path, i).call();
                if (existingChunk[0] === chunk && existingChunk[1] === contentType) {
                    console.log(`Chunk ${i + 1}/${totalChunks} is identical, skipping upload.`);
                    continue; // Skip if the chunk is already the same
                }
            }

            // If chunk is new or modified, upload it
            const nonce = await web3.eth.getTransactionCount(ownerAddress, 'latest');
            const gasPrice = await web3.eth.getGasPrice();
            const gasEstimate = await contract.methods.setResourceChunk(path, chunk, contentType).estimateGas({ from: ownerAddress });

            const tx = {
                to: contractAddress,
                data: contract.methods.setResourceChunk(path, chunk, contentType).encodeABI(),
                gas: gasEstimate * BigInt(2),
                gasPrice: gasPrice * BigInt(2),
                nonce: nonce
            };

            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            // Log progress after each chunk is sent
            console.log(`Chunk ${i + 1}/${totalChunks} of ${contentType} uploaded successfully. Transaction hash: ${receipt.transactionHash}`);
        }

        console.log(`${contentType} added successfully in chunks`);
    } catch (error) {
        console.error(`Error adding ${contentType}:`, error);
    }
}


async function uploadWebsite() {
    const htmlContent = fs.readFileSync('calculator/index.html', 'utf8');
    const cssContent = fs.readFileSync('calculator/static/css/main.b64721ac.css', 'utf8');
    const jsContent = fs.readFileSync('calculator/static/js/main.8453bf40.js', 'utf8');

    await addWebsiteInChunks("/", htmlContent, "text/html");
    await addWebsiteInChunks("/styles.css", cssContent, "text/css");
    await addWebsiteInChunks("/script.js", jsContent, "application/javascript");
}

uploadWebsite();