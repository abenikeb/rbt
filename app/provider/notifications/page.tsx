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
import { Bell, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Notification {
	id: number;
	MusicId: number;
	MusicName: string;
	status: "approved" | "rejected";
	message: string;
	date: string;
}

export default function NotificationsPage() {
	const router = useRouter();
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: 1,
			MusicId: 1,
			MusicName: "Tizita Memories",
			status: "approved",
			message: "Your Music 'Tizita Memories' has been approved!",
			date: "2023-06-15",
		},
		{
			id: 2,
			MusicId: 2,
			MusicName: "Bati Groove",
			status: "approved",
			message: "Your Music 'Bati Groove' has been approved!",
			date: "2023-06-14",
		},
		{
			id: 3,
			MusicId: 3,
			MusicName: "Ethio-Jazz Fusion",
			status: "rejected",
			message:
				"Your Music 'Ethio-Jazz Fusion' has been rejected. Reason: Copyright concerns.",
			date: "2023-06-13",
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
		} as Music);
		setShowPaymentPopup(true);
	};

	const handlePaymentComplete = () => {
		setShowPaymentPopup(false);
		// Here you would typically update the Music's status in your backend
		console.log(`Payment completed for Music: ${selectedMusic?.name}`);
	};

	const handleDeleteNotification = (id: number) => {
		setNotifications(notifications.filter((notif) => notif.id !== id));
	};

	return (
		<div className="container mx-auto p-4 bg-gray-50 min-h-screen">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold flex items-center">
					<Bell className="mr-2" /> Notifications
				</h1>
				<Button
					onClick={() => router.push("/provider")}
					variant="outline"
					className="flex items-center">
					<ArrowLeft className="mr-2" /> Back to Dashboard
				</Button>
			</div>
			<div className="space-y-4">
				{notifications.map((notification) => (
					<motion.div
						key={notification.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}>
						<Card className="overflow-hidden">
							<CardHeader
								className={`${
									notification.status === "approved"
										? "bg-green-100"
										: "bg-red-100"
								}`}>
								<CardTitle className="flex items-center justify-between">
									<span className="flex items-center">
										{notification.status === "approved" ? (
											<CheckCircle className="mr-2 text-green-600" />
										) : (
											<XCircle className="mr-2 text-red-600" />
										)}
										{notification.MusicName}
									</span>
									<Badge
										variant={
											notification.status === "approved"
												? "default"
												: "destructive"
										}>
										{notification.status}
									</Badge>
								</CardTitle>
								<CardDescription>{notification.date}</CardDescription>
							</CardHeader>
							<CardContent className="pt-4">
								<p className="mb-4">{notification.message}</p>
								<div className="flex justify-between items-center">
									{notification.status === "approved" && (
										<Button
											onClick={() => handleApprovedMusicClick(notification)}
											className="bg-yellow-500 hover:bg-yellow-600">
											Complete Payment
										</Button>
									)}
									<Button
										variant="ghost"
										onClick={() => handleDeleteNotification(notification.id)}>
										Delete
									</Button>
								</div>
							</CardContent>
						</Card>
					</motion.div>
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
