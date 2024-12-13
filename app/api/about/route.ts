import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://www.rizsign.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400'
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders
  });
}

interface AboutData {
  id?: number;
  name: string;
  title: string;
  description: string;
  skills: string; // Keep as string in DB interface
}

interface AboutResponse {
  id?: number;
  name: string;
  title: string;
  description: string;
  skills: string[]; // Array in API response
  heroSlides: HeroSlide[];
}

interface HeroSlide {
  id?: number;
  image_url: string;
  title: string;
  subtitle: string;
}

// Update GET with redirect handling
export async function GET(request: Request) {
  // Handle redirects for preflight
  const url = new URL(request.url);
  if (url.hostname === 'rizsign.com') {
    return new NextResponse(null, {
      status: 307,
      headers: {
        ...corsHeaders,
        'Location': `https://www.rizsign.com${url.pathname}`
      }
    });
  }

  try {
    const aboutResults = await query<AboutData[]>('SELECT * FROM about_rizsign LIMIT 1');
    const slidesResults = await query<HeroSlide[]>('SELECT * FROM hero_slides_rizsign');

    const aboutData = aboutResults[0] || {};
    const heroSlides = slidesResults || [];

    // Parse skills from JSON string with type checking
    let parsedSkills: string[] = [];
    try {
      parsedSkills = aboutData.skills ? JSON.parse(aboutData.skills) : [];
      if (!Array.isArray(parsedSkills)) {
        parsedSkills = [];
      }
    } catch (e) {
      console.error('Error parsing skills JSON:', e);
      parsedSkills = [];
    }

    const response: AboutResponse = {
      ...aboutData,
      skills: parsedSkills,
      heroSlides
    };

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return new NextResponse(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
}

// Update POST with redirect handling
export async function POST(request: Request) {
  // Handle redirects for preflight
  const url = new URL(request.url);
  if (url.hostname === 'rizsign.com') {
    return new NextResponse(null, {
      status: 307,
      headers: {
        ...corsHeaders,
        'Location': `https://www.rizsign.com${url.pathname}`
      }
    });
  }

  try {
    const updatedData = await request.json();

    // Update about data
    await query(
      'UPDATE about_rizsign SET name = ?, title = ?, description = ?, skills = ? WHERE id = 1',
      [
        updatedData.name, 
        updatedData.title, 
        updatedData.description, 
        JSON.stringify(updatedData.skills)
      ]
    );

    // Update hero slides
    // First, delete all existing slides
    await query('DELETE FROM hero_slides_rizsign');

    // Then insert new slides
    for (const slide of updatedData.heroSlides) {
      await query(
        'INSERT INTO hero_slides_rizsign (image_url, title, subtitle) VALUES (?, ?, ?)',
        [slide.image_url, slide.title, slide.subtitle]
      );
    }

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200, 
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error updating about data:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to update' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json' 
      }
    });
  }
}

