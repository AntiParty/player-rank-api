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
        if (!data.player || !data.player.info || !data.player.info.rank_game_1001001) {
            throw new Error("Rank data not found in the API response.");
        }

        const rankData = data.player.info.rank_game_1001001.rank_game;
        if (!rankData) {
            throw new Error("Rank data not found in the API response.");
        }

        const currentLevel = rankData.level;
        const rankName = rankMapping[currentLevel];
        const currentScore = rankData.rank_score.toFixed(2);
        const maxLevel = rankData.max_level;
        const maxScore = rankData.max_rank_score.toFixed(2);

        // Build the response
        return `Player's rank: ${rankName} (Level ${currentLevel}) | Current Score: ${currentScore} | Max Level: ${maxLevel} | Max Score: ${maxScore}`;
    } catch (error) {
        console.error("Error fetching rank data:", error);
        return "Failed to fetch rank data. Please try again later.";
    }
}

// Run the function and display the result in your page
fetchPlayerRank().then(response => {
    document.getElementById("rank-info").textContent = response;
});
