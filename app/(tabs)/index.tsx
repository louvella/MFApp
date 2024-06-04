import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

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
