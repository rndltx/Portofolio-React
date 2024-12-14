import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.rizsign.com',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
}

export async function GET() {
  try {
    const aboutResults = await query('SELECT * FROM about_rizsign LIMIT 1');
    const slidesResults = await query('SELECT * FROM hero_slides_rizsign ORDER BY id ASC');

    interface AboutData {
      name: string;
      title: string;
      description: string;
      skills: string;
    }

    const aboutData: AboutData = (aboutResults[0] as unknown as AboutData) || {
      name: '',
      title: '',
      description: '',
      skills: '[]'
    };

    const heroSlides = slidesResults || [];

    return new NextResponse(JSON.stringify({
      success: true,
      data: {
        ...aboutData,
        skills: JSON.parse(aboutData.skills || '[]'),
        heroSlides: heroSlides.map(slide => ({
          id: slide.id,
          image_url: slide.image_url,
          title: slide.title,
          subtitle: slide.subtitle
        }))
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://www.rizsign.com',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return new NextResponse(JSON.stringify({
      success: false,
      error: 'Failed to fetch data'
    }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data) {
      throw new Error('Invalid request data');
    }

    // Begin transaction
    await query('START TRANSACTION');

    // Update about data
    await query(
      'UPDATE about_rizsign SET name = ?, title = ?, description = ?, skills = ? WHERE id = 1',
      [data.name, data.title, data.description, JSON.stringify(data.skills)]
    );

    // Update hero slides
    for (const slide of data.heroSlides) {
      if (slide.id) {
        await query(
          'UPDATE hero_slides_rizsign SET image_url = ?, title = ?, subtitle = ? WHERE id = ?',
          [slide.image_url, slide.title, slide.subtitle, slide.id]
        );
      } else {
        await query(
          'INSERT INTO hero_slides_rizsign (image_url, title, subtitle) VALUES (?, ?, ?)',
          [slide.image_url, slide.title, slide.subtitle]
        );
      }
    }

    // Commit transaction
    await query('COMMIT');

    return new NextResponse(JSON.stringify({
      success: true,
      message: 'Data updated successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://www.rizsign.com',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  } catch (error) {
    // Rollback on error
    await query('ROLLBACK');
    console.error('Error updating about data:', error);
    return new NextResponse(JSON.stringify({
      success: false,
      error: 'Failed to update data'
    }), { status: 500 });
  }
}

