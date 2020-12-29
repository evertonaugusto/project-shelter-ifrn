import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import mapMarker from "../images/map-marker.png";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";

interface Shelter {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function SheltersMap() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get("shelters").then((response) => {
      setShelters(response.data);
    });
  });

  function handleNavigateToShelterDetails(id: number) {
    navigation.navigate("ShelterDetails", { id });
  }

  function handleNavigateToCreateShelter() {
    navigation.navigate("SelectMapPosition");
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -6.479888,
          longitude: -35.4335834,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {shelters.map((shelter) => {
          return (
            <Marker
              key={shelter.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 1.8,
                y: 0.6,
              }}
              coordinate={{
                latitude: shelter.latitude,
                longitude: shelter.longitude,
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToShelterDetails(shelter.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{shelter.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {shelters.length} abrigos encontrados
        </Text>
        <RectButton
          style={styles.createShelterButton}
          onPress={handleNavigateToCreateShelter}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },

  calloutText: {
    color: "#0089a5",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 18,
  },

  footerText: {
    fontFamily: "Nunito_700Bold",
    color: "#8fa7b3",
  },

  createShelterButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});
