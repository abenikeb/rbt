"use client";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export default function AdminPage() {
	const router = useRouter();

	const handleLogout = () => {
		// In a real app, you would clear the authentication state here
		router.push("/");
	};

	return (
		<div className="min-h-screen bg-white">
			<header className="bg-lime-500 shadow-md">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<User className="w-6 h-6 text-gray-600" />
							<span className="text-gray-800 font-medium">Admin User</span>
						</div>
						<Button
							onClick={handleLogout}
							variant="outline"
							className="flex items-center">
							<LogOut className="w-4 h-4 mr-2" />
							Logout
						</Button>
					</div>
				</div>
			</header>
			<main className="container mx-auto p-4">
				<AdminDashboard />
			</main>
		</div>
	);
}
