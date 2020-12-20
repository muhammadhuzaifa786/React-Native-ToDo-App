import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
const image = { uri: "https://reactjs.org/logo-og.png" };

export default function Home() {
  return (
    <View>
        <Text>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
