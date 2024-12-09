import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { AntDesign, Octicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LocationDropdown({
  manualInput,
  setManualInput,
  customCity,
  setCustomCity,
}) {
  const [currentCity, setCurrentCity] = useState("Select Location");
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
  ]);

  const fetchLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        // If permission denied, switch to manual input
        setManualInput(true);
        setCurrentCity("Location Access Denied");
        setLoading(false);
        return;
      }

      // Get current location
      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      // Reverse geocode to get the city
      const [location] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // Prioritize city, then district, then fallback to country
      const detectedCity =
        location.city ||
        location.district ||
        location.subregion ||
        location.country ||
        "Unknown Location";

      setCurrentCity(detectedCity);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching location:", error);

      // If any error occurs during location fetching
      Alert.alert(
        "Location Error",
        "Unable to automatically detect location. Please enter manually."
      );

      setManualInput(true);
      setCurrentCity("Select Location");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const toggleManualInput = () => {
    setManualInput(!manualInput);
    setCustomCity("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationRow}>
        <AntDesign name="enviroment" size={24} color="black" />
        {loading ? (
          <ActivityIndicator
            size="small"
            color="black"
            style={styles.loadingIndicator}
          />
        ) : (
          <SelectDropdown
            data={cities}
            defaultButtonText={currentCity}
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={styles.dropdownButtonText}
            onSelect={(selectedItem) => setCurrentCity(selectedItem)}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
            renderDropdownIcon={() => (
              <Octicons name="chevron-down" size={hp(2.5)} color="gray" />
            )}
          />
        )}
        <TouchableOpacity onPress={toggleManualInput} style={styles.editButton}>
          <AntDesign
            name={manualInput ? "close" : "edit"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingIndicator: {
    marginHorizontal: 5,
  },
  dropdownButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 5,
    borderRadius: 5,
    height: hp(4.5),
  },
  dropdownButtonText: {
    fontSize: hp(2),
    color: "black",
    textAlign: "left",
  },
  editButton: {
    marginLeft: 10,
  },
  manualInputContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: hp(2),
    color: "black",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: hp(2),
    color: "black",
  },
  submitButton: {
    marginTop: 10,
    // backgroundColor: "#3498db",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: hp(2),
    fontWeight: "bold",
  },
});
