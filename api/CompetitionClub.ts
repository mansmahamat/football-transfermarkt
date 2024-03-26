const apiKey = "";

const headers = {
  accept: "application/json",
  Authorization: apiKey
};

export const fetchCompetitionTeams = async (id: string) => {
  const url = `https://transfermarkt-api.vercel.app/competitions/${id}/clubs`;

  const requestOptions = {
    method: "GET",
    headers
  };

  const res = await fetch(url, requestOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = await res.json();

  return json.clubs;
};
