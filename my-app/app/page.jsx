'use client';

import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card } from "@/components/ui/card";
import { Gauge, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [paymentModes, setPaymentModes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentModes = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/paymentmode");
        if (!res.ok) throw new Error("Failed to fetch payment modes");

        const data = await res.json();
        const candidate = Array.isArray(data) ? data : data?.data ?? [];

        setPaymentModes(candidate);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentModes();
  }, []);


  const totalModes = paymentModes.length;
  const activeModes = paymentModes.filter(
    m => m.v_isactive === true
  ).length;
  const inactiveModes = totalModes - activeModes;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="p-20 mb-8">
        <h1 className="flex items-center gap-3 text-4xl font-bold mb-4">
          Welcome to Payment Mode Web App!
        </h1>

        {isLoading ? (
          <div className="text-lg text-gray-600">Loading...</div>
        ) : (
          <div className="space-y-2">
            <div className="text-lg font-bold">
              <Gauge className="inline-block mr-2 w-5 h-5 text-black-500" />
              Dashboard
            </div>
            <Card className="my-4 p-4 bg-gray-20 rounded-lg">
            <div className="text-lg text-gray-600">
              Total Payment Modes: {totalModes}
            </div>
            <div className="text-lg text-green-600">
              Active Payment Modes: {activeModes}
            </div>
            <div className="text-lg text-red-600">
              Inactive Payment Modes: {inactiveModes}
            </div>
            </Card>
          </div>
        )}
      </Card>

      <Button onClick={() => router.push("/paymentmode")}>
        Go to Payment Modes
      </Button>

      <div className="text-lg text-gray-600 mt-10">
        Created by Jasper Jeriko Manalo :3
      </div>
    </div>
  );
}
