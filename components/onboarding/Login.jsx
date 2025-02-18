import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="w-1/2 m-auto flex flex-col items-center">
      <Image
        src="https://pzcyatdoqigagyfbsani.supabase.co/storage/v1/object/public/steel-images//eventlogo.webp"
        alt="Logo"
        height={100}
        width={100}
        className="mb-5"
      />

      <div className="flex flex-col items-center my-10">
        <input
          type="email"
          placeholder="name@example.com"
          className="my-3 px-5 border p-2 w-96 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="my-3 px-5 border p-2 w-96 rounded"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button className="my-3 px-10 bg-[#000033] text-white p-2 w-96 rounded">
          Sign In
        </button>

        <div className="relative flex justify-center text-xs uppercase my-3">
          <span className="bg-background px-2 text-muted-foreground">
            Sign up as
          </span>
        </div>

        {/* Sign-up buttons with correct Link usage */}
        <div className="flex gap-4">
          <Link href="/exhibitor-signup">
            <button className="px-10 border py-2 rounded">Exhibitor</button>
          </Link>

          <Link href="/visitor-signup">
            <button className="px-10 border py-2 rounded">Visitor</button>
          </Link>

          <Link href="/delegate-signup">
            <button className="px-10 border py-2 rounded">Delegate</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
