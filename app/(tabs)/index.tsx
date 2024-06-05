// index.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
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
          <Text style={styles.loginButtonText}>{isLoggedIn ? "Logout" : "Login"}</Text>
        </TouchableOpacity>
      </View>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#FFFFFF", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/floatFuel.png")}
            style={styles.fuelLogo}
          />
        }
      >
        <View>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome to</ThemedText>
            <ThemedText type="title">MobileFuel</ThemedText>
          </ThemedView>
        </View>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Weekend Special</ThemedText>
          <ThemedText>
            Nec quidam vituperatoribus ea, in pri tollit eloquentiam. Adhuc
            nonumes electram sit at.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Refer us and earn $$$$</ThemedText>
          <ThemedText>
            Feugiat invidunt senserit duo ut. Sale illud pro ad, vis justo
            aliquip iudicabit in.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">System Availability:</ThemedText>
          <ThemedText>
            Please be advised that there will be a 30 minute systemwide outage
            on Sunday 8/11/2024 at 1:00 am. Unfortunately Lorem ipsum dolor sit
            amet, per graeco eruditi comprehensam id, minim utamur interpretaris
            duo ei.
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  fuelLogo: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});