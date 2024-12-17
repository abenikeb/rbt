"use client";

import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Play, Pause, Edit, Trash2 } from "lucide-react";
import { ToneList } from "./ToneList";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export interface Tone {
	id: any;
	title: string;
	artist: string;
	uploadDate: string;
	textMessage: string;
	plays: number;
	status: "pending" | "approved" | "rejected";
	isVerified?: boolean;
	genre: string;
}

export function MusicList() {
	const [tones, setTones] = useState<Tone[]>([
		// Approved Tones
		{
			id: 1,
			title: "Champaign #1",
			plays: 15000,
			artist: "Teddy Beka",
			status: "approved",
			uploadDate: "2024-04-25",
			textMessage: "Please subscribe the tone",
			isVerified: true,
			genre: "15 Days Campaign",
		},
		{
			id: 2,
			title: "Champaign #2",
			plays: 8000,
			artist: "Teddy Beka",
			textMessage: "Please subscribe the tone",
			status: "approved",
			uploadDate: "2024-04-25",
			isVerified: false,
			genre: "30 Days Campaign",
		},
		{
			id: 3,
			title: "Champaign #3",
			plays: 12000,
			artist: "Tilahun Afro",
			textMessage: "Please subscribe the tone",
			status: "approved",
			uploadDate: "2024-04-25",
			isVerified: true,
			genre: "20 Days Campaign",
		},

		// Pending Tones
		{
			id: 4,
			title: "Champaign #4",
			plays: 0,
			textMessage: "Please subscribe the tone",
			artist: "Teddy Afro",
			status: "pending",
			uploadDate: "2024-04-25",
			isVerified: false,
			genre: "60 Days Campaign",
		},

		// Rejected Tones
		{
			id: 5,
			title: "Champaign #5",
			textMessage: "Please subscribe the tone",
			plays: 0,
			artist: "Beki Afro",
			status: "rejected",
			uploadDate: "2024-04-25",
			isVerified: false,
			genre: "60 Days Campaign",
		},
	]);

	const [playingId, setPlayingId] = useState<string | null>(null);
	const togglePlay = (id: string) => {
		setPlayingId(playingId === id ? null : id);
	};

	return (
		<Card className="mt-6 bg-white shadow-lg">
			<CardContent className="pt-6">
				<ToneList tones={tones} />
			</CardContent>
		</Card>
	);
}
