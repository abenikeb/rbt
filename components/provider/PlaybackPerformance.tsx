"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Music } from "./ProviderDashboard";

interface PlaybackPerformanceProps {
	Musics: Music[];
	onBackClick?: () => void;
	showBackButton?: boolean;
}

export function PlaybackPerformance({
	Musics,
	onBackClick,
	showBackButton,
}: PlaybackPerformanceProps) {
	return (
		<div className="space-y-4">
			{showBackButton && (
				<Button onClick={onBackClick} variant="outline" className="mb-4">
					Back to All Musics
				</Button>
			)}
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={Musics}>
					<XAxis dataKey="name" />
					<YAxis />
					<Bar dataKey="plays" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{Musics.map((Music) => (
					<div key={Music.id} className="bg-secondary p-4 rounded-lg">
						<h3 className="font-semibold">{Music.name}</h3>
						<p className="text-2xl font-bold">
							{Music.plays.toLocaleString()} plays
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
