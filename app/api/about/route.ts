import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

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

export async function GET() {
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

    return NextResponse.json(response);
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

    return NextResponse.json({ 
      success: true, 
      message: 'About data updated successfully' 
    });
  } catch (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json({ 
      error: 'Failed to update data' 
    }, { 
      status: 500 
    });
  }
}

