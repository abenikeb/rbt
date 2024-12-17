"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Music } from "./ProviderDashboard";

interface UploadMusicFormProps {
	onMusicUpload?: (Music: Music) => void;
}

export function UploadMusicForm({ onMusicUpload }: UploadMusicFormProps) {
	const [MusicName, setMusicName] = useState("");
	const [flashMessage, setFlashMessage] = useState("");
	const [MusicFile, setMusicFile] = useState<File | null>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically send the form data to your backend
		console.log("Submitting:", { MusicName, flashMessage, MusicFile });
		setIsSubmitted(true);

		// Create a new Music object
		const newMusic: Music = {
			id: Date.now(), // This should be replaced with a proper ID from the backend
			name: MusicName,
			plays: 0,
			status: "pending",
		};

		// Call the onMusicUpload callback if it exists
		if (onMusicUpload) {
			onMusicUpload(newMusic);
		}

		// Reset form
		setMusicName("");
		setFlashMessage("");
		setMusicFile(null);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setMusicFile(e.target.files[0]);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="MusicName">Music Name</Label>
				<Input
					id="MusicName"
					value={MusicName}
					onChange={(e) => setMusicName(e.target.value)}
					required
				/>
			</div>
			<div>
				<Label htmlFor="flashMessage">Flash Message</Label>
				<Textarea
					id="flashMessage"
					value={flashMessage}
					onChange={(e) => setFlashMessage(e.target.value)}
					required
				/>
			</div>
			<div>
				<Label htmlFor="MusicFile">Upload Music</Label>
				<Input
					id="MusicFile"
					type="file"
					onChange={handleFileChange}
					accept="audio/*"
					required
				/>
			</div>
			<Button type="submit">Upload Music</Button>
			{isSubmitted && (
				<Alert>
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Success</AlertTitle>
					<AlertDescription>
						Your Music has been uploaded successfully and is pending approval.
					</AlertDescription>
				</Alert>
			)}
		</form>
	);
}
