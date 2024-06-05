import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useCallback } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Text,
  Switch,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function TabTwoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isFaceID, setIsFaceID] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);

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
            source={require("@/assets/images/gears.png")}
            style={styles.pLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Settings</ThemedText>
        </ThemedView>
        

        <View style={styles.switchContainer}>
          <View style={styles.switchRow}>
            <ThemedText>Dark Mode</ThemedText>
            <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
          </View>
          <View style={styles.switchRow}>
            <ThemedText>Remember Me</ThemedText>
            <Switch value={isRememberMe} onValueChange={setIsRememberMe} />
          </View>
          <View style={styles.switchRow}>
            <ThemedText>Face ID</ThemedText>
            <Switch value={isFaceID} onValueChange={setIsFaceID} />
          </View>
          <View style={styles.switchRow}>
            <ThemedText>Notifications</ThemedText>
            <Switch
              value={isNotifications}
              onValueChange={setIsNotifications}
            />
          </View>
        </View>
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
  pLogo: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  switchContainer: {
    margin: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
});
