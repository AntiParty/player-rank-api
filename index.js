async function fetchPlayerRank() {
    const proxyUrl = "https://corsproxy.io/?"; // Use a reliable CORS proxy
    const apiUrl = "https://api.rivalstracker.com/api/player/2118492390?season=2";
    const fullUrl = `${proxyUrl}${encodeURIComponent(apiUrl)}`; // Combine proxy and API URL

    // Rank thresholds (each rank requires 100 points)
    const rankThresholds = [
        { name: "Bronze 1", minScore: 0 },
        { name: "Bronze 2", minScore: 100 },
        { name: "Bronze 3", minScore: 200 },
        { name: "Silver 1", minScore: 300 },
        { name: "Silver 2", minScore: 400 },
        { name: "Silver 3", minScore: 500 },
        { name: "Gold 1", minScore: 600 },
        { name: "Gold 2", minScore: 700 },
        { name: "Gold 3", minScore: 800 },
        { name: "Platinum 1", minScore: 900 },
        { name: "Platinum 2", minScore: 1000 },
        { name: "Platinum 3", minScore: 1100 },
        { name: "Diamond 1", minScore: 1200 },
        { name: "Diamond 2", minScore: 1300 },
        { name: "Diamond 3", minScore: 1400 },
        { name: "Grandmaster 1", minScore: 1500 },
        { name: "Grandmaster 2", minScore: 1600 },
        { name: "Grandmaster 3", minScore: 1700 },
        { name: "Celestial 1", minScore: 1800 },
        { name: "Celestial 2", minScore: 1900 },
        { name: "Celestial 3", minScore: 2000 },
        { name: "Eternity", minScore: 2100 },
        { name: "One Above All", minScore: 2200 }
    ];

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

        const maxScore = rankData.rank_game.max_rank_score;

        // Calculate the rank based on maxScore
        let rankName = "Unranked";
        for (let i = rankThresholds.length - 1; i >= 0; i--) {
            if (maxScore >= rankThresholds[i].minScore) {
                rankName = rankThresholds[i].name;
                break;
            }
        }

        const currentScore = rankData.rank_game.rank_score.toFixed(2);
        const maxLevel = rankData.rank_game.max_level;

        // Build the response
        return `Player's rank: ${rankName} | Current Score: ${currentScore} | Max Level: ${maxLevel} | Max Score: ${maxScore.toFixed(2)}`;
    } catch (error) {
        console.error("Error fetching rank data:", error);
        return "Failed to fetch rank data. Please try again later.";
    }
}

// Run the function and display the result in your page
fetchPlayerRank().then(response => {
    document.getElementById("rank-info").textContent = response;
});
