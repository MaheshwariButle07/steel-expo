"use client";

import Login from "@/components/onboarding/Login";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Left side with the image */}
      <div className="w-1/2 relative">
        <Image
          src="https://pzcyatdoqigagyfbsani.supabase.co/storage/v1/object/public/steel-images//home-bg.webp"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="h-full"
        />
      </div>

      {/* Right side with the Login component */}
      <div className="w-1/2 flex items-center justify-center">
        <Login />
      </div>
    </div>
  );
}
