import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Avatar, Button, ScrollView, Spinner, YStack } from "tamagui";

import {
  fetchPlayerInfo,
  getPlayerTransfersAndClubProfile
} from "../../api/player";
import TransferList from "../../components/TransferList";
import { Transfer } from "../../interface/type";

interface PlayerInfo {
  age: string;
  citizenship: string[];
  club: {
    contractExpires: string;
    id: string;
    joined: string;
    name: string;
  };
  dateOfBirth: string;
  description: string;
  foot: string;
  height: string;
  id: string;
  imageURL: string;
  isRetired: boolean;
  marketValue: string;
  name: string;
  nameInHomeCountry: string;
  outfitter: string;
  placeOfBirth: {
    city: string;
    country: string;
  };
  position: {
    main: string;
    other: string[];
  };
  shirtNumber: string;
  socialMedia: string[];
  updatedAt: string;
  url: string;
}

const ProfileScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [players, setPlayers] = useState<PlayerInfo | null>();
  const [transfert, setTransfert] = useState<any | null>();
  const [loading, setIsLoading] = useState(false);

  const customLabel = (val) => {
    return (
      <View style={{ width: 70, marginLeft: 7 }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>{val}</Text>
      </View>
    );
  };

  const lineData = [
    { value: 0, dataPointText: "0" },
    { value: 20, dataPointText: "20" },
    { value: 18, dataPointText: "18" },
    {
      value: 40,
      dataPointText: "40",
      labelComponent: () => customLabel("22 Nov")
    },
    { value: 36, dataPointText: "36" },
    { value: 60, dataPointText: "60" },
    { value: 54, dataPointText: "54" },
    { value: 85, dataPointText: "85" }
  ];

  const fetchStanding = async () => {
    setIsLoading(true);
    const test = await fetchPlayerInfo(params.playerId);
    const transfertData = await getPlayerTransfersAndClubProfile(
      params.playerId
    );
    setTransfert(transfertData.transfers);

    setPlayers(test);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStanding();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: `Player ${params.playerId}'s `,
          headerLeft() {
            return (
              <Button
                mr="$2.5"
                onPress={router.back}
              >
                <MaterialCommunityIcons name="arrow-left" />
              </Button>
            );
          }
        }}
      />
      <View style={styles.avatarContainer}>
        <Avatar size="$12">
          <Avatar.Image
            accessibilityLabel="Cam"
            src={players?.imageURL}
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <Text style={styles.name}>
          {players?.name} {players?.shirtNumber}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Date of birth:</Text>
          <Text style={styles.infoValue}>
            {players?.dateOfBirth}, {players?.age} years old{" "}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Place of birth :</Text>
          <Text style={styles.infoValue}>
            {players?.placeOfBirth?.city}, {players?.placeOfBirth?.country}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Position:</Text>
          <Text style={styles.infoValue}>{players?.position?.main}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Foot:</Text>
          <Text style={styles.infoValue}>{players?.foot}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Value:</Text>
          <Text style={styles.infoValue}>{players?.marketValue}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Joined in :</Text>
          <Text style={styles.infoValue}>{players?.club.joined}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Contract expire in :</Text>
          <Text style={styles.infoValue}>{players?.club?.contractExpires}</Text>
        </View>
        <View style={styles.infoContainer}>
          <TransferList transfert={transfert} />
        </View>

        <View style={{ backgroundColor: "#1A3461", width: 400, marginTop: 20 }}>
          <LineChart
            initialSpacing={0}
            width={400}
            //@ts-ignore
            data={players?.marketValueHistory}
            spacing={150}
            textColor1="yellow"
            textShiftY={-8}
            textShiftX={-10}
            textFontSize={13}
            thickness={5}
            hideRules
            hideYAxisText
            yAxisColor="#0BA5A4"
            showVerticalLines
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="#0BA5A4"
            color="#0BA5A4"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  },
  infoContainer: {
    marginTop: 20
  },
  infoLabel: {
    fontWeight: "bold"
  },
  infoValue: {
    marginTop: 5
  }
});

export default ProfileScreen;
