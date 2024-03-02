import { useEffect, useState } from 'react'
import styles from './NovaPartida.module.scss'
import { listaUsuarios, registrarPartida } from '../../service/service'
import { Jogador, Opcao } from '../../types'
import Select from './components/Select'

const NovaPartida = () => {
  const [listaJogadoresCadastrados, setListaJogadoresCadastrados] = useState<Opcao[] | undefined>()
  const [jogador1, setJogador1] = useState<Jogador>()
  const [jogador2, setJogador2] = useState<Jogador>()
  const [pontuacaoJogador1, setPontuacaoJogador1] = useState<number>(0)
  const [pontuacaoJogador2, setPontuacaoJogador2] = useState<number>(0)

  const buscaListaDeJogadoresCadastrados = async () => {
    const retorno = await listaUsuarios()
    const retornoAjustadoParaSelect:Opcao[] | undefined = retorno?.map((jogador:Jogador) => ({
      label: jogador.name,
      value: jogador.name.toLowerCase().replace(/\W/g, '')
    }))
    setListaJogadoresCadastrados(retornoAjustadoParaSelect)
  }

  const salvarResultado = async () => {
    const retorno = await registrarPartida(jogador1, jogador2, pontuacaoJogador1, pontuacaoJogador2)
    console.log(retorno)
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
            lista={listaJogadoresCadastrados}
            setLista={((a:Opcao[])=>setListaJogadoresCadastrados(a))}
            valor={jogador1}
            atualizaValor={(a:Jogador) => setJogador1(a)}
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
              +
            </div>
            <div 
              className={ styles.controle }
              onClick={() => pontuacaoJogador1 > 0 ? setPontuacaoJogador1(pontuacaoJogador1-1) : setPontuacaoJogador1(0)}
            >
              -
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
              +
            </div>
            <div 
              className={ styles.controle }
              onClick={() => pontuacaoJogador2 > 0 ? setPontuacaoJogador2(pontuacaoJogador2-1) : setPontuacaoJogador2(0)}
            >
              -
            </div>
          </div>
        </div>
      </div>

      <div className={ styles.nomeJogador }>
        {
          !!listaJogadoresCadastrados && !!listaJogadoresCadastrados.length &&
          <Select 
            lista={listaJogadoresCadastrados}
            setLista={((a:Opcao[])=>setListaJogadoresCadastrados(a))}
            valor={jogador2}
            atualizaValor={(a:Jogador) => setJogador2(a)}
          />
        }
      </div>
    </section>
  );
};

export default NovaPartida;