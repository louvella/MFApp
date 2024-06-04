import { StyleSheet, Text, View } from "react-native";

const Step: React.FC<{ title: string; color?: string }> = ({
  title,
  color = "gray",
}) => {
  return (
    <View style={styles.stepContainer}>
      <View style={[styles.step, { backgroundColor: color }]} />
      <Text>{title}</Text>
    </View>
  );
};

const Bar: React.FC<{ inProgress?: boolean }> = ({ inProgress }) => {
  return <View style={[styles.bar, inProgress && styles.activeBar]} />;
};

const DeliveryStatusBar = () => {
  return (
    <View style={styles.container}>
      <Bar />
      <Bar inProgress />
      <Step title="On our way" color={"orange"} />
      <Step title="Arrived" color="orange" />
      <Step title="Fueling" color="orange" />
      <Step title="Completed" />
    </View>
  );
};

export default DeliveryStatusBar;

const styles = StyleSheet.create({
  bar: {
    height: 4,
    backgroundColor: "gray",
    position: "absolute",
    top: 8,
    left: 35,
    right: 35,
  },
  activeBar: {
    backgroundColor: "orange",
    right: 120,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  stepContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  step: {
    height: 20,
    width: 20,
    borderRadius: 40,
    backgroundColor: "gray",
  },
});
