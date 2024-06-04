import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
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

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isFaceID, setIsFaceID] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
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
        <ThemedText>
          This app includes example code to help you get started.
        </ThemedText>
        <ThemedText>
          The layout file in{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{" "}
          sets up the tab navigator.
        </ThemedText>

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
