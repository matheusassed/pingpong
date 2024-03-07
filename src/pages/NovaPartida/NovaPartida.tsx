import { useEffect, useState } from 'react'
import styles from './NovaPartida.module.scss'
import { listaUsuarios, registrarPartida } from '../../service/service'
import { Jogador } from '../../types'
import Select from '../../components/Select'
import { FaMinus, FaPlus } from "react-icons/fa";

const NovaPartida = () => {
  const [listaJogadoresCadastrados, setListaJogadoresCadastrados] = useState<Jogador[]>()
  const [jogador1, setJogador1] = useState<Jogador>()
  const [jogador2, setJogador2] = useState<Jogador>()
  const [pontuacaoJogador1, setPontuacaoJogador1] = useState<number>(0)
  const [pontuacaoJogador2, setPontuacaoJogador2] = useState<number>(0)

  const buscaListaDeJogadoresCadastrados = async () => {
    const retorno:Jogador[] = await listaUsuarios()
    setListaJogadoresCadastrados(retorno)
  }

  const reset = () => {
    setPontuacaoJogador1(0)
    setPontuacaoJogador2(0)
    setJogador1(undefined)
    setJogador2(undefined)
  }

  const salvarResultado = async () => {
    if(jogador1 && jogador2 && (pontuacaoJogador1 || pontuacaoJogador2)){
      const retorno = await registrarPartida(jogador1, jogador2, pontuacaoJogador1, pontuacaoJogador2)
      console.log(`Partida salva: ${retorno}`)
    }
    reset()
  }

  useEffect(() => {
    buscaListaDeJogadoresCadastrados()
  }, [])

  return(
    <section className={ styles.novaPartida }>
      <div className={ styles.nomeJogador }>
        {
          !!listaJogadoresCadastrados && !!listaJogadoresCadastrados.length &&
          <Select 
            listaJogadoresCadastrados={listaJogadoresCadastrados}
            setListaJogadoresCadastrados={((a:Jogador[]) => setListaJogadoresCadastrados(a))}
            valor={jogador1}
            setJogador={(a:Jogador) => setJogador1(a)}
          />
        } 
      </div>
      
      <div className={ styles.mesa }>
        <div className={ styles.areaJogador }>
          <div className={ styles.areaPontuacao }>
            <span>{pontuacaoJogador1}</span>
          </div>
          <div className={ styles.controles }>
            <div 
              className={ styles.controle }
              onClick={() => setPontuacaoJogador1(pontuacaoJogador1+1)}
            >
              <FaPlus color='#F2EFEB' size='2em' />
            </div>
            <div 
              className={ styles.controle }
              onClick={() => pontuacaoJogador1 > 0 ? setPontuacaoJogador1(pontuacaoJogador1-1) : setPontuacaoJogador1(0)}
            >
              <FaMinus color='#F2A391' size='2em' />
            </div>
          </div>
        </div>

        <div 
          className={ styles.enviar }
          onClick={() => salvarResultado()}
        >
          Salvar
        </div>
        
        <div className={ styles.areaJogador }>
          <div className={ styles.areaPontuacao }>
            <span>{pontuacaoJogador2}</span>
          </div>
          <div className={ styles.controles }>
            <div 
              className={ styles.controle }
              onClick={() => setPontuacaoJogador2(pontuacaoJogador2+1)}
            >
              <FaPlus color='#F2EFEB' size='2em' />
            </div>
            <div 
              className={ styles.controle }
              onClick={() => pontuacaoJogador2 > 0 ? setPontuacaoJogador2(pontuacaoJogador2-1) : setPontuacaoJogador2(0)}
            >
              <FaMinus color='#F2A391' size='2em' />
            </div>
          </div>
        </div>
      </div>

      <div className={ styles.nomeJogador }>
        {
          !!listaJogadoresCadastrados && !!listaJogadoresCadastrados.length &&
          <Select 
            listaJogadoresCadastrados={listaJogadoresCadastrados}
            setListaJogadoresCadastrados={((a:Jogador[])=>setListaJogadoresCadastrados(a))}
            valor={jogador2}
            setJogador={(a:Jogador) => setJogador2(a)}
          />
        }
      </div>
    </section>
  );
};

export default NovaPartida;