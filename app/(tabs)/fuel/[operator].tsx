import DeliveryStatusBar from "@/components/DeliveryStatusBar";
import { useGasStationContext } from "@/components/state";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet} from "react-native";

const Status = () => {
  const gasStations = useGasStationContext();
  const params = useGlobalSearchParams();
  const [gasStation, setGasStation] = useState(null);
  const [price, setPrice] = useState(null);
  const [gallons, setGal] = useState(null);

  useEffect(() => {
    const station = gasStations?.find(gasStation => gasStation.id === parseInt(params.operator as string, 10));
    setGasStation(station);
    // Generates a random price between $3.59 and $3.75
    const randomPrice = (Math.random() * (3.75 - 3.59) + 3.59).toFixed(2);
    setPrice(randomPrice);
    // Generates a random number between 15 and 34
    const randomGal = (Math.random() * (15 - 34) + 34).toFixed(2);
    setGal(randomGal);
  
  }, [gasStations, params.operator]);

  return (
    <View>
      <Button title="Back" onPress={() => router.back()} />
      <Text style={styles.title}>Fueling Status</Text>
      <DeliveryStatusBar />
      {gasStation ? (
        <View>
          <Text>

          </Text>
          <Text style={styles.info}>{gasStation.tags.name}</Text>
          <Text style={styles.info}>{gasStation.tags['addr:housenumber']} {gasStation.tags['addr:street']}</Text>
          <Text style={styles.info}>{gasStation.tags['addr:city']} {gasStation.tags['addr:state']} {gasStation.tags['addr:zip']}</Text>
          <Text style={styles.info}>{gallons} Gal. @  ${price}</Text>
        </View>
      ) : (
        <Text>No gas station data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 4,
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 4,
  },
});

export default Status;


