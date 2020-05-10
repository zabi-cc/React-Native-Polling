import * as React from "react";
import { View, StyleSheet, Text, ActivityIndicator, Image } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/action";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ArrowRight from "../assets/arrow-right.png";

export const HomeScreen = (props: any) => {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const posts: any = useSelector((state: any) => state.app.posts);

  useEffect(() => {
    getNewPosts(page);
  }, [dispatch, page]);

  useEffect(() => {
    const inteval = setInterval(async () => {
      setpage(page + 1);
    }, 10000);
    return () => {
      clearInterval(inteval);
    };
  }, [page]);

  const getNewPosts = (pageNum: number) => {
    setloading(true);
    dispatch(getPosts(pageNum));
    setloading(false);
  };

  const navigateToDetails = (selectedPost: any) => {
    props.navigation.navigate("Details", {
      selectedPost: selectedPost,
    });
  };
  return (
    <View testID="home-wrapper" style={styles.screen}>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.key}
        contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 10 }}
        renderItem={(itemData) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigateToDetails(itemData.item);
            }}
          >
            <Text style={styles.text}>
              Title:{"  "}
              <Text style={styles.detailsText}>{itemData.item.title}</Text>
            </Text>
            <Text style={styles.text}>
              URL: {"  "}
              <Text style={styles.detailsText}>{itemData.item.url}</Text>
            </Text>
            <Text style={styles.text}>
              Created At:{"  "}
              <Text style={styles.detailsText}>
                {new Date(itemData.item.created_at).toDateString()}
              </Text>
            </Text>
            <Text style={styles.text}>
              Author: {"  "}
              <Text style={styles.detailsText}>{itemData.item.author}</Text>
            </Text>

            <View style={styles.cardActionsContainer}>
              <Image source={ArrowRight} style={styles.arrowStyles} />
            </View>
          </TouchableOpacity>
        )}
        onEndReached={() => {
          setpage(page + 1);
        }}
        onEndReachedThreshold={0.5}
        numColumns={1}
      />
      {loading && <ActivityIndicator size="large" color="blue" />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: "#34495e80",
  },
  card: {
    flex: 1,
    width: "100%",
    backgroundColor: "#34495e",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 4,
  },
  text: {
    color: "#FFFFFF80",
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  detailsText: {
    color: "white",
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: "normal",
  },
  cardActionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  arrowStyles: {
    height: 22,
    width: 22,
  },
});
