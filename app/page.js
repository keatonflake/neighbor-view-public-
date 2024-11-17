import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gradient-to-r p-4 from-blue-500 to-green-500">
      <div className="p-8 pt-10 pb-10  flex flex-col gap-6 bg-gray-800 rounded-3xl">
        <h1 className="text-5xl text-center">Welcome to NeighborView</h1>
        <p className="text-2xl text-center">Keep our neighborhoods safe together</p>
        <a className="m-auto max-w-fit pt-2 pb-2 pl-8 pr-8 bg-transparent border-solid border-2 border-green-500 rounded-full" href={'/login'}>Login</a>
        <a className="m-auto max-w-fit" href={'/signup'}>Create an Account</a>
      </div>
    </div>
  );
}
