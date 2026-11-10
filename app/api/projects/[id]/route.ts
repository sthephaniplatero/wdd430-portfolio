import { NextResponse } from 'next/server';
import { getProjectById } from '@/lib/projects-db';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  const project = await getProjectById(id);
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}
