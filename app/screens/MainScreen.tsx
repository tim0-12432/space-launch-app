import React from "react";
import { Text, StyleSheet } from "react-native";
import Card from "../components/Card";
import Container from "../components/Container";
import Countdown from "../components/Countdown";
import Launch from "../components/Launch";
import Loading from "../components/Loading";
import theme from "../properties/colors";

interface Props {
    data: any,
    error: any
}

export default function MainScreen(props: Props) {
	const { data, error } = props;
	return (
		<Container title="Upcoming launches">
			{
				error !== null ? <Card><Text style={styles.error}>{ error }</Text></Card> : null
			}
			{
				data !== null ?
					<Countdown until={calculateTimeDifference(data[0].window_start)} /> : null
			}
			{
				data !== null ? data.map((launch: any, index: number) => {
					return launch !== null ?
						<Launch
							key={`launch-card-${index}`}
							mission={launch.mission ? launch.mission.name : "NaN"}
							status={launch.status.abbrev}
							rocket={launch.rocket.configuration.full_name}
							provider={launch.launch_service_provider.name}
							windowStart={launch.window_start}
							probability={launch.probability}
							location={launch.pad.location.name}
						/> : null;}
				) : <Loading />
			}
		</Container>
	);
}

function calculateTimeDifference(timeString: string) {
	const now = new Date();
	const timeDate = new Date(timeString);

	return timeDate !== undefined ? Math.floor((timeDate.getTime() - now.getTime()) / 1000) : 0;
}

const styles = StyleSheet.create({
	error: {
		color: theme.error
	}
});