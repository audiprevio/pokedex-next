import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const offset = (page - 1) * limit;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${res.statusText}`);
  }

  const data = await res.json();

  return NextResponse.json({
    pokemonList: data.results,
    currentPage: page,
    totalPages: Math.ceil(data.count / limit),
    nextPage: page < Math.ceil(data.count / limit) ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  });
}