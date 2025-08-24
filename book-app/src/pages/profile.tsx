import { GetServerSideProps } from "next";

type User = {
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  location: string | null;
  birthday: string | null;
  bio: string | null;
  profile_picture: string | null;
  favourite_book: string | null;
};

type ProfileProps = {
  user: User | null;
};

export default function ProfilePage({ user }: ProfileProps) {
  if (!user) return <p>Profile not available</p>;

  const fullName =
    user.first_name || user.last_name 
      ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
      : "No Name";

  return (
    <div className="p-8 max-w-[500px] mx-auto">
      <h1>Profile Page</h1>
      <img
        src={user.profile_picture || "https://i.pravatar.cc/150?img=3"}
        alt={fullName}
        width={150}
        height={150}
        className="rounded-full"
      />
      <h2>{fullName}</h2>
      <p><strong>User ID:</strong> {user.user_id}</p>
      <p><strong>Location:</strong> {user.location || "Unknown"}</p>
      <p><strong>Birthday:</strong> {user.birthday || "Unknown"}</p>
      <p><strong>Bio:</strong> {user.bio || "Not provided"}</p>
      <p><strong>Favourite Book:</strong> {user.favourite_book || "None"}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(
      "https://bookclub-backend.nn.r.appspot.com/api/v1/98aac522330f4c29882dcfd3736822ad/profile"
    );

    if (!res.ok) {
      console.error("API error:", res.status);
      return { props: { user: null } };
    }

    const user: User = await res.json();

    return { props: { user } };
  } catch (error) {
    console.error("Fetch error:", error);
    return { props: { user: null } };
  }
};
