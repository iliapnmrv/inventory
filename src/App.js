import React, { useState, useEffect } from "react";
import { registerRootComponent } from "expo";

import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import "react-native-gesture-handler";
import BarCode from "./components/QRScanner/QRScanner.js";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, persistor } from "./store/index.js";
import Docs from "./routes/Docs/Docs.js";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage from "react-native-flash-message";
import SignInScreen from "./routes/Auth/SignInScreen.js";
import $api, { API_URL } from "./http/index.js";
import SignUpScreen from "./routes/Auth/SignUpScreen.js";
import DocsEdit from "./routes/Docs/DocsEdit/DocsEdit.js";
import Drawer from "./routes/Inventory/Drawer/Drawer.js";
import Settings from "./routes/Settings/Settings.js";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

function App() {
  const [hasPermission, setHasPermission] = useState("null");

  const { username, isSignedIn } = useSelector(({ auth }) => auth);

  // const dispatch = useDispatch();

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status);
    };
    getPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.containerText}>Получение разрешений...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Камера недоступна</Text>
        <Button title={"Разрешить"} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isSignedIn ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  headerShown: false,
                  // When logging out, a pop animation feels intuitive
                  // You can remove this if you want the default 'push' animation
                  // animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  headerShown: false,
                  // When logging out, a pop animation feels intuitive
                  // You can remove this if you want the default 'push' animation
                  // animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{ headerShown: false }}
              />
              <Stack.Group
                screenOptions={{
                  presentation: "modal",
                  headerShown: false,
                  tabBarVisible: false,
                }}
              >
                <Stack.Screen
                  name="scanner"
                  component={BarCode}
                  options={{
                    tabBarVisible: false,
                  }}
                />
                <Stack.Screen
                  name="docsEdit"
                  component={DocsEdit}
                  options={{
                    tabBarVisible: false,
                  }}
                />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <FlashMessage
        position="top"
        duration={3000}
        hideStatusBar={true}
        floating={true}
      />
    </View>
  );
}

function HomeTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          margin: 0,
        },
      }}
    >
      <Tab.Screen
        name="Inventory"
        component={Drawer}
        options={{
          headerShown: false,
          tabBarLabel: "Инвентаризация",
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialCommunityIcon
                name="format-list-numbered"
                style={[styles.icon, { width: 40, height: 25 }]}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Docs"
        component={Docs}
        options={{
          headerShown: false,
          tabBarLabel: "Документооборот",
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialCommunityIcon
                name="file-document-outline"
                style={[styles.icon, { width: 40, height: 25 }]}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default registerRootComponent(AppWrapper);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 5,
    justifyContent: "center",
    textAlign: "center",
  },
  containerText: {
    textAlign: "center",
    width: "100%",
  },
  icon: {
    marginLeft: 3,
    marginRight: -20,
  },
});
