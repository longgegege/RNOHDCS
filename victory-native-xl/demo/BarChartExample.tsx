import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { CartesianChart, Bar } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
;
import inter from "../assets/inter-medium.ttf";

function randomNumber() {
  return Math.floor(Math.random() * 26) + 12;
}
const DATA = (numberPoints = 13) =>
  Array.from({ length: numberPoints }, (_, index) => ({
    day: index + 1,
    highTmp: randomNumber(),
  }));

export function BarChartExample() {
  const font = useFont(inter, 12);
  return (
    <>
      <SafeAreaView>
      <View style={{height: 300}}>
      <Text>Bar Chart</Text>
      <CartesianChart
        data={DATA()}
        xKey="day"
        yKeys={["highTmp"]}
        axisOptions={{ font }}
      >
        {({ points, chartBounds }) => (
          <Bar
          points={points.highTmp}
          chartBounds={chartBounds}
          color="green"
          animate={{ type: "timing", duration: 300 }}
          roundedCorners={{ topLeft: 10, topRight: 10 }}
        />
        )}
      </CartesianChart>
      </View>
      </SafeAreaView>
      </>
  );
}
