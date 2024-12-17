import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Music, Lock } from "lucide-react";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	onLogin: (username: string, password: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const router = useRouter();

	const handleLogin = () => {
		onLogin(username, password);
	};

	const handleRegisterProvider = () => {
		onClose();
		router.push("/register-provider");
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-center text-lime-500">
						Welcome to Ad-Tone
					</DialogTitle>
					<DialogDescription className="text-center mb-4">
						Please enter your credentials to login.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username" className="text-sm font-medium">
								Username
							</Label>
							<div className="relative">
								<Music className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<Input
									id="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="pl-10 border-gray-300 focus:border-lime-500 focus:ring-green-500"
									placeholder="Enter your username"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password" className="text-sm font-medium">
								Password
							</Label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
									placeholder="Enter your password"
								/>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<Checkbox
									id="remember-me"
									checked={rememberMe}
									onCheckedChange={(checked) =>
										setRememberMe(checked as boolean)
									}
								/>
								<Label htmlFor="remember-me" className="text-sm text-gray-600">
									Remember me
								</Label>
							</div>
							<a
								href="#"
								className="text-sm text-lime-500 hover:text-green-700">
								Forgot password?
							</a>
						</div>
						<Button
							className="w-full bg-lime-500 hover:bg-green-700 text-white py-2 text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
							onClick={handleLogin}>
							Login
						</Button>
					</div>
					<div className="text-center">
						<span className="text-sm text-gray-600">
							Don't have an account?{" "}
						</span>
						<Button
							variant="link"
							onClick={handleRegisterProvider}
							className="text-lime-500 hover:text-green-700 p-0">
							Register as a provider
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// interface LoginModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onLogin: (role: string) => void
// }

// export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
//   const [selectedRole, setSelectedRole] = useState<string | null>(null)
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useRouter()

//   const handleLogin = () => {
//     if (selectedRole) {
//       onLogin(selectedRole)
//     }
//   }

//   const handleRegisterProvider = () => {
//     onClose()
//     router.push('/register-provider')
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Login</DialogTitle>
//           <DialogDescription>
//             Please select your role and enter your credentials.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="space-y-4">
//           <div className="flex justify-center space-x-4">
//             <Button
//               variant={selectedRole === 'provider' ? 'default' : 'outline'}
//               onClick={() => setSelectedRole('provider')}
//             >
//               Login as Provider
//             </Button>
//             <Button
//               variant={selectedRole === 'admin' ? 'default' : 'outline'}
//               onClick={() => setSelectedRole('admin')}
//             >
//               Login as Admin
//             </Button>
//           </div>
//           {selectedRole === 'provider' && (
//             <Button variant="link" onClick={handleRegisterProvider}>
//               Register as Music Provider
//             </Button>
//           )}
//           {selectedRole && (
//             <>
//               <div className="space-y-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <Button className="w-full" onClick={handleLogin}>
//                 Login
//               </Button>
//             </>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
