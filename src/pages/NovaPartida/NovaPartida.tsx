import { useEffect, useState } from 'react';
import styles from './NovaPartida.module.scss'
import { listaUsuarios } from '../../service/service';
import { Jogador } from '../../types';

const NovaPartida = () => {
  const [listaJogadoresCadastrados, setListaJogadoresCadastrados] = useState<Jogador[]>([])

  const buscaListaDeJogadoresCadastrados = async () => {
    const retorno = await listaUsuarios()
    setListaJogadoresCadastrados(retorno)
  }

  useEffect(() => {
    buscaListaDeJogadoresCadastrados()
  }, [])
  return(
    <section className={ styles.novaPartida }>
      <div className={ styles.nomeJogador }>
        {
          !!listaJogadoresCadastrados && !!listaJogadoresCadastrados.length &&
          <select title="jogador 1">
            {
              listaJogadoresCadastrados.map((jogador:Jogador) => (
                <option value={jogador.id}>{jogador.nome}</option>
              ))
            }
          </select>
        }
      </div>
      
      <div className={ styles.mesa }>
        <div className={ styles.areaJogador }>
          <div className={ styles.areaPontuacao }>
            <span>02</span>
          </div>
          <div className={ styles.controles }>
            <div className={ styles.controle }>+</div>
            <div className={ styles.controle }>-</div>
          </div>
        </div>
        <div className={ styles.areaJogador }>
          <div className={ styles.areaPontuacao }>
            <span>05</span>
          </div>
          <div className={ styles.controles }>
            <div className={ styles.controle }>+</div>
            <div className={ styles.controle }>-</div>
          </div>
        </div>
      </div>

      <div className={ styles.nomeJogador }>
        {
          !!listaJogadoresCadastrados && !!listaJogadoresCadastrados.length &&
          <select title="jogador 1">
            {
              listaJogadoresCadastrados.map((jogador:Jogador) => (
                <option value={jogador.id}>{jogador.nome}</option>
              ))
            }
          </select>
        }
      </div>
    </section>
  );
};

export default NovaPartida;