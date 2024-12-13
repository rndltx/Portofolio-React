import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const results = await query('SELECT * FROM timeline_rizsign ORDER BY date DESC');
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching timeline data:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const updatedData = await request.json();

  try {
    // Clear existing timeline entries
    await query('DELETE FROM timeline_rizsign');

    // Insert new timeline entries
    for (const event of updatedData) {
      await query(
        'INSERT INTO timeline_rizsign (title, date, description, icon) VALUES (?, ?, ?, ?)',
        [event.title, event.date, event.description, event.icon]
      );
    }

    return NextResponse.json({ success: true, message: 'Timeline data updated successfully' });
  } catch (error) {
    console.error('Error updating timeline data:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

