import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.rizsign.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json'
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders
  });
}

export async function GET() {
  try {
    const aboutResults = await query('SELECT * FROM about_rizsign LIMIT 1');
    const slidesResults = await query('SELECT * FROM hero_slides_rizsign');

    return new NextResponse(JSON.stringify({
      success: true,
      data: {
        ...aboutResults[0] || {},
        heroSlides: slidesResults || []
      }
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ 
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

export async function POST(request: Request) {
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  try {
    const updatedData = await request.json();

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

    return new NextResponse(JSON.stringify({
      success: true,
      message: 'Data updated successfully'
    }), {
      status: 200, 
      headers: corsHeaders
    });
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

