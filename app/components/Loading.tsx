import React from "react";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

export default function Loading() {
	const rotate = {
		from: {
			transform: [
				{ rotate: "0deg" }
			]
		},
		to: {
			transform: [
				{ rotate: "360deg" }
			]
		}
	};

	return (
		<Animatable.Image
			animation={rotate}
			easing="linear"
			duration={2000}
			iterationCount="infinite"
			style={styles.loader}
			source={require("../assets/loading.png")}
		/>
	);
}

const styles = StyleSheet.create({
	loader: {
		height: 80,
		width: 80
	}
});