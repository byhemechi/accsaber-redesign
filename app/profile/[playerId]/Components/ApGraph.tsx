"use client";
import { type Category } from "~/lib/interfaces/api/category";
import { type PlayerScore } from "~/lib/interfaces/api/player-score";
import { Line } from "react-chartjs-2";
import {
	LineElement,
	Chart,
	LinearScale,
	PointElement,
	Legend,
} from "chart.js";
import { useRef } from "react";
import { ApDataPointFragment } from "~/lib/__generated__/gql";

export interface CategoryScoreData extends Category {
	scores: PlayerScore[];
}

const ApGraph = ({
	data,
	categories,
}: {
	data: ApDataPointFragment[];
	categories: {
		categoryName: string;
		categoryDisplayName: string;
	}[];
}) => {
	Chart.register(LineElement, LinearScale, PointElement, Legend);
	const colours = ["#34d399", "#2563eb", "#d946ef"];
	const ref = useRef();

	return (
		<Line
			ref={ref}
			data={{
				labels: categories.map((i) => i.categoryDisplayName),
				datasets: categories.map((i, n) => {
					return {
						label: i.categoryDisplayName,
						data: data
							.filter((c) => c.categoryName === i.categoryName)
							.map(({ ap }, n) => [n + 1, ap]),
						borderColor: colours[n],
					};
				}),
			}}
			options={{
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: true,
					},
					tooltip: {
						intersect: false,
						mode: "index",
					},
				},
				hover: {
					intersect: false,
					mode: "index",
				},
				scales: {
					x: {
						type: "linear",
						title: {
							display: true,
							text: "Nth Score",
						},
					},
					y: {
						type: "linear",
						title: {
							display: true,
							text: "Raw AP",
						},
					},
				},
			}}
		/>
	);
};

export default ApGraph;
