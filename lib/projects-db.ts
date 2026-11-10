// lib/projects-db.ts
import { sql } from '@vercel/postgres';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }
  const { rows } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
  return rows;
}

export const ITEMS_PER_PAGE = 6;

// Case-insensitive match against title, description, type, or any technology.
// `technologies::text` works whether the column is text[] or jsonb.
export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pattern = `%${query}%`;
  const { rows } = await sql<Project>`
    SELECT * FROM projects
    WHERE title ILIKE ${pattern}
       OR description ILIKE ${pattern}
       OR type ILIKE ${pattern}
       OR technologies::text ILIKE ${pattern}
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows;
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const pattern = `%${query}%`;
  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*) FROM projects
    WHERE title ILIKE ${pattern}
       OR description ILIKE ${pattern}
       OR type ILIKE ${pattern}
       OR technologies::text ILIKE ${pattern}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}
