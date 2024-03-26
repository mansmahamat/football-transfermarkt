import React, { useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Avatar, H3, Text, View } from "tamagui";

import { Transfer } from "../interface/type";

interface TransferProps {
  transfert: Transfer[];
}

function TransferList({ transfert }: TransferProps) {
  const data = [
    {
      id: 1,
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
      name: "Frank Odalthh",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
    },
    {
      id: 2,
      image: "https://bootdey.com/img/Content/avatar/avatar6.png",
      name: "John DoeLink",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
    },
    {
      id: 3,
      image: "https://bootdey.com/img/Content/avatar/avatar7.png",
      name: "March SoulLaComa",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
    },
    {
      id: 4,
      image: "https://bootdey.com/img/Content/avatar/avatar2.png",
      name: "Finn DoRemiFaso",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
    },
    {
      id: 5,
      image: "https://bootdey.com/img/Content/avatar/avatar3.png",
      name: "Maria More More",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
    },
    {
      id: 6,
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
      name: "Clark June Boom!",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
    },
    {
      id: 7,
      image: "https://bootdey.com/img/Content/avatar/avatar5.png",
      name: "The googler",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
    }
  ];

  const [comments, setComments] = useState(transfert);
  const router = useRouter();

  return (
    <>
      <H3 textAlign="center">Transfer</H3>

      <FlatList
        style={styles.root}
        data={comments}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() =>
                  router.push(`/teams/${Notification.clubProfile.id}`)
                }
              >
                <Avatar size="$2">
                  <Avatar.Image
                    accessibilityLabel="Cam"
                    src={Notification.clubProfile.image}
                  />
                  <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>
                    {Notification.clubProfile.name}
                  </Text>
                  <Text style={styles.time}>
                    From : {Notification.from.clubName}
                  </Text>
                </View>
                <Text marginBottom="$3">{Notification.fee}</Text>
              </View>
            </View>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  content: {
    marginLeft: 16,
    marginTop: 5,
    marginBottom: 5,
    flex: 1
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
    marginBottom: 5
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default TransferList;
