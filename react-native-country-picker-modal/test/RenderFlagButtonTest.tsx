import {TestCase, TestSuite, Tester} from '@rnoh/testerino';
import React, {useState} from 'react';
import {Button, PixelRatio, StyleSheet, Text, View} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';

export const RenderFlagButtonTest = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState<Country>();
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <>
      <Tester>
        <TestSuite name="renderFlagButton">
          <TestCase itShould="自定义按钮">
            <View style={styles.box}>
              <CountryPicker
                countryCode={countryCode}
                onSelect={onSelect}
                containerButtonStyle={styles.containerButtonStyle}
                withFilter
                renderFlagButton={(props: any) => (
                  <Button
                    title="自定义按钮"
                    {...props}
                    onPress={() => {
                      props.onOpen?.();
                    }}
                  />
                )}
              />

              {country !== null && (
                <Text style={styles.data}>
                  {JSON.stringify(country, null, 0)}
                </Text>
              )}
            </View>
          </TestCase>
        </TestSuite>
      </Tester>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    minWidth: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButtonStyle: {
    width: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  instructions: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 0,
  },
  data: {
    minWidth: 300,
    padding: 10,
    marginTop: 7,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777',
  },
});
