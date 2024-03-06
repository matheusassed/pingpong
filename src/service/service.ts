import { createClient } from '@supabase/supabase-js'
import { Jogador } from '../types'
const supabaseUrl:string = import.meta.env.VITE_BASE_URL
const supabaseKey:string = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const listaUsuarios = async () => {
  const { data: players, error } = await supabase
  .from('players')
  .select('name, id')
  if(error){
    throw new Error(`Erro: ${error}`);
  }
  return players
}

export const salvarJogador = async (nome:string) => {
  const { data, error } = await supabase
    .from('players')
    .insert([{ name: nome }])
    .select();
    if(error){
      throw new Error(`Erro: ${error}`);
    }
    return data
}

export const registrarPartida = async (jogador1?:Jogador, jogador2?:Jogador, pontuacaoJogador1?:number, pontuacaoJogador2?:number) => {
  if(!jogador1 || !jogador2 || !pontuacaoJogador1 || !pontuacaoJogador2){
    throw new Error(`Dados não foram informados corretamente`);
  }
  const { data, error } = await supabase
  .from('matches')
  .insert([{ 
    player1_id: jogador1.id,
    player2_id: jogador2.id,
    player1_points: pontuacaoJogador1, 
    player2_points: pontuacaoJogador2, 
  }])
  .select()
  
  if(error){
    throw new Error(`Erro: ${error}`)
  }
  return data
}