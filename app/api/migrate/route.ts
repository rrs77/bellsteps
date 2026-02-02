import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { sql } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map((e) => e.trim()) || [];
    if (!adminEmails.includes(session.user.email)) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const migrationPath = join(process.cwd(), 'migrations', '001_initial_schema.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');
    
    const statements = migrationSQL
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith('--'));

    const results = [];
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await sql.query(statement);
          results.push({ status: 'success', statement: statement.substring(0, 50) + '...' });
        } catch (error: any) {
          if (error.message?.includes('already exists')) {
            results.push({ status: 'skipped', statement: statement.substring(0, 50) + '...', reason: 'already exists' });
          } else {
            results.push({ status: 'error', statement: statement.substring(0, 50) + '...', error: error.message });
          }
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Migration completed',
      results 
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json({ 
      error: 'Migration failed', 
      message: error.message 
    }, { status: 500 });
  }
}
