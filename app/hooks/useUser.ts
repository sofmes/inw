import { useEffect, useState } from "react";
import { useSession } from "~/hooks/useSession";

interface UserData {
	id: string;
	name: string;
	email: string;
	image?: string;
	description?: string;
}

export const useUser = () => {
	const { session } = useSession();
	const [userData, setUserData] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const mutate = (newData: UserData) => {
		setUserData(newData);
	};

	useEffect(() => {
		async function fetchUserData() {
			if (!session?.user?.id) {
				setLoading(false);
				return;
			}

			try {
				const response = await fetch(`/api/users/${session.user.id}`);
				console.log(response);
				if (!response.ok) {
					throw new Error("Failed to fetch user data");
				}
				const data = (await response.json()) as UserData;
				setUserData(data);
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error("Unknown error"),
				);
			} finally {
				setLoading(false);
			}
		}

		fetchUserData();
	}, [session?.user?.id]);

	return { data: userData, loading, error, mutate };
};
