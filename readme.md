# 🐘 ethnotary 

Designed with decentralization in mind for the worldwide community. 🌐

**ethnotary** helps users secure funds or treasuries for their onchain activities. We take accepted standards from ethereum to provide easy to use interfaces where users can customize smart contracts to fit their needs and manage their assests on the blockchain. We do not collect any user data. We provide our interface in a sufficiently distributed architecture that ensures robust and reliable operation gloablly on the world wide web.

As such, we suggest a one-time donation for the use of the ethnotary tools. This donation helps support the maintenance, upkeep, and continuous improvements for our community of users.


## Features

- Double authentication for extra security. Add multiple wallet approvals to send transactions. 
- Support for various layer 2 networks like Soneium, Polygon, BNB Chain, and Base.
- Available globally on the world wide web.
- Easily connect to dApps and interact with other contracts on your network.
- Decentralized architecture, our interface does not collect any user data. All user data is stored onchain!


## Support today for 

<img align="left" width="20" height="20" src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=035" alt="Mainnet">Mainnet

<img align="left" width="20" height="20" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" alt="Soneium">Soneium

<img align="left" width="20" height="20" src="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=035" alt="Polygon">Polygon

<img align="left" width="20" height="20" src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=035" alt="BNB Chain">BNB Chain

<img align="left" width="20" height="20" src="https://github.com/base-org/brand-kit/blob/main/logo/in-product/Base_Network_Logo.svg" alt="Base">Base

## Security

ethnotary has not been audited by a third party, a security audit is pending. ethnotary does not collect any user data or hold any user fund. Please use ethnotary at your own risk as the application is still in active development. 

## Installation

This guide will walk you through the steps required to run ethnotary on your local machine.

You can also access the dApp on the web at [ethnotary.io](http://ethnotary.io).

### Prerequisites

Before getting started, ensure you have the following:

- **Web3 Enabled Browser**: Use a browser with Web3 capabilities, such as [MetaMask](https://metamask.io/) for Chrome or Firefox.
- **Python 3.x** (Only if running locally): [Download and install Python](https://www.python.org/downloads/) if it's not already installed.

---

### Accessing via the web @  [ethnotary.io](http://ethnotary.io)**

You can access ethnotary in your web3 enabled browser by navigating to:

```http://ethnotary.io?YOUR_ACCOUNT_ADDRESS```

Replace `YOUR_ACCOUNT_ADDRESS` in the URL with your account address.

If you do not have an Ethereum account, you can create a new account either:

- By using the [wizard page](http://ethnotary.io/wizard.html) on the hosted site
- Or, by navigating to the wizard page locally (see instructions below).

Make sure your Web3-enabled browser is active and connected to the appropriate Ethereum network.

#### **Option 2: Running the dApp Locally**

If you prefer to run the dApp on your local machine, follow the steps below:

1. **Clone the Repository**

   First, clone the repository to your local machine using Git:

   ``` git clone https://github.com/yourusername/your-repo-name.git ```

Replace yourusername and your-repo-name with your actual GitHub username and repository name.

2. Navigate to the Project Directory

Change directory to the root of the project folder:

``` cd your-repo-name ```

3. Start a Local HTTP Server

To serve the dApp files on your local machine, you need to start a simple HTTP server. Run the following command in the terminal:

```python -m http.server 8000```

This will start an HTTP server on port 8000 and serve files from the current directory.

4. Open the dApp in a Web3 Enabled Browser

Once the server is running, open your Web3-enabled browser and navigate to the following URL:

```http://localhost:8000/?YOUR_ACCOUNT_ADDRESS```

Replace YOUR_ETH_ADDRESS in the URL with your account address.


## Create a New Account

If you do not have an account, you can create one using the local wizard page by navigating to:


```http://localhost:8000/wizard.html```

Make sure your Web3 browser (e.g., MetaMask) is properly set up and connected to the appropriate Ethereum network.

**Notes**
- Ensure your browser has Web3 integration. You can do this by installing a wallet such as MetaMask or by using a browser that natively supports Web3.
- The dApp will not function properly without connecting to a Web3 network, so double-check that your Web3 provider (MetaMask or similar) is working as expected.

**Troubleshooting**
- If you encounter any issues while running the dApp, please check the following:
- Make sure you are in the correct directory when running the Python HTTP server.
- Ensure your web browser has Web3 enabled and is connected to the correct network.
- If you encounter port-related issues, ensure that port 8000 is not in use by another application.


