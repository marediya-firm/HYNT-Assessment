import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import RootStack from "./src/route/RootStack";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
