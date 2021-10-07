import React from "react";
import { StyleSheet, View } from "react-native";
import CountDown from "react-native-countdown-component";
import theme from "../properties/colors";

interface Props {
    until: number;
}

export default function Countdown(props: Props) {
	return (
		<View style={styles.wrapper}>
			<CountDown
				until={props.until}
				size={30}
				timeToShow={["D", "H", "M", "S"]}
				digitStyle={styles.digit}
				digitTxtStyle={styles.label}
				timeLabelStyle={styles.timeLabel}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
		padding: 10
	},
	digit: {
		backgroundColor: theme.background.darker,
		borderRadius: 10,
		marginHorizontal: 4.5,
		elevation: 8
	},
	label: {
		color: theme.font.darker,
		fontSize: 30
	},
	timeLabel: {
		color: theme.font.dark,
		fontSize: 15
	}
});