import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Bell } from "lucide-react";
import Link from "@node_modules/next/link";

interface Notification {
	id: number;
	message: string;
	date: string;
	read: boolean;
}

interface NotificationCenterProps {
	onClose: () => void;
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: 1,
			message: 'Your Campaign "Tizita Memories" has been approved.',
			date: "2024-06-15",
			read: false,
		},
		{
			id: 2,
			message: 'New playback milesMusic reached for "Bati Groove".',
			date: "2004-06-14",
			read: false,
		},
		{
			id: 3,
			message: "Your account has been verified.",
			date: "2004-06-13",
			read: true,
		},
	]);

	const markAsRead = (id: number) => {
		setNotifications(
			notifications.map((notif) =>
				notif.id === id ? { ...notif, read: true } : notif
			)
		);
	};

	const deleteNotification = (id: number) => {
		setNotifications(notifications.filter((notif) => notif.id !== id));
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader className="bg-yellow-600 text-white rounded-t-lg flex justify-between items-center">
				<CardTitle className="flex items-center">
					<Bell className="mr-2 h-5 w-5" />
					Notifications
				</CardTitle>
				<Button variant="ghost" size="icon" onClick={onClose}>
					<X className="h-5 w-5" />
				</Button>
			</CardHeader>
			<CardContent>
				<ul className="divide-y divide-gray-200">
					{notifications.map((notif) => (
						<li
							key={notif.id}
							className={`py-4 ${notif.read ? "opacity-50" : ""}`}>
							<div className="flex justify-between">
								<p className="text-sm font-medium text-gray-900">
									{notif.message}
								</p>
								<p className="text-sm text-gray-500">{notif.date}</p>
							</div>
							<div className="mt-2 flex space-x-2">
								{!notif.read && (
									<Button
										variant="outline"
										size="sm"
										onClick={() => markAsRead(notif.id)}>
										Mark as Read
									</Button>
								)}

								<Link href="/provider/notifications">
									<Button variant="outline">View Notifications</Button>
								</Link>

								<Button
									variant="outline"
									size="sm"
									onClick={() => deleteNotification(notif.id)}>
									Delete
								</Button>
							</div>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
