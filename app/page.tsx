import LandingPage from "@/components/landing/LandingPage";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function AuthHomeRouter() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) return <LandingPage />;
  return <LandingPage />;
}

export default async function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthHomeRouter />
    </Suspense>
  );
}
