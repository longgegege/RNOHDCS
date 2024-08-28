import React from "react";
import { View, useColorScheme, ScrollView, Button, Text } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  setThemePreference,
  SystemBars,
  ThemePreference,
  useThemePreference,
  AppBackground,
  getThemePreference,
} from "@vonovak/react-native-theme-control";
import { Tester, TestCase } from "@rnoh/testerino";

const themeControlDemo = () => {
  const themePreference = useThemePreference();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const bgColor = isDarkMode ? "#2A2550" : "#FFF6EA";
  const textColor = isDarkMode ? "white" : "black";
  const barsBackground = isDarkMode ? "#9900F0" : "#A0BCC2";
  const dividerColor = textColor;
  const appbgclor = isDarkMode ? "red" : "blue";

  const values: Array<ThemePreference> = ["light", "dark", "system"];

  return (
    <ScrollView>
      <Tester>
        <TestCase
          itShould="Get system mode."
          initialState={"light"}
          tags={["C_API"]}
          arrange={({ setState, state }) => {
            return (
              <View
                style={{
                  backgroundColor: bgColor,
                  flexGrow: 1,
                  flexShrink: 1,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  onPress={() => {
                    setState(getThemePreference());
                  }}
                  title={`getSystemMode${getThemePreference()}`}
                />
              </View>
            );
          }}
          assert={async ({ expect, state }) => {
            expect(values).to.include(state);
          }}
        />
        <TestCase
          itShould="System mode switching."
          initialState={themePreference}
          tags={["C_API"]}
          arrange={({ setState, state }) => {
            return (
              <View
                style={{
                  backgroundColor: bgColor,
                  flexGrow: 1,
                  flexShrink: 1,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Text>useColorScheme(): {colorScheme}</Text>
                <Text>useThemePreference(): {themePreference}</Text>
                <SegmentedControl
                  style={{ width: "100%" }}
                  values={values}
                  selectedIndex={values.indexOf(themePreference)}
                  onChange={({ nativeEvent }: { nativeEvent: any }) => {
                    setThemePreference(nativeEvent.value as ThemePreference, {
                      persistTheme: false,
                      restartActivity: false,
                    });
                    setState(themePreference);
                  }}
                />
              </View>
            );
          }}
          assert={async ({ expect, state }) => {
            expect(values).to.include(state);
          }}
        />
        <TestCase
          itShould="Background switching."
          initialState={appbgclor}
          tags={["C_API"]}
          arrange={({ setState, state }) => {
            return (
              <View
                style={{
                  backgroundColor: appbgclor,
                  flexGrow: 1,
                  flexShrink: 1,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <AppBackground dark={"red"} light={"blue"} />
                <Button
                  onPress={() => {
                    setState("light");
                  }}
                  title={`getBackgroundColor`}
                />
              </View>
            );
          }}
          assert={async ({ expect, state }) => {
            expect(values).to.include(state);
          }}
        />
        <TestCase
          itShould="set navbar color mode."
          initialState={"dark"}
          tags={["C_API"]}
          arrange={({ setState, state }) => {
            return (
              <View
                style={{
                  backgroundColor: bgColor,
                  flexGrow: 1,
                  flexShrink: 1,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <SystemBars
                  backgroundColor={barsBackground}
                  dividerColor={dividerColor}
                  barStyle={"default"}
                />
                <Button
                  onPress={() => {
                    setState("light");
                  }}
                  title={`getSystemBarsColor`}
                />
              </View>
            );
          }}
          assert={async ({ expect, state }) => {
            expect(values).to.include(state);
          }}
        />
      </Tester>
    </ScrollView>
  );
};

export default themeControlDemo;
