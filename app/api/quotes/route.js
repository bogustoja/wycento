import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { createClient } from '../../lib/supabase-server'

function getAdmin() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json([], { status: 401 })

    const admin = getAdmin()

    const { data: files, error } = await admin.storage
      .from('quotes')
      .list(user.id, { limit: 20, sortBy: { column: 'name', order: 'desc' } })

    if (error || !files?.length) return NextResponse.json([])

    const quotes = await Promise.all(
      files.map(async (file) => {
        try {
          const { data } = await admin.storage
            .from('quotes')
            .download(`${user.id}/${file.name}`)
          const text = await data.text()
          return JSON.parse(text)
        } catch {
          return null
        }
      })
    )

    const valid = quotes
      .filter(Boolean)
      .sort((a, b) => (b.created_at > a.created_at ? 1 : -1))

    return NextResponse.json(valid)
  } catch {
    return NextResponse.json([])
  }
}
