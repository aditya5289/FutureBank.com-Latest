
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8083/api/accounts";

// Centralized fetch call to handle repetitive tasks
async function performFetch(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Attempt to read response text for detailed error message
      const errorText = await response.text();
      throw new Error(`Request failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch operation failed:", error);
    throw error; // Rethrow to allow caller to handle
  }
}

// Define service functions using the centralized fetch call
async function transferWithinBank(details) {
  return performFetch(`${apiUrl}/transfers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });

  
}

async function transferToOtherBank(details) {
  return performFetch(`${apiUrl}/transfer/other-bank`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
}

async function quickTransfer(details) {
  return performFetch(`${apiUrl}/transfer/quick`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
}

async function scheduleTransfer(details) {
  return performFetch(`${apiUrl}/transfer/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
}

async function checkTransactionStatus(transactionId) {
  return performFetch(`${apiUrl}/transfer/status/${transactionId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

export const fundTransferService = {
  transferWithinBank,
  transferToOtherBank,
  quickTransfer,
  scheduleTransfer,
  checkTransactionStatus,
};
