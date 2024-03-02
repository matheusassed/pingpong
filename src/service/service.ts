import { createClient } from '@supabase/supabase-js'
import { Jogador } from '../types'
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

export const registrarPartida = async (jogador1?:Jogador, jogador2?:Jogador, pontuacaoJogador1?:number, pontuacaoJogador2?:number) => {
  return {
    id1: jogador1,
    id2: jogador2,
    pontuacao1: pontuacaoJogador1,
    pontuacao2: pontuacaoJogador2,
    data: new Date()
  }
}