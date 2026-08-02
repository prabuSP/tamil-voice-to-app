import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    generated: {
      appName: body.spec?.appName ?? 'Generated App',
      pages: ['Dashboard', 'Customers', 'Reports']
    }
  });
}
