import { NextRequest, NextResponse } from 'next/server';

export default function GET(req: NextRequest) {
  // Logique pour récupérer les fichiers
  return NextResponse.json(
    { status: 200 }
);
}
