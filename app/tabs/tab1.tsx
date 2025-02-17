// @ts-nocheck
import { useEffect, useState } from "react";
import { Cloud, Moon, Star, Sun } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import {
  Button,
  Group,
  H5,
  Image,
  ListItem,
  ScrollView,
  Spinner,
  Tabs,
  Text,
  XStack,
  YGroup,
  YStack
} from "tamagui";

import { fetchCompetitionTeams } from "../../api/CompetitionClub";
import { fetchTeamById } from "../../api/teams";
import { MyStack } from "../../components/MyStack";

export default function Tab1() {
  const [data, setData] = useState([]);
  const [leagueId, setLeagueId] = useState("GB1");
  const [loading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const fetchStanding = async () => {
      const standings = await fetchCompetitionTeams(leagueId);
      setData(standings);
      setIsLoading(false);
    };

    fetchStanding();
  }, [leagueId]);

  return (
    <MyStack>
      <YStack
        padding="$3"
        space="$2"
        alignItems="center"
      >
        <Group orientation="horizontal">
          <Group.Item>
            <Button onPress={() => setLeagueId("FR1")}>🇫🇷</Button>
          </Group.Item>
          <Group.Item>
            <Button onPress={() => setLeagueId("GB1")}>🏴󠁧󠁢󠁥󠁮󠁧󠁿</Button>
          </Group.Item>
          <Group.Item>
            <Button onPress={() => setLeagueId("ES1")}>🇪🇸</Button>
          </Group.Item>
          <Group.Item>
            <Button onPress={() => setLeagueId(82)}>🇩🇪</Button>
          </Group.Item>
          <Group.Item>
            <Button onPress={() => setLeagueId(384)}>🇮🇹</Button>
          </Group.Item>
          <Group.Item>
            <Button onPress={() => setLeagueId(462)}>🇵🇹</Button>
          </Group.Item>
        </Group>

        {/* Separator */}
      </YStack>
      <ScrollView>
        {loading ? (
          <YStack
            padding="$3"
            space="$4"
            alignItems="center"
          >
            <Spinner
              size="large"
              color="$orange10"
            />
          </YStack>
        ) : (
          <YGroup
            alignSelf="center"
            bordered
            size="$4"
          >
            {data.map((item, index) => (
              <YGroup.Item key={index}>
                <ListItem
                  onPress={() => router.push(`/teams/${item.id}`)}
                  hoverTheme
                >
                  <XStack
                    flex={1}
                    space="$2"
                    borderWidth={2}
                    borderColor="$color"
                    borderRadius="$4"
                    padding="$2"
                    alignItems="center"
                  >
                    {/* <Image
                      source={{
                        uri: item.participant.image_path,
                        width: 30,
                        height: 30
                      }}
                    /> */}
                    <Text>{item.name}</Text>
                    {/* <Text>{item.position} place </Text>

                    <Text>{item.points} pts</Text> */}
                  </XStack>
                </ListItem>
              </YGroup.Item>
            ))}
          </YGroup>
        )}
      </ScrollView>
    </MyStack>
  );
}
