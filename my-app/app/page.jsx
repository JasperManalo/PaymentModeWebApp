'use client';
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card } from "@/components/ui/card";


export default function Home() {
    const router = useRouter();
    <button>Hello</button>
      return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="p-20 mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to PaymentMode Web App</h1>
        <p className="text-lg text-gray-600">Total Payment Modes: 3</p>
        <p className="text-lg text-gray-600">Active Payment Modes: 2</p>
        <p className="text-lg text-gray-600">Inactive Payment Modes: 1</p>
      </Card>
      <Button onClick={() => router.push('/paymentmode')}>Go to Payment Modes</Button>
    </div>
  );
}
