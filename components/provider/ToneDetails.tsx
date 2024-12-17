import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Music,
	Calendar,
	PlayCircle,
	User,
	DollarSign,
	AlertTriangle,
	Wallet,
	AlarmCheck,
	Info,
	CheckCheck,
} from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { Progress } from "@/components/ui/progress";

import { PauseCircle, Clock, MessageSquare } from "lucide-react";

type Song = {
	id: string;
	title: string;
	isVerified?: boolean;
	textMessage?: string;
	artist: string;
	genre: string;
	uploadDate: string;
	plays: number;
	status: "pending" | "approved" | "rejected";
};

type CustomerReaction = {
	id: number;
	date: string;
	phone: string;
	reaction: "Good" | "Bad";
};

interface ToneDetailsProps {
	song: Song;
}

export function ToneDetails({ song }: ToneDetailsProps) {
	const [isPlaying, setIsPlaying] = useState(false);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "approved":
				return "bg-green-50 text-green-700 border-green-200";
			case "rejected":
				return "bg-red-50 text-red-700 border-red-200";
			default:
				return "bg-yellow-50 text-yellow-700 border-yellow-200";
		}
	};

	// This would typically come from an API call based on the song ID
	const customerReactions: CustomerReaction[] = [
		{ id: 1, date: "2024-06-01", phone: "2519****234", reaction: "Good" },
		{ id: 2, date: "2024-06-02", phone: "2519****444", reaction: "Bad" },
		{ id: 3, date: "2024-06-03", phone: "2519****564", reaction: "Good" },
		// { id: 4, date: "2024-06-04", phone: "2519****134", reaction: "Good" },
		// { id: 5, date: "2024-06-05", phone: "2519****214", reaction: "Bad" },
	];

	const handlePlay = () => {
		setIsPlaying(!isPlaying);
		// In a real application, this would trigger the audio playback
		console.log(isPlaying ? "Pausing" : "Playing", song.title);
	};

	return (
		<div className="space-y-6">
			<div className="text-center">
				<h2 className="text-3xl font-bold text-lime-600">{song.title}</h2>
				{/* <h3 className="text-xl font-semibold mt-2">{song.title}</h3> */}
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card className="w-full">
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<span>Tone Information</span>
							<Badge variant="outline" className={getStatusColor(song.status)}>
								{song.status.charAt(0).toUpperCase() + song.status.slice(1)}
							</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold">{song.title}</h3>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="outline"
												size="icon"
												className="rounded-full"
												onClick={handlePlay}>
												{isPlaying ? (
													<PauseCircle className="h-6 w-6" />
												) : (
													<PlayCircle className="h-6 w-6" />
												)}
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>{isPlaying ? "Pause" : "Play"} tone</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="flex items-center space-x-2">
									<User className="w-4 h-4 text-gray-500" />
									<span className="text-sm font-medium">Provider:</span>
									<span className="text-sm">{song.artist}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Music className="w-4 h-4 text-gray-500" />
									<span className="text-sm font-medium">Schedule:</span>
									<span className="text-sm">{song.genre}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Calendar className="w-4 h-4 text-gray-500" />
									<span className="text-sm font-medium">Uploaded:</span>
									<span className="text-sm">{song.uploadDate}</span>
								</div>
								<div className="flex items-center space-x-2">
									<PlayCircle className="w-4 h-4 text-gray-500" />
									<span className="text-sm font-medium">Plays:</span>
									<span className="text-sm">{song.plays.toLocaleString()}</span>
								</div>
								{/* <div className="flex items-center space-x-2">
									<Clock className="w-4 h-4 text-gray-500" />
									<span className="text-sm font-medium">Duration:</span>
									<span className="text-sm">{song.genre} seconds</span>
								</div> */}
							</div>

							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<MessageSquare className="w-4 h-4 text-gray-500" />
									<span className="text-sm font-medium">Text Message:</span>
								</div>
								<p className="text-sm bg-gray-50 p-3 rounded-md">
									{song.textMessage}
								</p>
							</div>

							{/* <div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Campaign Progress</span>
									<span>{Math.round((song.plays / 10000) * 100)}%</span>
								</div>
								<Progress value={(song.plays / 10000) * 100} className="h-2" />
							</div> */}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Status Information</CardTitle>
					</CardHeader>
					<CardContent>
						{song.status === "approved" && !song.isVerified ? (
							<>
								<CardDescription className="mb-4">
									You are approved but payment is remaining. Please complete
									your payment to activate your campaign.
								</CardDescription>
								<Button className="w-full bg-blue-500">
									<Wallet className="w-4 h-4 mr-2" />
									Complete Payment
								</Button>
							</>
						) : song.status === "pending" && !song.isVerified ? (
							<div className="flex items-center space-x-2 text-yellow-600">
								<AlertTriangle className="w-5 h-5" />
								<span>
									Your approval is pending. Please wait for admin review.
								</span>
							</div>
						) : song.status === "approved" && song.isVerified ? (
							<>
								<div className="flex items-center space-x-2 text-green-600">
									<CheckCheck className="w-5 h-5" />
									<span>Your tone has been approved and activated.</span>
								</div>
							</>
						) : song.status === "rejected" ? (
							<div className="flex items-center space-x-2 text-red-600">
								<AlertTriangle className="w-5 h-5" />
								<span>
									Your tone has been rejected. Please contact support for more
									information.
								</span>
							</div>
						) : (
							<div className="flex items-center space-x-2 text-gray-600">
								<Info className="w-5 h-5" />
								<span>
									Unknown status. Please contact support for assistance.
								</span>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Customer Reactions</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>No.</TableHead>

								<TableHead>Date</TableHead>
								<TableHead>Customer Phone.</TableHead>

								<TableHead>Customer Reaction</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{customerReactions.map((reaction, index) => (
								<TableRow key={reaction.id}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{reaction.date}</TableCell>
									<TableCell>{reaction.phone}</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={
												reaction.reaction === "Good"
													? "bg-green-50 text-green-700 border-green-200"
													: "bg-red-50 text-red-700 border-red-200"
											}>
											{reaction.reaction}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
