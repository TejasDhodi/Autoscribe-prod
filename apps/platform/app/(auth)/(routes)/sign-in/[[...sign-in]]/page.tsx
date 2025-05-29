import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-screen h-screen grid items-center justify-center">
      <div className="w-max h-max">
        {/* @TODO : Will remove this hardcoded url later */}
        <SignIn signUpUrl="http://localhost:3000/sign-up?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F" />
      </div>
    </main>
  );
}
