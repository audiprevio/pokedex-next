import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!resp.ok) {
      throw new Error(`Failed to fetch Pokemon details: ${resp.statusText}`);
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    return NextResponse.json({ error: 'Pokemon not found' }, { status: 404 });
  }
}