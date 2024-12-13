import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.rizsign.com, https://rizsign.com',
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

export async function GET() {
  try {
    const results = await query('SELECT * FROM timeline_rizsign ORDER BY date DESC');
    return new NextResponse(JSON.stringify(results), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching timeline data:', error);
    return new NextResponse(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST(request: Request) {
  try {
    const updatedData = await request.json();

    await query('DELETE FROM timeline_rizsign');

    for (const event of updatedData) {
      await query(
        'INSERT INTO timeline_rizsign (title, date, description, icon) VALUES (?, ?, ?, ?)',
        [event.title, event.date, event.description, event.icon]
      );
    }

    return new NextResponse(JSON.stringify({ 
      success: true, 
      message: 'Timeline data updated successfully' 
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error updating timeline data:', error);
    return new NextResponse(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
}

