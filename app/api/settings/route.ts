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
    const results = await query('SELECT * FROM settings_rizsign LIMIT 1');
    return new NextResponse(JSON.stringify(results[0] || {}), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching settings data:', error);
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

    await query(
      'UPDATE settings_rizsign SET name = ?, email = ?, bio = ?, footer_text = ?, copyright_text = ? WHERE id = 1',
      [updatedData.name, updatedData.email, updatedData.bio, updatedData.footerText, updatedData.copyrightText]
    );

    return new NextResponse(JSON.stringify({ 
      success: true, 
      message: 'Settings data updated successfully' 
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error updating settings data:', error);
    return new NextResponse(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
}

