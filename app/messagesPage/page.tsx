"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Message = {
	id: string;
	sender: "vendor" | "customer";
	content: string;
	timestamp: Date;
};

type Conversation = {
	id: string;
	customerName: string;
	customerAvatar: string;
	lastMessage: string;
	unread: boolean;
	messages: Message[];
};

const initialConversations: Conversation[] = [
	{
		id: "1",
		customerName: "Tigist Alemayehu",
		customerAvatar: "/placeholder.svg?height=40&width=40",
		lastMessage: "Thank you for the quick response!",
		unread: true,
		messages: [
			{
				id: "1",
				sender: "customer",
				content:
					"Hello, I have a question about the Ethiopian coffee you're selling.",
				timestamp: new Date(2023, 5, 1, 10, 30),
			},
			{
				id: "2",
				sender: "vendor",
				content:
					"Hello Tigist! I'd be happy to help. What would you like to know?",
				timestamp: new Date(2023, 5, 1, 10, 35),
			},
			{
				id: "3",
				sender: "customer",
				content: "Is it single-origin? And how dark is the roast?",
				timestamp: new Date(2023, 5, 1, 10, 40),
			},
			{
				id: "4",
				sender: "vendor",
				content:
					"Yes, it's single-origin from Yirgacheffe. The roast is medium-dark, perfect for espresso or filter coffee.",
				timestamp: new Date(2023, 5, 1, 10, 45),
			},
			{
				id: "5",
				sender: "customer",
				content: "Thank you for the quick response!",
				timestamp: new Date(2023, 5, 1, 10, 50),
			},
		],
	},
	{
		id: "2",
		customerName: "Dawit Tadesse",
		customerAvatar: "/placeholder.svg?height=40&width=40",
		lastMessage: "When will my order be shipped?",
		unread: false,
		messages: [
			{
				id: "1",
				sender: "customer",
				content:
					"Hi there, I placed an order for a traditional Ethiopian dress last week.",
				timestamp: new Date(2023, 5, 2, 14, 0),
			},
			{
				id: "2",
				sender: "vendor",
				content:
					"Hello Dawit! Thank you for your order. Could you please provide your order number?",
				timestamp: new Date(2023, 5, 2, 14, 10),
			},
			{
				id: "3",
				sender: "customer",
				content: "Sure, it's ETH12345.",
				timestamp: new Date(2023, 5, 2, 14, 15),
			},
			{
				id: "4",
				sender: "vendor",
				content:
					"Thank you. I see your order is being prepared for shipping. It should be dispatched within 2 business days.",
				timestamp: new Date(2023, 5, 2, 14, 20),
			},
			{
				id: "5",
				sender: "customer",
				content: "When will my order be shipped?",
				timestamp: new Date(2023, 5, 2, 14, 25),
			},
		],
	},
];

export default function VendorMessages() {
	const [conversations, setConversations] =
		useState<Conversation[]>(initialConversations);
	const [selectedConversation, setSelectedConversation] =
		useState<Conversation | null>(null);
	const [newMessage, setNewMessage] = useState("");

	const handleSelectConversation = (conversation: Conversation) => {
		setSelectedConversation(conversation);
		// Mark conversation as read
		setConversations((prevConversations) =>
			prevConversations.map((conv) =>
				conv.id === conversation.id ? { ...conv, unread: false } : conv
			)
		);
	};

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newMessage.trim() || !selectedConversation) return;

		const updatedMessage: Message = {
			id: Date.now().toString(),
			sender: "vendor",
			content: newMessage.trim(),
			timestamp: new Date(),
		};

		setConversations((prevConversations) =>
			prevConversations.map((conv) =>
				conv.id === selectedConversation.id
					? {
							...conv,
							messages: [...conv.messages, updatedMessage],
							lastMessage: updatedMessage.content,
					  }
					: conv
			)
		);

		setSelectedConversation((prev) =>
			prev
				? {
						...prev,
						messages: [...prev.messages, updatedMessage],
						lastMessage: updatedMessage.content,
				  }
				: null
		);

		setNewMessage("");
	};

	return (
		<div className="container mx-auto p-6 mt-6 space-y-8 bg-gray-50">
			{/* <div className="flex items-center justify-between mb-6">
				<Button
					variant="ghost"
					className="text-blue-900 hover:text-blue-700"
					onClick={() => window.history.back()}>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Dashboard
				</Button>
				<h1 className="text-3xl font-bold text-blue-900">Messages</h1>
			</div> */}
			<header className="bg-blue-900 text-white p-4 fixed top-0 right-0 left-0">
				<h1 className="text-2xl font-bold">Messages</h1>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="md:col-span-1 bg-white shadow-md">
					<CardHeader>
						<CardTitle className="text-blue-900">Conversations</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[600px]">
							{conversations.map((conversation) => (
								<div key={conversation.id} className="mb-4">
									<button
										className={`w-full text-left p-3 rounded-lg transition-colors ${
											selectedConversation?.id === conversation.id
												? "bg-blue-100"
												: "hover:bg-gray-100"
										}`}
										onClick={() => handleSelectConversation(conversation)}>
										<div className="flex items-center space-x-3">
											<Avatar>
												<AvatarImage
													src={conversation.customerAvatar}
													alt={conversation.customerName}
												/>
												<AvatarFallback>
													{conversation.customerName
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													{conversation.customerName}
												</p>
												<p className="text-sm text-gray-500 truncate">
													{conversation.lastMessage}
												</p>
											</div>
											{conversation.unread && (
												<span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
											)}
										</div>
									</button>
									<Separator className="my-2" />
								</div>
							))}
						</ScrollArea>
					</CardContent>
				</Card>

				<Card className="md:col-span-2 bg-white shadow-md">
					<CardHeader>
						<CardTitle className="text-blue-900">
							{selectedConversation
								? selectedConversation.customerName
								: "Select a conversation"}
						</CardTitle>
					</CardHeader>
					<CardContent>
						{selectedConversation ? (
							<>
								<ScrollArea className="h-[500px] pr-4">
									{selectedConversation.messages.map((message) => (
										<div
											key={message.id}
											className={`mb-4 ${
												message.sender === "vendor" ? "text-right" : "text-left"
											}`}>
											<div
												className={`inline-block p-3 rounded-lg ${
													message.sender === "vendor"
														? "bg-blue-100 text-blue-900"
														: "bg-gray-100 text-gray-900"
												}`}>
												<p className="text-sm">{message.content}</p>
												<p className="text-xs text-gray-500 mt-1">
													{format(message.timestamp, "HH:mm")}
												</p>
											</div>
										</div>
									))}
								</ScrollArea>
								<form
									onSubmit={handleSendMessage}
									className="mt-4 flex items-center">
									<Input
										type="text"
										placeholder="Type your message..."
										value={newMessage}
										onChange={(e) => setNewMessage(e.target.value)}
										className="flex-1 mr-2"
									/>
									<Button
										type="submit"
										className="bg-blue-900 hover:bg-blue-800">
										<Send className="h-4 w-4" />
										<span className="sr-only">Send message</span>
									</Button>
								</form>
							</>
						) : (
							<p className="text-center text-gray-500">
								Select a conversation to start messaging
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
