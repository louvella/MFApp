// user.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Button,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFocusEffect } from "@react-navigation/native";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [credit, setCredit] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [])
  );
  const checkLoginStatus = async () => {
    const loginStatus = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus !== null);
    if (loginStatus !== null) {
      setName(await AsyncStorage.getItem("name"));
      setAddress(await AsyncStorage.getItem("address"));
    }
  };

  const handleLogin = async () => {
    await AsyncStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setModalVisible(false);
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
          onPress={() => (isLoggedIn ? handleLogout() : setModalVisible(true))}
        >
          <Text style={styles.loginButtonText}>
            {isLoggedIn ? "Logout" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#FFFFFF", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/lock.jpg")}
            style={styles.pLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">User and Vehicle</ThemedText>
          <ThemedText type="title">Information</ThemedText>
        </ThemedView>
        {isLoggedIn ? (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                AsyncStorage.setItem("name", text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                AsyncStorage.setItem("address", text);
              }}
            />
              <TextInput
              style={styles.input}
              placeholder="Credit Card"
              value={credit}
              onChangeText={(text) => {
                setCredit(text);
                AsyncStorage.setItem("address", text);
              }}
            />
                        <TextInput
              style={styles.input}
              placeholder="Vehicle"
              value={vehicle}
              onChangeText={(text) => {
                setVehicle(text);
                AsyncStorage.setItem("address", text);
              }}
            />
          </View>
        ) : (
          <ThemedText>
            Please log in to enter or modify your information.
          </ThemedText>
        )}
      </ParallaxScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 250,
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  pLogo: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});
