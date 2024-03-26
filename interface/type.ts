export interface Transfer {
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
