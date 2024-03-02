import { useEffect, useState } from 'react'
import styles from './NovaPartida.module.scss'
import { listaUsuarios } from '../../service/service'
import { Jogador, Opcao } from '../../types'
import Select from './components/Select'

const NovaPartida = () => {
  const [listaJogadoresCadastrados, setListaJogadoresCadastrados] = useState<Opcao[] | undefined>()
  const [jogador1, setJogador1] = useState<Jogador>()
  const [jogador2, setJogador2] = useState<Jogador>()

  const buscaListaDeJogadoresCadastrados = async () => {
    const retorno = await listaUsuarios()
    const retornoAjustadoParaSelect:Opcao[] | undefined = retorno?.map((jogador:Jogador) => ({
      label: jogador.name,
      value: jogador.name.toLowerCase().replace(/\W/g, '')
    }))
    setListaJogadoresCadastrados(retornoAjustadoParaSelect)
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