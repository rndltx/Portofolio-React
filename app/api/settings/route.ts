import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const results = await query('SELECT * FROM settings_rizsign LIMIT 1');
    return NextResponse.json(results[0] || {});
  } catch (error) {
    console.error('Error fetching settings data:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const updatedData = await request.json();

  try {
    await query(
      'UPDATE settings_rizsign SET name = ?, email = ?, bio = ?, footer_text = ?, copyright_text = ? WHERE id = 1',
      [updatedData.name, updatedData.email, updatedData.bio, updatedData.footerText, updatedData.copyrightText]
    );

    return NextResponse.json({ success: true, message: 'Settings data updated successfully' });
  } catch (error) {
    console.error('Error updating settings data:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

