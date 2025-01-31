async function fetchPlayerRank() {
    const proxyUrl = "https://corsproxy.io/?"; // Use a reliable CORS proxy
    const apiUrl = "https://api.rivalstracker.com/api/player/2118492390?season=2";
    const fullUrl = `${proxyUrl}${encodeURIComponent(apiUrl)}`; // Combine proxy and API URL
    const rankMapping = {
        1: "Bronze 1", 2: "Bronze 2", 3: "Bronze 3",
        4: "Silver 1", 5: "Silver 2", 6: "Silver 3",
        7: "Gold 1", 8: "Gold 2", 9: "Gold 3",
        10: "Platinum 1", 11: "Platinum 2", 12: "Platinum 3",
        13: "Diamond 1", 14: "Diamond 2", 15: "Diamond 3",
        16: "Grandmaster 1", 17: "Grandmaster 2", 18: "Grandmaster 3",
        19: "Celestial 1", 20: "Celestial 2", 21: "Celestial 3",
        22: "Eternity", 23: "One Above All"
    };

    try {
        console.log("Fetching data from:", fullUrl); // Log the full URL
        const response = await fetch(fullUrl);
        console.log("Response Status:", response.status); // Log the response status
        const data = await response.json();
        console.log("API Response:", data); // Log the API response

        // Check if the response has the expected structure
        if (!data.rank_history || !Array.isArray(data.rank_history) || data.rank_history.length === 0) {
            throw new Error("No rank history found in the API response.");
        }

        const latestMatch = data.rank_history[0];
        if (!latestMatch.rank) {
            throw new Error("Rank data not found in the latest match.");
        }

        const newLevel = latestMatch.rank.new_level;
        const rankName = rankMapping[newLevel];
        const newScore = latestMatch.rank.new_score.toFixed(2);
        const scoreChange = latestMatch.rank.add_score.toFixed(2);

        // Build the response
        return `Player's rank: ${rankName} (Level ${newLevel}) | Score: ${newScore} | Change: ${scoreChange}`;
    } catch (error) {
        console.error("Error fetching rank data:", error);
        return "Failed to fetch rank data. Please try again later.";
    }
}

// Run the function and display the result in your page
fetchPlayerRank().then(response => {
    document.getElementById("rank-info").textContent = response;
});
