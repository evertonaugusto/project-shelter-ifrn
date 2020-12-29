import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import ShelterMap from "./pages/SheltersMap";
import ShelterDetails from "./pages/ShelterDetails";
import SelectMapPosition from "./pages/CreateShelter/SelectMapPosition";
import ShelterData from "./pages/CreateShelter/ShelterData";
import Header from "./components/Header";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#f2f3f5" },
        }}
      >
        <Screen name="SheltersMap" component={ShelterMap} />
        <Screen
          name="ShelterDetails"
          component={ShelterDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Abrigo" />,
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />,
          }}
        />
        <Screen
          name="ShelterData"
          component={ShelterData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
