import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface ProfileSectionProps {
	onClose: () => void;
}

export function ProfileSection({ onClose }: ProfileSectionProps) {
	const [profile, setProfile] = useState({
		name: "Mulatu Astatke",
		email: "mulatu@ethiojazz.com",
		bio: "Renowned Ethiopian Musician and the father of Ethio-jazz.",
		website: "https://mulatuastatke.com",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setProfile((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically send the updated profile to your backend
		console.log("Updated profile:", profile);
		onClose();
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader className="bg-green-700 text-white rounded-t-lg flex justify-between items-center">
				<CardTitle>Your Profile</CardTitle>
				<Button variant="ghost" size="icon" onClick={onClose}>
					<X className="h-5 w-5" />
				</Button>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4 mt-4">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							value={profile.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={profile.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor="bio">Bio</Label>
						<Textarea
							id="bio"
							name="bio"
							value={profile.bio}
							onChange={handleChange}
							rows={4}
						/>
					</div>
					<div>
						<Label htmlFor="website">Website</Label>
						<Input
							id="website"
							name="website"
							type="url"
							value={profile.website}
							onChange={handleChange}
						/>
					</div>
					<Button
						type="submit"
						className="w-full bg-green-600 hover:bg-green-700 text-white">
						Save Changes
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
