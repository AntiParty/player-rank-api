// api/rank.js
export default async function handler(req, res) {
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
        const apiUrl = "https://api.rivalstracker.com/api/player/2118492390?season=2";
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.player || !data.player.info) {
            throw new Error("Player info not found.");
        }

        const rankDataString = data.player.info.rank_game_1001002;
        if (!rankDataString) {
            throw new Error("Rank data not found.");
        }

        const rankData = JSON.parse(rankDataString).rank_game;
        if (!rankData) {
            throw new Error("Rank data not found.");
        }

        const currentLevel = rankData.level;
        const rankName = rankMapping[currentLevel];
        
        // Respond with just the rank name in raw text
        res.status(200).send(rankName);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to fetch rank data.");
    }
}
