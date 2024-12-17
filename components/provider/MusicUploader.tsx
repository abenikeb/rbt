"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Upload, Music } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function MusicUploader() {
	const [file, setFile] = useState<File | null>(null);
	const [schedule, setSchedule] = useState("15");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle file upload logic here
		console.log("File uploaded:", file);
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">
					Upload Your Ringback Ad Tone
				</CardTitle>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="title">Campaign Title</Label>
						<Input
							id="title"
							placeholder="Enter the campaign title"
							required
							className="border-gray-300 focus:border-green-500 focus:ring-green-500"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="file">Ad File</Label>
						<div className="flex items-center space-x-2">
							<Input
								id="file"
								type="file"
								accept="audio/*"
								onChange={handleFileChange}
								required
								className="border-gray-300 focus:border-green-500 focus:ring-green-500"
							/>
							<Music className="h-5 w-5 text-lime-500" />
						</div>
					</div>

					<div className="space-y-2">
						<Label>Schedule</Label>
						<RadioGroup
							defaultValue="15"
							onValueChange={setSchedule}
							className="flex space-x-4">
							{[15, 30, 45, 60].map((days) => (
								<div key={days} className="flex items-center space-x-2">
									<RadioGroupItem
										value={days.toString()}
										id={`schedule-${days}`}
									/>
									<Label htmlFor={`schedule-${days}`}>{days} days</Label>
								</div>
							))}
						</RadioGroup>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">
							Text Message (Max 60 characters)
						</Label>
						<Textarea
							id="description"
							placeholder="Enter a brief message for your campaign"
							maxLength={60}
							className="border-gray-300 focus:border-green-500 focus:ring-green-500"
						/>
					</div>

					<Button
						type="submit"
						className="w-full bg-lime-500 hover:bg-green-700 text-white">
						Create Campaign
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
