import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar as TopBar, ScrollView, View } from "react-native";
import theme from "./app/properties/colors";
import MainScreen from "./app/screens/MainScreen";

export default function App() {
	const [data, setData] = useState<any[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchApi();
	}, []);

	function fetchApi() {
		const storageKey = "spacelaunch_data";
		AsyncStorage.getItem(storageKey).then((stored: string | null) => {
			const storedOld: any = stored == null ? null : JSON.parse(stored);
			const today = new Date().toDateString();
			if (storedOld == null || storedOld.data == null || storedOld.date != today) {
				axios.get("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?mode=normal")
					.then((response: any) => {
						setData(response.data.results);
						AsyncStorage.setItem(storageKey, JSON.stringify({date: today, data: response.data.results}))
							.catch(() => {
								setError("An error occurred storing data.");
							});
					}).catch((reason: any) => {
						if(reason.response.status == 429) {
							setError(`Reloaded too often. Please try again in ${parseTime(reason.response.request.responseHeaders["retry-after"])}.`);
						} else {
							setError("An error occurred requesting the API.");
						}
						if (storedOld != null && storedOld.data != null) {
							setData(storedOld.data);
						}
					});
			} else {
				setData(storedOld.data);
			}
		});
	}

	return (
		<View style={styles.body}>
			<ScrollView style={styles.container}>
				<StatusBar style="light" />
				<MainScreen data={data} error={error} />
			</ScrollView>
		</View>
	);
}

export function parseTime(seconds: number) {
	let integer = seconds;
	const FACTOR = 60;
	const POTENTIALS = ["seconds", "minutes", "hours"];
	for (let p = 0; p < POTENTIALS.length; p++) {
		if(integer < FACTOR) {
			return `${Math.round(integer)} ${POTENTIALS[p]}`;
		} else {
			integer /= FACTOR;
		}
	}
	return null;
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: theme.background.darker
	},
	container: {
		marginTop: TopBar.currentHeight,
		flex: 1,
		backgroundColor: theme.background.light,
		color: theme.font.light
	}
});
