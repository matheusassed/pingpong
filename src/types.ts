export interface Jogador{
  id: number;
  name: string;
}

export interface Opcao {
  label: string;
  value: string;
}

export interface Match{
  id: number;
  player1_id: number;
  player2_id: number;
  player1_points: number;
  player2_points: number;
  player1_name: string;
  player2_name: string;
  data: string;
}