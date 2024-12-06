# Solana Devnet Blockchain Visualization

A real-time visualization tool for the Solana Devnet blockchain, designed and developed by **Wasiff Ali Shah**. This application provides insights into block and transaction data, making blockchain exploration more intuitive.

## Features

- **Real-Time Data Fetching:** Continuously fetches and displays finalized blocks from the Solana Devnet.
- **Detailed Block Information:** Shows block height, hash, parent slot, transaction count, and timestamps.
- **Analytics Dashboard:** Displays:
  - Total blocks displayed in the last minute.
  - Average transactions per block.
  - Average transactions per minute.
- **User-Friendly Interface:** Clean design with responsive layouts for mobile and desktop users.
- **Custom Styling:** Includes a digital clock font for presenting stats in an eye-catching manner.
- **Error Handling:** Shows popup alerts for connectivity or data fetch issues.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Blockchain API:** Solana Web3.js
- **Build Tools:** Webpack/Vite (for font handling and asset bundling)
- **Fonts:** TrueType font imported for digital-style number display

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/wasiffalishah/solana-visualization.git
   ```
2. Navigate to the project folder:
   ```bash
   cd solana-visualization
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Click the **Start** button on the interface to begin fetching real-time blockchain data.
2. View statistics for blocks and transactions updated every minute.
3. Analyze detailed block information in the chain visualization.

## Screenshots

![Desktop View](path/to/desktop-screenshot.png)
![Mobile View](path/to/mobile-screenshot.png)

## Author

Developed by **Wasiff Ali Shah**  
- **Portfolio:** [wasiffalishah.netlify.app](https://wasiffalishah.netlify.app)  
- **GitHub:** [Wasiff Ali Shah](https://github.com/wasiffalishah)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
