# DecentralVows 💍

DecentralVows is a unique blockchain-based application designed to strengthen marriage commitments through smart contracts and financial incentives.

## 📖 Overview

DecentralVows offers a solution that encourages couples to stay committed while providing a fair and transparent system for managing disputes. Marriage commitments are recorded on the blockchain, allowing couples to earn rewards for staying together while implementing penalties for separation.

## 🌟 Key Features

- 🔗 **Blockchain-Based Vows**: Each party in a marriage submits their vow by depositing 5 ETH into a secure smart contract.
- 💰 **Reward System**: Committed couples share a pot that increases when other couples separate.
- ⚖️ **Transparent Divorce Process**: A fair and streamlined process for handling separations.
- 👥 **Jury System**: In case of disputes, a jury reviews and votes on the validity of a divorce.

## 🛠 How It Works

1. 💑 **Commitment**: Each couple locks 10 ETH (5 ETH per person) into the smart contract.
2. 📈 **Rewards**: The locked ETH is restaked to earn compounding rewards over time.
3. 📄 **Divorce Process**:
   - The first to report gets 2 ETH back.
   - The other party has one week to accept (receiving 1 ETH) or dispute.
   - If disputed, a jury of 5 members reviews the case.
4. 🏆 **Pot Distribution**: Remaining committed couples share the accumulated pot.

## 💻 Technology Stack

- 🌐 Frontend: React.js
- 🧭 Routing: React Router
- 🎨 Styling: Tailwind CSS
- 🗄️ State Management: React Context API
- 📜 Smart Contracts: Solidity

## 🧩 Components

- 🏠 **Homepage**: Introduces the concept and benefits of DecentralVows
- 💸 **DepositUser1 and DepositUser2**: Handles the deposit process for each user in a couple
- ⚖️ **Jury**: Manages the jury voting process for disputed divorces
- 📝 **ReportDivorce**: Allows users to report a divorce
- 💬 **RespondDivorce**: Enables the other party to respond to a divorce report

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Run the development server: `npm start` or `yarn start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📜 Smart Contracts

The Solidity smart contracts for DecentralVows are maintained in a separate repository. You can find them here:

[DecentralVows Contracts](https://github.com/kellynwong/decentralvows_contracts)

Please refer to the README in that repository for instructions on deploying and interacting with the smart contracts.

## 🤝 Contributing

We welcome contributions to DecentralVows! 

## 📄 License

This project is licensed under the MIT License. 

## ⚠️ Disclaimer

DecentralVows is a concept application and should not be used as a substitute for legal marriage processes. Always consult with legal professionals for matters related to marriage and divorce.
