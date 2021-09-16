import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from "../properties/colors";

interface Props {
    title: String,
    children?: any
}

export default function Container(props: Props) {
  return (
        <View style={styles.container}>
            <Text style={styles.title}>
                { props.title }
            </Text>
            {
                props.children
            }
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontWeight: "800",
    fontSize: 36,
    marginBottom: 10,
    color: theme.font.light,
    width: "100%",
    textAlign: "center"
  }
});