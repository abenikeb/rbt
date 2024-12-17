"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Subscriber {
	id: number;
	email: string;
	status: "active" | "inactive";
}

export function TelecomDashboard() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [subscribers, setSubscribers] = useState<Subscriber[]>([
		{ id: 1, email: "user1@example.com", status: "active" },
		{ id: 2, email: "user2@example.com", status: "inactive" },
	]);

	const handleLogin = () => {
		// In a real app, this would validate credentials
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<div>
			{!isLoggedIn ? (
				<div className="space-y-4">
					<Input type="text" placeholder="Username" className="mb-2" />
					<Input type="password" placeholder="Password" className="mb-2" />
					<Button onClick={handleLogin}>Login</Button>
				</div>
			) : (
				<div className="space-y-4">
					<Button onClick={handleLogout} className="mb-4">
						Logout
					</Button>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Subscriber Email</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{subscribers.map((subscriber) => (
								<TableRow key={subscriber.id}>
									<TableCell>{subscriber.email}</TableCell>
									<TableCell>{subscriber.status}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}
