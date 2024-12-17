"use client";
import Link from "next/link";
import {
	Bell,
	ChevronRight,
	ShoppingBag,
	MessageCircle,
	Heart,
	User,
	ArrowLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const notifications = [
	{
		id: 1,
		type: "message",
		content: "Abebe Kebede sent you a message",
		time: "2 hours ago",
		read: false,
		icon: MessageCircle,
	},
	{
		id: 2,
		type: "order",
		content: "Your order of Ethiopian coffee has been shipped",
		time: "1 day ago",
		read: true,
		icon: ShoppingBag,
	},
	{
		id: 3,
		type: "like",
		content: "Tigist Haile liked your injera recipe",
		time: "3 days ago",
		read: true,
		icon: Heart,
	},
	{
		id: 4,
		type: "follower",
		content: "Yohannes Gebre started following you",
		time: "1 week ago",
		read: true,
		icon: User,
	},
	{
		id: 5,
		type: "message",
		content: "New message from Meskerem Trading Co.",
		time: "2 weeks ago",
		read: true,
		icon: MessageCircle,
	},
];

export default function NotificationsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-6">
				<Button
					variant="ghost"
					className="text-blue-900 hover:text-blue-700"
					onClick={() => window.history.back()}>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Home
				</Button>
				<h1 className="text-2xl font-bold text-blue-900">Notifications</h1>
			</div>

			<Card>
				<CardContent className="p-0">
					<ScrollArea className="h-[70vh]">
						{notifications.map((notification) => (
							<Link
								key={notification.id}
								href={`/notification/${notification.id}`}>
								<div
									className={`flex items-start space-x-4 p-4 hover:bg-accent transition-colors ${
										!notification.read ? "bg-accent/50" : ""
									}`}>
									<Avatar className="mt-1">
										<AvatarImage
											src={`https://api.dicebear.com/6.x/initials/svg?seed=${notification.content}`}
										/>
										<AvatarFallback>{notification.content[0]}</AvatarFallback>
									</Avatar>
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium leading-none">
											{notification.content}
											{!notification.read && (
												<Badge variant="secondary" className="ml-2">
													New
												</Badge>
											)}
										</p>
										<p className="text-sm text-muted-foreground">
											{notification.time}
										</p>
									</div>
									<ChevronRight className="h-5 w-5 text-muted-foreground" />
								</div>
							</Link>
						))}
					</ScrollArea>
				</CardContent>
			</Card>
			<div className="mt-6 flex justify-center">
				<Button variant="outline">Mark All as Read</Button>
			</div>
		</div>
	);
}
