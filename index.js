async function fetchPlayerRank() {
    const proxyUrl = "https://corsproxy.io/?"; // Use a reliable CORS proxy
    const apiUrl = "https://api.rivalstracker.com/api/player/2118492390?season=2";
    const fullUrl = `${proxyUrl}${encodeURIComponent(apiUrl)}`; // Combine proxy and API URL
    const rankMapping = {
        1: "Bronze 3", 2: "Bronze 2", 3: "Bronze 1",
        4: "Silver 3", 5: "Silver 2", 6: "Silver 1",
        7: "Gold 3", 8: "Gold 2", 9: "Gold 1",
        10: "Platinum 3", 11: "Platinum 2", 12: "Platinum 1",
        13: "Diamond 3", 14: "Diamond 2", 15: "Diamond 1",
        16: "Grandmaster 3", 17: "Grandmaster 2", 18: "Grandmaster 1",
        19: "Celestial 3", 20: "Celestial 2", 21: "Celestial 1",
        22: "Eternity", 23: "One Above All"
    };

    try {
        console.log("Fetching data from:", fullUrl); // Log the full URL
        const response = await fetch(fullUrl);
        console.log("Response Status:", response.status); // Log the response status
        const data = await response.json();
        console.log("API Response:", data); // Log the API response

        // Check if the response has the expected structure
        if (!data.player || !data.player.info) {
            throw new Error("Player info not found in the API response.");
        }

        // Extract rank data from rank_game_1001001
        const rankData = data.player.info.rank_game_1001001;
        if (!rankData || !rankData.rank_game) {
            throw new Error("Rank data not found in the API response.");
        }

        const currentLevel = rankData.rank_game.level;
        const rankName = rankMapping[currentLevel];
        const currentScore = rankData.rank_game.rank_score.toFixed(2);
        const maxLevel = rankData.rank_game.max_level;
        const maxScore = rankData.rank_game.max_rank_score.toFixed(2);

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
