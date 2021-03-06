import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { getDataFromDB } from "../../../hooks/getDataFromDB";
import DrawerPage from "./DrawerPage";

export default function NotFound({ navigation }) {
  const {
    response: data,
    error,
    isLoading,
    getData,
  } = getDataFromDB("SELECT * FROM qr WHERE kolvo > 0");

  return (
    <DrawerPage
      onRefresh={getData}
      refreshing={isLoading}
      header="Не найдено"
      title="Еще не выявленные позиции"
      navigation={navigation}
    >
      <ScrollView
        horizontal={true}
        persistentScrollbar={true}
        showsHorizontalScrollIndicator={true}
      >
        {isLoading ? (
          <ActivityIndicator color="#0000ff" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Text style={styles.itemCell}>{item.vedpos}</Text>
                <Text style={[styles.itemCell, styles.itemCenterCell]}>
                  {item.name}
                </Text>
                <Text style={styles.itemCell}>{item.kolvo}</Text>
              </View>
            )}
          />
        )}
      </ScrollView>
    </DrawerPage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  itemCell: {
    width: "40%",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flex: 1,
    paddingRight: 10,
    textAlign: "center",
  },
  itemCenterCell: {
    width: 350,
  },
  item: {
    paddingTop: 5,
    paddingBottom: 15,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    fontSize: 18,
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
