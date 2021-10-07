import React from "react";
import { StyleSheet, View } from "react-native";
import theme from "../properties/colors";

interface Props {
    children?: any;
    style?: any
}

export default function Card(props: Props) {
	return (
		<View style={{...styles.wrapper, ...props.style}}>
			{
				props.children
			}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		backgroundColor: theme.background.darker,
		alignItems: "flex-start",
		justifyContent: "center",
		marginVertical: 10,
		borderRadius: 10,
		elevation: 8,
		padding: 10
	}
});