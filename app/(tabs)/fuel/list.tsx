
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useGasStationContext } from "@/components/state";
import { router, useNavigation } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";


const List = () => {
  const gasStations = useGasStationContext() ?? []

  const navigateToOperator = (id: number) => {
    router.push(`/fuel/${id}`)
  }
  const getRandomPrice = () => (Math.random() * (3.75 - 3.59) + 3.59).toFixed(2);
  const getRandomNumber = () => (Math.random() * (2.6 - 1.1) + 1.1).toFixed(1);

    return (
        <>
    <ThemedView style={styles.titleContainer}>
    <ThemedText type="title">MobileFuel Operators</ThemedText>
  </ThemedView>
  <ScrollView>
    {gasStations.map((station, index) => (
      <View key={index} style={styles.stationContainer}>
        <TouchableOpacity style={styles.selectButton} onPress={() => navigateToOperator(station.id)}>
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
        <View style={styles.stationInfo}>
          <Text style={styles.stationName}>{station.tags.name || "Gas Station"}  - {getRandomNumber()} miles</Text>
          <Text style={styles.stationAddress}>{station.tags['addr:street'] || station.tags.vicinity || "No address available"}</Text>
          <Text style={styles.stationAddress}>Unleaded: ${getRandomPrice()}</Text>
        </View>
      </View>
    ))}
  </ScrollView>
  <ThemedText>Select from operators above</ThemedText>
  </>
)
}

const styles = StyleSheet.create({
    header: {
      width: "100%",
      height: 60,
      //backgroundColor: "white",
      justifyContent: "center",
      alignItems: "flex-end",
      paddingRight: 16,
      paddingTop: 10,
    },
    loginButton: {
      backgroundColor: "orange",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    loginButtonText: {
      color: "white",
      fontSize: 16,
    },
    titleContainer: {
      alignItems: "center",
      gap: 8,
    },
    stationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      marginHorizontal: 16,
    },
    selectButton: {
      backgroundColor: 'orange',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginRight: 10,
    },
    selectButtonText: {
      color: 'white',
      fontSize: 16,
    },
    stationInfo: {
      flex: 1,
    },
    stationName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    stationAddress: {
      fontSize: 14,
    },
  });
  export default List