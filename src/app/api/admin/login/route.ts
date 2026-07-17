import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          error: 'Admin credentials not configured',
        },
        {
          status: 500,
        },
      );
    }
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          error: 'Invalid credentials',
        },
        {
          status: 401,
        },
      );
    }

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set('admin_session', crypto.randomUUID(), {
      httpOnly: true,

      sameSite: 'strict',

      secure: process.env.NODE_ENV === 'production',

      maxAge: 60 * 60 * 24 * 7,

      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Login failed',
      },
      {
        status: 500,
      },
    );
  }
}
