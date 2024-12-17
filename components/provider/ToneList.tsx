import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { Tone } from "./MusicList";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Music, CheckCircle } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ToneDetails } from "./ToneDetails";

interface ToneListProps {
	tones: Tone[];
	// onToneClick: (tone: Tone) => void;
}

export function ToneList({ tones }: ToneListProps) {
	const [sortColumn, setSortColumn] = useState<keyof Tone>("title");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	// const [songs, setSongs] = useState<Song[]>(sampleSongs);
	const [selectedSong, setSelectedSong] = useState<Tone | null>(null);

	const handleView = (song: Tone) => {
		setSelectedSong(song);
	};

	const sortedTones = [...tones].sort((a: any, b: any) => {
		if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
		if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
		return 0;
	});

	const toggleSort = (column: keyof Tone) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "approved":
				return "bg-green-500";
			case "pending":
				return "bg-yellow-500";
			case "rejected":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">#</TableHead>
						<TableHead
							onClick={() => toggleSort("title")}
							className="cursor-pointer">
							Campaign Name{" "}
							{sortColumn === "title" && (sortDirection === "asc" ? "▲" : "▼")}
						</TableHead>
						<TableHead
							onClick={() => toggleSort("genre")}
							className="cursor-pointer">
							Duration{" "}
							{sortColumn === "genre" && (sortDirection === "asc" ? "▲" : "▼")}
						</TableHead>
						<TableHead
							onClick={() => toggleSort("plays")}
							className="cursor-pointer">
							Plays{" "}
							{sortColumn === "plays" && (sortDirection === "asc" ? "▲" : "▼")}
						</TableHead>
						<TableHead
							onClick={() => toggleSort("status")}
							className="cursor-pointer">
							Status{" "}
							{sortColumn === "status" && (sortDirection === "asc" ? "▲" : "▼")}
						</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedTones.map((tone, index) => (
						<TableRow key={tone.id} className="hover:bg-gray-100">
							<TableCell>{index + 1}</TableCell>
							<TableCell className="font-medium">{tone.title}</TableCell>
							<TableCell>{tone.genre}</TableCell>
							<TableCell>{tone.plays.toLocaleString()}</TableCell>
							<TableCell>
								<Badge className={`${getStatusColor(tone.status)} text-white`}>
									{tone.status}
								</Badge>
								{tone.isVerified && (
									<Badge className="ml-2 bg-blue-500 text-white">
										<CheckCircle className="h-3 w-3 mr-1" />
										active
									</Badge>
								)}
							</TableCell>
							<TableCell>
								<div className="flex space-x-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleView(tone)}>
										<Eye className="w-4 h-4 mr-2" />
										View
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Dialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
				<DialogContent className="max-w-3xl">
					<DialogHeader>
						<DialogTitle>Tone Details</DialogTitle>
					</DialogHeader>
					{selectedSong && <ToneDetails song={selectedSong} />}
				</DialogContent>
			</Dialog>
		</>
	);
}
