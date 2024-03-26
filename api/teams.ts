const headers = {
  accept: "application/json"
};

export const fetchTeamById = async (id) => {
  const url = `https://transfermarkt-api.vercel.app/clubs/${id}/players`;

  const requestOptions = {
    method: "GET",
    headers
  };

  const res = await fetch(url, requestOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamData = await res.json();

  // Return team data if there are no players
  if (!teamData.players || teamData.players.length === 0) {
    return teamData;
  }

  // Fetch player info for each player
  const players = teamData.players;
  const playersWithInfo = await Promise.all(
    players.map(async (player) => {
      try {
        const playerInfo = await fetchPlayerInfo(player.id);
        return { ...player, info: playerInfo }; // Merge player info with player data
      } catch (error) {
        console.error("Error fetching player info:", error);
        return player; // If error occurs, return player data without info
      }
    })
  );

  return { ...teamData, players: playersWithInfo };
};

const fetchPlayerInfo = async (playerId) => {
  const url = `https://transfermarkt-api.vercel.app/players/${playerId}/profile`;

  const requestOptions = {
    method: "GET",
    headers
  };

  const res = await fetch(url, requestOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch player info for player ID: ${playerId}`);
  }

  const playerInfo = await res.json();
  return playerInfo;
};
