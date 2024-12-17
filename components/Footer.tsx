export function Footer() {
	return (
		<footer className="bg-[#19648f] text-white py-8">
			<div className="container mx-auto px-6">
				<div className="flex flex-wrap justify-between">
					<div className="w-full md:w-1/4 mb-6 md:mb-0">
						<h3 className="text-xl font-bold mb-4">AdRBT</h3>
						<p className="text-gray-50">
							Revolutionizing mobile advertising in Ethiopia.
						</p>
					</div>
					<div className="w-full md:w-1/4 mb-6 md:mb-0">
						<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<a href="#" className="hover:text-lime-400">
									About Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-lime-400">
									Features
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-lime-400">
									Pricing
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-lime-400">
									Contact
								</a>
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/4 mb-6 md:mb-0">
						<h4 className="text-lg font-semibold mb-4">Legal</h4>
						<ul className="space-y-2">
							<li>
								<a href="#" className="hover:text-lime-400">
									Terms of Service
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-lime-400">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-lime-400">
									Cookie Policy
								</a>
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/4">
						<h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
						<div className="flex space-x-4">
							<a href="#" className="hover:text-lime-400">
								Facebook
							</a>
							<a href="#" className="hover:text-lime-400">
								Twitter
							</a>
							<a href="#" className="hover:text-lime-400">
								Instagram
							</a>
						</div>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-50 text-center text-sm text-gray-50">
					© 2024 AdRBT. All rights reserved
				</div>
			</div>
		</footer>
	);
}
