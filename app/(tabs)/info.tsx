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
            source={require("@/assets/images/floatFuel.png")}
            style={styles.pLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">MobileFuel</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">About Us</ThemedText>
          <ThemedText>
            Mobile fueling, also known as on-demand fuel delivery or wet-hosing,
            is a service that brings fuel directly to vehicles or equipment from
            a mobile vehicle, such as a tank truck. It can be used to fuel
            fleets, stationary tanks, boats, or other machinery. Mobile fueling
            can be conducted by an outside contractor or onsite staff.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Contact Information</ThemedText>
          <ThemedText>MobileFuel</ThemedText>
          <ThemedText>888 Main Street</ThemedText>
          <ThemedText>City, State 99999-9999</ThemedText>
          <ThemedText>(800) 555-5555</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Owner / Operators</ThemedText>
          <ThemedText>
            Mobile fueling, also known as on-demand fuel delivery or wet-hosing,
            is a service that brings fuel directly to vehicles or equipment from
            a mobile vehicle, such as a tank truck. It can be used to fuel
            fleets, stationary tanks, boats, or other machinery. Mobile fueling
            can be conducted by an outside contractor or onsite staff.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">System Availability:</ThemedText>
          <ThemedText>
            Please be advised that there will be a 30 minute systemwide outage
            on Sunday 8/11/2024 at 1:00 am. Unfortunately Lorem ipsum dolor sit
            amet, per graeco eruditi comprehensam id, minim utamur interpretaris
            duo ei, cum te meis civibus. Te mei fabellas deseruisse, vix cu
            illud minimum. Ex mazim doming evertitur pro, ne convenire
            eloquentiam nam, ullum omnium iisque ea est. Ei sea novum dicit
            animal, et usu option alterum consequat. Sit an summo praesent. Et
            dicta melius molestie sea, est ut corrumpit laboramus forensibus, ad
            atqui similique eos.
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

  pLogo: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});
