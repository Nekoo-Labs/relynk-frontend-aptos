import UserProfile from "@/components/features/user-profile";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return <UserProfile username={username} />;
}
