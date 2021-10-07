import React from "react";
import { StyleSheet, Text } from "react-native";
import * as Localization from "expo-localization";
import theme from "../properties/colors";
import Card from "./Card";

interface Props {
    mission: string,
    status: string,
    rocket: string,
    provider: string,
    windowStart: string,
    probability: number,
    location: string
}

export default function Launch(props: Props) {
	const startTimestamp = `${new Date(props.windowStart)
		.toLocaleDateString("de-DE", {
			timeZone: Localization.timezone,
			timeZoneName: "short"
		})} ${new Date(props.windowStart)
		.toLocaleTimeString("de-DE", {
			timeZone: Localization.timezone,
			timeZoneName: "short"
		})}`;
	return (
		<Card>
			<Text style={styles.mission}>
				{ props.mission }
			</Text>
			<Text style={styles.status}>
                Status: { props.status }
			</Text>
			<Text style={styles.rocket}>
                Type: { props.rocket }
			</Text>
			<Text style={styles.provider}>
                Provider: { props.provider }
			</Text>
			<Text style={styles.windowStart}>
                Start: { startTimestamp }
			</Text>
			{
				props.probability ?
					<Text style={styles.probability}>
                    Probability: { props.probability > 0 ? `${props.probability}%` : props.probability }
					</Text> : null
			}
			<Text style={styles.location}>
                Location: { props.location }
			</Text>
		</Card>
	);
}

const styles = StyleSheet.create({
	mission: {
		color: theme.font.light,
		fontSize: 28
	},
	status: {
		color: theme.font.darker,
		fontSize: 15
	},
	rocket: {
		color: theme.font.darker,
		fontSize: 18
	},
	provider: {
		color: theme.font.darker,
		fontSize: 18
	},
	windowStart: {
		color: theme.font.darker,
		fontSize: 18
	},
	probability: {
		color: theme.font.dark
	},
	location: {
		color: theme.font.dark
	},
});