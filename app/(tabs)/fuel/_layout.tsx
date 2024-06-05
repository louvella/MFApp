import React, { createContext, useEffect, useState, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import {
  GasStation,
  GasStationContext,
  LocationContext,
} from "@/components/state";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [gasStations, setGasStations] = useState([] as GasStation[]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkLoginStatus = async () => {
    const loginStatus = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus !== null);
  };

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [])
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (location) {
        fetchGasStations(location.coords.latitude, location.coords.longitude);
      }
    })();
  }, []);

  const fetchGasStations = async (latitude: number, longitude: number) => {
    const overpassQuery = `[out:json][timeout:25];node["amenity"="fuel"](around:16093,${latitude},${longitude});out body;`;
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

    try {
      const response = await fetch(overpassUrl);
      const data = await response.json();
      setGasStations(data.elements);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={isLoggedIn ? handleLogout : () => router.push("/user")}
        >
          <Text style={styles.loginButtonText}>
            {isLoggedIn ? "Logout" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#FFFFFF", dark: "#1D3D47" }}
        headerImage={
          <View style={styles.mapContainer}>
            {location && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.25,
                  longitudeDelta: 0.25,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="You are here"
                  pinColor="blue"
                />
                {gasStations.map((station, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: station.lat,
                      longitude: station.lon,
                    }}
                    title={station.tags.name || "Gas Station"}
                    pinColor="orange"
                  />
                ))}
              </MapView>
            )}
          </View>
        }
      >
        <LocationContext.Provider value={location}>
          <GasStationContext.Provider value={gasStations}>
            <Slot />
          </GasStationContext.Provider>
        </LocationContext.Provider>
      </ParallaxScrollView>
    </ThemedView>
  );
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
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  selectButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  selectButtonText: {
    color: "white",
    fontSize: 16,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stationAddress: {
    fontSize: 14,
  },
  mapContainer: {
    height: 250,
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
