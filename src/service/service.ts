/* eslint-disable @typescript-eslint/no-explicit-any */
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
  if(jogador1 && jogador2 && (pontuacaoJogador1 || pontuacaoJogador2)){
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
  throw new Error(`Dados não foram informados corretamente`);
}

export const getMatches = async (inicio:number, fim:number) => {
  const { data: matches, error } = await supabase
    .from('matches')
    .select(`*`)
    .order('id', {ascending:false})
    .range(inicio, fim)
  
  if(error)
    throw new Error(`Erro: ${error}`)

  const players = await listaUsuarios()

  const matchesWithPlayersName = matches.map((match:any) => {
    const player1Name = players.filter((player:any) => player.id === match.player1_id)
    const player2Name = players.filter((player:any) => player.id === match.player2_id)
    return {
      id: match.id,
      player1_id: match.player1_id,
      player1_points: match.player1_points,
      player1_name: player1Name[0].name,
      player2_id: match.player2_id,
      player2_points: match.player2_points,
      player2_name: player2Name[0].name,
      data: new Date(match.data).toLocaleDateString('pt-BR')
    }
  })

  return matchesWithPlayersName
}