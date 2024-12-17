import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Music, User, PlayCircle } from "lucide-react";

interface ApprovedMusicsListProps {
	Musics: any[];
}

export function ApprovedMusicsList({ Musics }: ApprovedMusicsListProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[300px]">Music Name</TableHead>
					<TableHead>Provider</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Total Plays</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Musics.map((Music) => (
					<TableRow key={Music.id}>
						<TableCell className="font-medium">
							<div className="flex items-center">
								<Music className="w-4 h-4 mr-2 text-gray-500" />
								{Music.name}
							</div>
						</TableCell>
						<TableCell>
							<div className="flex items-center">
								<User className="w-4 h-4 mr-2 text-gray-500" />
								{Music.providerName}
							</div>
						</TableCell>
						<TableCell>
							<Badge
								variant="outline"
								className="bg-green-50 text-green-700 border-green-200">
								{Music.status}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end">
								<PlayCircle className="w-4 h-4 mr-2 text-gray-500" />
								{Music.plays.toLocaleString()}
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
