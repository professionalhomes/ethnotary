🐘 ethnotary
Designed with decentralization in mind for the worldwide community. 🌐

ethnotary helps users secure funds or treasuries for their on-chain activities. We take accepted standards from Ethereum to provide easy-to-use interfaces where users can customize smart contracts to fit their needs and manage their assets on the blockchain. We do not collect any user data. We provide our interface in a sufficiently distributed architecture that ensures robust and reliable operation globally on the World Wide Web.

As such, we suggest a one-time donation for the use of the ethnotary tools. This donation helps support the maintenance, upkeep, and continuous improvements for our community of users.

ethnotary Demo ethnotary Demo

✨ Features
Double authentication for extra security. Add multiple wallet approvals to send transactions.
Support for various layer 2 networks like Polygon, BNB Chain, OP, and Base.
Available globally on the World Wide Web.
Decentralized architecture: our interface does not collect any user data. All user data is stored on-chain!
📍 Roadmap
We’re continually working to improve ethnotary and expand its capabilities. Here’s what’s coming next:

 Multi-Signature Approvals for enhanced security
 Layer 2 Network Support for Polygon, BNB Chain, and Base
 Interoperability between Layer 2 Networks for easier user experience
 Mobile-Optimized Interface for seamless access on the go
 Multi-Language Support to better serve our global community
 Third-Party Security Audit for increased reliability and trust
 Customizable Dashboard for personalized user experience
 Integration with DeFi Tools like DEXes and yield farms
 Support for ERC-721 contracts to enable commmerce of media
Got an idea? 💡
See the [open issues] (https://github.com/jalvarez212/ethnotary/issues) for a full list of proposed features (and known issues).

🔗 Connect
💬 Need Help?
Join our Support Discord Channel to get assistance, share feedback, or connect with the ethnotary community! We're here to help you make the most of ethnotary.

Join our Discord

Click the button above or visit our Discord support channel.

🌐 Supported Networks
MainnetMainnet

PolygonPolygon

BNB ChainBNB Chain

BaseBase

OptimismOptimism

🔒 Security
ethnotary has not been audited by a third party; a security audit is pending. ethnotary does not collect any user data or hold any user funds. ethnotary contracts are backed by the security of the EVM-compatible blockchains. Please use ethnotary at your own risk, as the application is still in active developmen

🚀 Getting Started
This guide will walk you through the steps required to run ethnotary on your local machine. You can also access the dApp on the web at ethnotary.io.

✅ Prerequisites
Before getting started, ensure you have the following:

Web3-Enabled Browser Web3-Enabled Browser: Use a browser with Web3 capabilities.
ethnotary Smart Contract Address If you do not have a contract address, you can create one on the wizard page.
Etherscan API Key Get a free API key at Etherscan.
RPC Provider API Key Get a free RPC provider API key at Infura or use another provider.
Python 3.x (Only if running locally): Download and install Python if it's not already installed.
Accessing via the web @ ethnotary.io
You can access ethnotary in your web3-enabled browser by navigating to:

http://ethnotary.io?YOUR_ACCOUNT_ADDRESS

Replace YOUR_ACCOUNT_ADDRESS in the URL with your account address. If you do not have an account, you can create one online at wizard page. Make sure your Web3-enabled browser that is connected to the appropriate network.

Running ethnotary locally
If you prefer to run ethnotary on your local machine, follow the steps below:

Clone the Repository

First, clone the repository to your local machine using Git.

Set Up RPC API Provider Keys

Create a file named keys.js in the root directory and add your keys:

const ENV = {ETHERSCAN_API_KEY: 'your-etherscan-api-key',RPC_NODE_KEY: 'your-infura-project-id'};

Replace 'your-etherscan-api-key' and 'your-infura-project-id'with your API keys. Users can obtain a free Etherscan API key by signing up at Etherscan.io and a free Infura API key by creating an account at Infura.io.

Navigate to the ethnotary directory & start a local HTTP server

To run ethnotary on your local machine, you need to start a simple HTTP server. Run the following command in the terminal:

python -m http.server 8000

Open the dApp in a Web3 Enabled Browser

Once the server is running, open your Web3-enabled browser and navigate to the following URL:

http://localhost:8000/?YOUR_ACCOUNT_ADDRESS

Replace YOUR_ETH_ADDRESS in the URL with your account address.

Creating an account

If you do not have a contract address, you can create one using the wizard page by opening your web3 browser and navigating to: http://localhost:8000/wizard.html﻿

Make sure your Web3-enabled browser is connected to the appropriate network.

Notes

Ensure your browser has Web3 integration. You can do this by installing a wallet such as MetaMask or by using a browser that natively supports Web3.
The dApp will not function properly without connecting to a Web3 network, so double-check that your Web3 provider (MetaMask or similar) is working as expected.
Troubleshooting

If you encounter any issues while running the dApp, please check the following:
Make sure you are in the correct directory when running the Python HTTP server.
Ensure your web browser has Web3 enabled and is connected to the correct network.
If you encounter port-related issues, ensure that port 8000 is not in use by another application.
🤝 Contributing
Fork the Project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
