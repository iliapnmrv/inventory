import React from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import BackHome from "./BackHome";
import Title from "../../../components/Title/Title";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { getDataFromDB } from "../../../hooks/getDataFromDB";

export default function NotFound({ navigation }) {
  // SELECT * FROM qr WHERE kolvo > 0
  const {
    response: data,
    error,
    isLoading,
    getData,
  } = getDataFromDB("SELECT * FROM qr WHERE kolvo > 0");

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={getData} />
      }
    >
      <PageHeader text="Не выявлено" />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "white",
          padding: 10,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          paddingBottom: 20,
        }}
      >
        <BackHome navigation={navigation} />
        <Title title="Еще не выявленные позиции" style={styles.sectionHeader} />
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
                  <Text style={styles.itemCell}>{item.vedPos}</Text>
                  <Text style={[styles.itemCell, styles.itemCenterCell]}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemCell}>{item.kolvo}</Text>
                </View>
              )}
            />
          )}
        </ScrollView>
      </View>
    </ScrollView>
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
