import { NextResponse } from 'next/server';
//http://localhost:3001
//https://paymentmodeapi-production.up.railway.app

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const payload = {
            paymentmodename: body.paymentmodename ?? body.name,
            isactive: typeof body.isactive === 'boolean' ? body.isactive : body.status === 'Active'
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://paymentmodeapi-production.up.railway.app';
        const response = await fetch(`${baseUrl}/paymentmodes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.ok ? 200 : response.status || 500 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

