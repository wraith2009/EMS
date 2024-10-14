import dynamic from "next/dynamic";

const ProfileClient = dynamic(() => import("./ProfileClient"), { ssr: false });

export default function Profile() {
  return <ProfileClient />;
}
