import { NextResponse } from 'next/server';

export async function GET() {
  return await fetchPaymentmodes();
}

async function fetchPaymentmodes(retryCount = 0) {
  try {
    console.log(`Fetching payment modes... (attempt ${retryCount + 1})`);
    
    // Fetch data from your Express backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paymentmodes`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    const data = await response.json();
    console.log('✅ Payment modes fetched successfully!');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching payment modes:", error);
    return NextResponse.json({ error: 'Failed to fetch payment modes' }, { status: 500 });
  }
}