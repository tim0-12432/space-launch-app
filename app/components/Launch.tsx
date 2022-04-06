import React from "react";
import { StyleSheet, Text, Share, View } from "react-native";
import * as Localization from "expo-localization";
import Icon from "react-native-vector-icons/Ionicons";
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
			<View style={styles.header}>
				<Text style={styles.mission}>
					{ props.mission }
				</Text>
				<Icon.Button
					onPress={() => shareLaunch(props)}
					backgroundColor={theme.background.light}
					color={theme.font.darker}
					borderRadius={10}
					name="share-social"
				/>
			</View>
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

async function shareLaunch(props: Props) {
	const content = {
		message: `${props.provider} will launch a "${props.rocket}" for mission "${props.mission}". The launch window starts at ${new Date(props.windowStart).toLocaleString("de-DE")}. Stay tuned!`
	};

	const options = {
		tintColor: theme.background.dark,
		dialogTitle: "Upcoming rocket launch!"
	};

	try {
		await Share.share(content, options);
	} catch (error: any) {
		console.error(error?.message);
	}
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between"
	},
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
	}
});