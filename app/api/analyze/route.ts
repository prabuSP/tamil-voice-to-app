import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    transcript: body.transcript ?? "",
    spec: {
      appName: "Generated Tamil App",
      language: "ta",
      entities: [
        {
          name: "Customer",
          fields: ["பெயர்", "மொபைல்", "முகவரி"]
        }
      ],
      features: ["Dashboard", "CRUD", "Reports"]
    }
  });
}
