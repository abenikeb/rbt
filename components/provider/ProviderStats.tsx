"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
	{ name: "Ambassel Tone", plays: 4000 },
	{ name: "Afro Tone", plays: 3000 },
	{ name: "Aqabe Sound", plays: 2000 },
	{ name: "Anchihoye", plays: 2780 },
	{ name: "Ethio-Jazz", plays: 1890 },
];

export function ProviderStats() {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Plays</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">13,670</div>
					<p className="text-xs text-muted-foreground">+20% from last month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Uploaded Songs</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">25</div>
					<p className="text-xs text-muted-foreground">+4 new this month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Unique Listeners
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">5,432</div>
					<p className="text-xs text-muted-foreground">+12% from last month</p>
				</CardContent>
			</Card>
			{/* <Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Revenue</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">$1,234</div>
					<p className="text-xs text-muted-foreground">+15% from last month</p>
				</CardContent>
			</Card> */}
			<Card className="col-span-4">
				<CardHeader>
					<CardTitle>Plays by Genre</CardTitle>
				</CardHeader>
				<CardContent className="pl-2">
					<ResponsiveContainer width="100%" height={350}>
						<BarChart data={data}>
							<XAxis
								dataKey="name"
								stroke="#1e3a8a"
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								stroke="#1e3a8a"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => `${value}`}
							/>
							<Bar dataKey="plays" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	);
}
