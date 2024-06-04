import DeliveryStatusBar from "@/components/DeliveryStatusBar";
import { useGasStationContext } from "@/components/state";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";

const Status = () => {
  const gasStations = useGasStationContext()
  const params = useGlobalSearchParams()
  const [gasStation] = useState(gasStations?.find(gasStation => gasStation.id === parseInt(params.operator as string, 10)))
  
  return (
    <View>
      <Button title="Back" onPress={() => router.back()} />
      <Text>Operator Page</Text>
      <DeliveryStatusBar />
      <Text>{JSON.stringify(gasStation)}</Text>
    </View>
  );
};

export default Status;
