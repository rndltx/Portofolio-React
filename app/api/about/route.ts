import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const aboutResults = await query('SELECT * FROM about_rizsign LIMIT 1');
    const slidesResults = await query('SELECT * FROM hero_slides_rizsign');

    const aboutData = aboutResults[0] || {};
    const heroSlides = slidesResults || [];

    return NextResponse.json({ ...aboutData, heroSlides });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const updatedData = await request.json();

  try {
    // Update about data
    await query(
      'UPDATE about_rizsign SET name = ?, title = ?, description = ?, skills = ? WHERE id = 1',
      [updatedData.name, updatedData.title, updatedData.description, JSON.stringify(updatedData.skills)]
    );

    // Update hero slides
    for (const slide of updatedData.heroSlides) {
      if (slide.id) {
        await query(
          'UPDATE hero_slides_rizsign SET image_url = ?, title = ?, subtitle = ? WHERE id = ?',
          [slide.imageUrl, slide.title, slide.subtitle, slide.id]
        );
      } else {
        await query(
          'INSERT INTO hero_slides_rizsign (image_url, title, subtitle) VALUES (?, ?, ?)',
          [slide.imageUrl, slide.title, slide.subtitle]
        );
      }
    }

    return NextResponse.json({ success: true, message: 'About data updated successfully' });
  } catch (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

