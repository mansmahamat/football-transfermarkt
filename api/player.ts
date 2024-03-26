import customLabel from "../components/CustomLabel";

const headers = {
  accept: "application/json"
};

interface Transfer {
  id: string;
  clubProfile: ClubProfile; // Define ClubProfile interface
  date: string;
  fee: string;
  from: ClubInfo;
  marketValue: string;
  season: string;
  to: ClubInfo;
  upcoming: boolean;
}

interface ClubInfo {
  clubID: string;
  clubName: string;
}

interface ClubProfile {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  colors: string[];
  currentMarketValue: string;
  currentTransferRecord: string;
  fax: string;
  foundedOn: string;
  historicalCrests: string[];
  id: string;
  image: string;
  league: {
    countryID: string;
    countryName: string;
    id: string;
    name: string;
    tier: string;
  };
  name: string;
  officialName: string;
  otherSports: string[];
  squad: {
    averageAge: string;
    foreigners: string;
    nationalTeamPlayers: string;
    size: string;
  };
  stadiumName: string;
  stadiumSeats: string;
  tel: string;
  updatedAt: string;
  url: string;
  website: string;
}

interface ApiResponse {
  id: string;
  transfers: Transfer[];
  updatedAt: string;
  youthClubs: string[];
}

export const fetchPlayerInfo = async (playerId: any) => {
  const profileUrl = `https://transfermarkt-api.vercel.app/players/${playerId}/profile`;
  const marketValueUrl = `https://transfermarkt-api.vercel.app/players/${playerId}/market_value`;

  // Fetch player profile
  const profileResponse = await fetch(profileUrl, { method: "GET", headers });
  if (!profileResponse.ok) {
    throw new Error(`Failed to fetch player info for player ID: ${playerId}`);
  }
  const playerInfo = await profileResponse.json();

  // Fetch player market value history
  const marketValueResponse = await fetch(marketValueUrl, {
    method: "GET",
    headers
  });
  if (!marketValueResponse.ok) {
    throw new Error(
      `Failed to fetch market value history for player ID: ${playerId}`
    );
  }
  const marketValueData = await marketValueResponse.json();
  const marketValueHistory = marketValueData.marketValueHistory;

  // Format market value history
  const formattedMarketValueHistory = marketValueHistory.map((entry) => {
    let value = entry.value;
    if (value.includes("m")) {
      value = parseFloat(value.replace("€", "").replace("m", "")) * 1000000;
    } else if (value.includes("k")) {
      value = parseFloat(value.replace("€", "").replace("k", "")) * 1000;
    } else {
      value = parseFloat(value.replace("€", ""));
    }

    return {
      value: value,
      dataPointText: entry.value,
      labelComponent: () => customLabel(formatDate(entry.date))
    };
  });

  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const [month, day, year] = dateString.split(" ");
    return `${months[months.indexOf(month)]}, ${year}`;
  }

  // Add market value history to player info
  playerInfo.marketValueHistory = formattedMarketValueHistory;

  return playerInfo;
};

export const getPlayerTransfersAndClubProfile = async (playerId) => {
  try {
    // Fetch player transfers
    const transfersResponse = await fetch(
      `https://transfermarkt-api.vercel.app/players/${playerId}/transfers`
    );
    const transfersData = await transfersResponse.json();

    // Extract club IDs from transfers
    const clubIds = transfersData.transfers.map(
      (transfer) => transfer.to.clubID
    );

    // Fetch club profiles
    const clubProfilePromises = clubIds.map(async (clubId) => {
      const clubProfileResponse = await fetch(
        `https://transfermarkt-api.vercel.app/clubs/${clubId}/profile`
      );
      return clubProfileResponse.json();
    });

    // Wait for all club profile requests to complete
    const clubProfiles = await Promise.all(clubProfilePromises);

    // Merge club profiles with transfers
    const transfersWithClubInfo = transfersData.transfers.map(
      (transfer, index) => {
        return {
          id: transfer.id,
          from: transfer.from,
          to: transfer.to,
          date: transfer.date,
          upcoming: transfer.upcoming,
          season: transfer.season,
          marketValue: transfer.marketValue,
          fee: transfer.fee,
          clubProfile: clubProfiles[index] // Add club profile info to each transfer object
        };
      }
    );

    // Group everything in the response
    const response = {
      id: playerId,
      transfers: transfersWithClubInfo, // Use transfers with club info
      youthClubs: transfersData.youthClubs,
      updatedAt: transfersData.updatedAt
    };

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
