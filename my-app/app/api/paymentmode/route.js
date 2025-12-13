import { NextResponse } from 'next/server';


export async function GET() {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
		const response = await fetch(`${baseUrl}/paymentmodes?paymentmodeid=All`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
			next: { revalidate: 0 },
		});
		const data = await response.json();
		return NextResponse.json(data, { status: response.ok ? 200 : response.status || 500 });
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function POST(request) {
	try {
		const body = await request.json();
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
		const payload = {
			paymentmodename: body.paymentmodename ?? body.name,
			isactive: typeof body.isactive === 'boolean' ? body.isactive : (body.status === 'Active' || body.status === true),
		};
		const response = await fetch(`${baseUrl}/paymentmodes`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		const data = await response.json();
		return NextResponse.json(data, { status: response.ok ? 201 : response.status || 500 });
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
