# Web3 Website Deployment to Smart Contract

This project demonstrates how to deploy website code (HTML, CSS, and JavaScript) to a smart contract on the Polygon network using Web3.js. The project leverages Infura as the Web3 provider and secures sensitive information, such as the private key and Infura API, using an `.env` file.

## Project Structure

- **WebsiteContract.sol**: Contains the solidity smart contract to which we save the website files.
- **deployWebsite.js**: Script to deploy the HTML, CSS, and JavaScript code to the smart contract.
- **.env**: Stores environment variables like your private key and Infura API URL.

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

1. **Deploy the smart contract (WebsiteContract.sol) using hardhat or through remix ide**

We will be adding the website files on to this contract.

2. **Deploy Website to Smart Contract:**

    To deploy the HTML, CSS, and JavaScript resources to your smart contract, run:
    ```bash
    node host.js
    ```
    After adding the html, css and js in the host.js file or replacing the template codes. Don't forget to replace the ca with the smart contract address of the one which we deployed at step 1.

    This will add the website files to the smart contract.


## Customization
  
- **HTML, CSS, and JS Content:**
  - You can modify the HTML, CSS, and JS resources in the `host.js` file before deploying them to the contract.

## Environment Variables

Ensure your `.env` file contains the following keys:
- `PRIVATE_KEY`: Your Polygon wallet's private key.
- `INFURA_URL`: Your Infura endpoint URL.

## License

This project is licensed under the MIT License.
