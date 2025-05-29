import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-screen h-screen grid items-center justify-center">
      <div className="w-max h-max">
        <SignUp />
      </div>
    </main>
  );
}
