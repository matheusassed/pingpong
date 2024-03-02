import { createClient } from '@supabase/supabase-js'
const supabaseUrl:string = import.meta.env.VITE_BASE_URL
const supabaseKey:string = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const listaUsuarios = async () => {
  return [
    {
      id: 1,
      nome: 'matheus'
    },
    {
      id: 2,
      nome: 'diogo'
    },
    {
      id: 3,
      nome: 'alex'
    }
  ]
}

export const salvarJogador = async (nome:string) => {
  const { data, error } = await supabase
    .from('players')
    .insert([{ name: nome }])
    .select();
  console.log(data)
  console.log(error)
}