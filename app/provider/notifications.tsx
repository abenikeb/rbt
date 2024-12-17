"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaymentPopup } from "@/components/provider/PaymentPopup";
import { Music } from "@/components/provider/ProviderDashboard";

interface Notification {
	id: number;
	MusicId: number;
	MusicName: string;
	status: "approved" | "rejected";
	message: string;
}

export default function NotificationsPage() {
	const router = useRouter();
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: 1,
			MusicId: 1,
			MusicName: "Summer Vibes",
			status: "approved",
			message: "Your Music 'Summer Vibes' has been approved!",
		},
		{
			id: 2,
			MusicId: 2,
			MusicName: "Chill Beats",
			status: "approved",
			message: "Your Music 'Chill Beats' has been approved!",
		},
		{
			id: 3,
			MusicId: 3,
			MusicName: "Energetic Pop",
			status: "rejected",
			message:
				"Your Music 'Energetic Pop' has been rejected. Reason: Copyright concerns.",
		},
	]);
	const [showPaymentPopup, setShowPaymentPopup] = useState(false);
	const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);

	const handleApprovedMusicClick = (notification: Notification) => {
		setSelectedMusic({
			id: notification.MusicId,
			name: notification.MusicName,
			plays: 0,
			status: "approved",
		});
		setShowPaymentPopup(true);
	};

	const handlePaymentComplete = () => {
		setShowPaymentPopup(false);
		// Here you would typically update the Music's status in your backend
		console.log(`Payment completed for Music: ${selectedMusic?.name}`);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Notifications</h1>
			<Button onClick={() => router.push("/provider")} className="mb-4">
				Back to Dashboard
			</Button>
			<div className="space-y-4">
				{notifications.map((notification) => (
					<Card key={notification.id}>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								{notification.MusicName}
								<Badge
									variant={
										notification.status === "approved"
											? "default"
											: "destructive"
									}>
									{notification.status}
								</Badge>
							</CardTitle>
							<CardDescription>{notification.message}</CardDescription>
						</CardHeader>
						<CardContent>
							{notification.status === "approved" && (
								<Button onClick={() => handleApprovedMusicClick(notification)}>
									Complete Payment
								</Button>
							)}
						</CardContent>
					</Card>
				))}
			</div>
			{showPaymentPopup && selectedMusic && (
				<PaymentPopup
					Music={selectedMusic}
					onComplete={handlePaymentComplete}
					onClose={() => setShowPaymentPopup(false)}
				/>
			)}
		</div>
	);
}
