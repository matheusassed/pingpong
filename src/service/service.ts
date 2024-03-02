import { createClient } from '@supabase/supabase-js'
const supabaseUrl:string = import.meta.env.VITE_BASE_URL
const supabaseKey:string = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const listaUsuarios = async () => {
  const { data: players, error } = await supabase
  .from('players')
  .select('name')

  console.log(error)
  return players
}

export const salvarJogador = async (nome:string) => {
  const { data, error } = await supabase
    .from('players')
    .insert([{ name: nome }])
    .select();
  console.log(data)
  console.log(error)
}