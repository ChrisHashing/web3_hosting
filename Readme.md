# Web3 Website Deployment to Smart Contract

This project demonstrates how to deploy website code (HTML, CSS, and JavaScript) to a smart contract on the Polygon network using Web3.js. The project leverages Infura as the Web3 provider and secures sensitive information, such as the private key and Infura API, using an `.env` file.

## Project Structure

- **WebsiteContractV3.sol**: Contains the updated Solidity smart contract to which we save the website files in chunks.
- **hostV3.js**: Script to deploy the HTML, CSS, and JavaScript code to the smart contract in chunks.
- **.env**: Stores environment variables like your private key and Infura API URL.

## Smart Contract (WebsiteContractV3.sol)

The `WebsiteContractV3.sol` contract allows for storing website resources in chunks, which is useful for larger files. Key features include:

- Stores resources as chunks, allowing for larger file uploads.
- Each chunk contains content and content type.
- Functions to set, get, and remove resource chunks.
- Keeps track of the total number of chunks for each resource.

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14.x or higher)
- NPM or Yarn
- Infura Account (with Polygon network access)
- A Polygon wallet with sufficient MATIC to cover gas fees.

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/ChrisHashing/web3_hosting.git
    ```

2. Navigate to the project directory:
    ```bash
    cd web3_hosting
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory with the following contents:
    ```bash
    PRIVATE_KEY=<your_private_key>
    INFURA_URL=https://polygon-mainnet.infura.io/v3/<your_project_id>
    ```

## Usage

1. **Deploy the smart contract (WebsiteContractV3.sol) using hardhat or through remix ide**

2. **Deploy Website to Smart Contract:**

    To deploy the HTML, CSS, and JavaScript resources to your smart contract, run:
    ```bash
    node hostV3.js
    ```
    This script will read the build files from your React application and upload them in chunks to the smart contract.

## Customization

- **React Build Files:**
  - Build your React application and ensure the build files are in the `calculator` directory (or update the paths in `hostV3.js` accordingly).

## Environment Variables

Ensure your `.env` file contains the following keys:
- `PRIVATE_KEY`: Your Polygon wallet's private key.
- `INFURA_URL`: Your Infura endpoint URL.

## License

This project is licensed under the MIT License.