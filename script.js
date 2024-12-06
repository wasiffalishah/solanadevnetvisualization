let blocks = [];
let transactionCounts = [];
let blockTimestamps = [];
let totalTransactionsInLastMinute = 0;

let displayedBlocksInLastMinute = 0;

let blockTimeLimit = 60000; // 1 minute in milliseconds
let hourTimeLimit = 3600000; // 1 hour in milliseconds

async function startBlockchain() {
  const network = "https://api.devnet.solana.com";
  const connection = new solanaWeb3.Connection(network, "finalized");

  setInterval(async () => {
    try {
      const latestSlot = await connection.getSlot("finalized");
      console.log("Latest Slot:", latestSlot);

      const block = await connection.getBlock(latestSlot, {
        maxSupportedTransactionVersion: 0,
      });

      if (block) {
        if (!blocks.length || blocks[0].blockHeight !== block.blockHeight) {
          blocks.unshift(block);
          renderBlockchain();
          trackBlockData(block);
        }
      }
    } catch (error) {
      console.error("Error fetching block data:", error);
      showErrorPopup("Error fetching block data. Please try again later.");
    }
  }, 400);
}

function trackBlockData(block) {
  const currentTimestamp = Date.now();

  blockTimestamps.unshift(currentTimestamp);
  transactionCounts.unshift(block.transactions?.length || 0);

  while (
    blockTimestamps.length &&
    blockTimestamps[blockTimestamps.length - 1] <
      currentTimestamp - blockTimeLimit
  ) {
    blockTimestamps.pop();
    transactionCounts.pop();
  }

  totalTransactionsInLastMinute = transactionCounts.reduce(
    (total, count) => total + count,
    0
  );
  displayedBlocksInLastMinute = blockTimestamps.length;

  // Calculate the total number of transactions and blocks in the last hour
  while (
    blockTimestamps.length &&
    blockTimestamps[blockTimestamps.length - 1] <
      currentTimestamp - hourTimeLimit
  ) {
    blockTimestamps.pop();
    transactionCounts.pop();
  }

  const averageTransactionsPerBlockLastMinute =
    displayedBlocksInLastMinute > 0
      ? (totalTransactionsInLastMinute / displayedBlocksInLastMinute).toFixed(2)
      : 0;
  const averageTransactionsPerMinute =
    totalTransactionsInLastMinute / (blockTimeLimit / 1000 / 60); // average per minute

  // TPS Calculation (Transactions per second)
  const tps = totalTransactionsInLastMinute / (blockTimeLimit / 1000);

  // Block Latency Calculation (Average time between blocks in seconds)
  const blocksPerMinute = displayedBlocksInLastMinute;
  const blockLatency =
    blocksPerMinute > 0 ? (60 / blocksPerMinute).toFixed(2) : 0;

  displayStats(
    averageTransactionsPerBlockLastMinute,
    averageTransactionsPerMinute,
    tps,
    blockLatency
  );
}

function displayStats(
  averageTransactionsPerBlockLastMinute,
  averageTransactionsPerMinute,
  tps,
  blockLatency
) {
  document.getElementById("blockStats").innerHTML = `
  <p><span class="digital-label">Blocks/min</span>
    <span class="digital-number">${displayedBlocksInLastMinute}</span>
  </p>
  <p><span class="digital-label">Trans/min</span>
    <span class="digital-number">${averageTransactionsPerMinute.toFixed(
      2
    )}</span>
  </p>
  <p><span class="digital-label">Trans/Block</span>
    <span class="digital-number">${averageTransactionsPerBlockLastMinute}</span>
  </p>
  <p><span class="digital-label">Trans/sec</span>
    <span class="digital-number">${tps.toFixed(2)}</span>
  </p>
  <p><span class="digital-label">Latency</span>
    <span class="digital-number">${blockLatency}</span>
  </p>
  `;
}

function renderBlockchain() {
  const container = document.getElementById("blockChainContainer");
  container.innerHTML = "";

  blocks.forEach((block, index) => {
    const blockDiv = document.createElement("div");
    blockDiv.classList.add("block");

    const blockTime = block.blockTime
      ? new Date(block.blockTime * 1000).toLocaleString("en-US", {
          timeZone: "Asia/Karachi",
          hour12: true,
        })
      : "Unavailable";

    blockDiv.innerHTML = `
      <p><strong>Slot: #${block.parentSlot}</strong></p>
      <p>Block Height: ${block.blockHeight}</p>
      <p>Block Hash: ${block.blockhash}</p>
      <p>Previous Block Hash: ${block.previousBlockhash || "N/A"}</p>
      <p>Block Time: ${blockTime}</p>
      <p>Transactions: ${block.transactions?.length || 0}</p>
      <button onclick="viewTransactions('${
        block.parentSlot
      }')">View Transactions</button>

    `;

    container.appendChild(blockDiv);

    if (index < blocks.length - 1) {
      const wire = document.createElement("div");
      wire.classList.add("wire");
      container.appendChild(wire);
    }
  });
}

function viewTransactions(parentSlot) {
  if (parentSlot) {
    window.open(`transactions.html?parentSlot=${parentSlot}`, "_blank");
  } else {
    console.error("parentSlot is undefined");
  }
}

function showErrorPopup(message) {
  if (!document.getElementById("errorModal")) {
    const errorModal = document.createElement("div");
    errorModal.id = "errorModal";
    errorModal.style.position = "fixed";
    errorModal.style.top = "50%";
    errorModal.style.left = "50%";
    errorModal.style.transform = "translate(-50%, -50%)";
    errorModal.style.backgroundColor = "#444";
    errorModal.style.color = "#fff";
    errorModal.style.padding = "20px";
    errorModal.style.borderRadius = "8px";
    errorModal.style.boxShadow = "0px 2px 10px rgba(0, 0, 0, 0.3)";
    errorModal.style.zIndex = "1000";
    errorModal.style.textAlign = "center";

    errorModal.innerHTML = `
      <p>${message}</p>
      <button onclick="closeErrorPopup()">Close</button>
    `;

    document.body.appendChild(errorModal);
  }
}

function closeErrorPopup() {
  const errorModal = document.getElementById("errorModal");
  if (errorModal) {
    errorModal.remove();
  }
}

window.onload = () => {
  startBlockchain(); // Starts the blockchain as soon as the page is loaded
};
