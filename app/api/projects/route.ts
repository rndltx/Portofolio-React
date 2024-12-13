import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const results = await query('SELECT * FROM projects_rizsign');
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching projects data:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const updatedData = await request.json();

  try {
    // Clear existing projects
    await query('DELETE FROM projects_rizsign');

    // Insert new projects
    for (const project of updatedData) {
      await query(
        'INSERT INTO projects_rizsign (title, description, image_url, project_url, github_url, technologies) VALUES (?, ?, ?, ?, ?, ?)',
        [project.title, project.description, project.imageUrl, project.projectUrl, project.githubUrl, JSON.stringify(project.technologies)]
      );
    }

    return NextResponse.json({ success: true, message: 'Projects data updated successfully' });
  } catch (error) {
    console.error('Error updating projects data:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

