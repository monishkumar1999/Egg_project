import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import * as Location from "expo-location";

const AddCustomer = () => {
  // Customer form states
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dueAmount, setDueAmount] = useState("");
  const [address, setAddress] = useState("");

  // Location states
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false); // Control if live location tracking is enabled

  useEffect(() => {
    if (isLocationEnabled) {
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        // Get current location continuously every 5 seconds
        const locationInterval = setInterval(async () => {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        }, 5000);

        // Cleanup function to stop live location tracking
        return () => clearInterval(locationInterval);
      };

      getLocation();
    }
  }, [isLocationEnabled]);

  const handleSubmit = () => {
    // Handle the form submission logic here
    console.log("Customer Details Submitted", { name, mobile, dueAmount, address, location });
  };

  let locationText = "Waiting for location...";
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Customer</Text>

      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />
      <TextInput
        style={styles.input}
        placeholder="Old Due Amount"
        keyboardType="numeric"
        value={dueAmount}
        onChangeText={setDueAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <View style={styles.locationSection}>
        <Text>{locationText}</Text>
        <Button
          title={isLocationEnabled ? "Stop Live Location" : "Enable Live Location"}
          onPress={() => setIsLocationEnabled(!isLocationEnabled)}
        />
      </View>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  locationSection: {
    marginVertical: 20,
  },
});

export default AddCustomer;
