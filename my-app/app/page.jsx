'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";


export default function Home() {
    const router = useRouter();
    <button>Hello</button>
      return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-lg text-center">
        Malaki ang pwet ko
      </p>
      <Button onClick={() => router.push('/paymentmode')}>Click Me</Button>
    </div>
  );
}
