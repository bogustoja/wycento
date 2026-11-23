'use server'

import { createClient } from '../lib/supabase-server'
import { runWycena } from '../lib/wycenaCore'

export async function wyceńRemont(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Musisz być zalogowany' }

  return runWycena(supabase, user, {
    miasto: formData.get('miasto'),
    pomieszczenie: formData.get('pomieszczenie'),
    opis: formData.get('opis'),
    image: formData.get('image'),
  })
}
