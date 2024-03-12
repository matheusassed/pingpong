import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import styles from './Historico.module.scss'
import { getMatches } from '../../service/service'
import { Match } from '../../types'
import HistoricMatch from '../../components/HistoricMatch/HistoricMatch'

const Historico = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [matches, setMatches] = useState<Match[]>([])
  let pagina = 1
  const tamanhoPagina:number = 5

  const searchMatches = async () => {
    const matchesFromDB:Match[] = await getMatches((tamanhoPagina*pagina)-tamanhoPagina, (tamanhoPagina*pagina)-1)
    setMatches((prev:Match[] | undefined) => !!prev && !!prev.length ? [...prev, ...matchesFromDB] : matchesFromDB)
  }

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
    if (bottom) {
      pagina++
      searchMatches()
    }
  };

  useEffect(() => {
    if(!!matches && !!matches.length){
      setLoading(false)
    } else {
      searchMatches()
    }
  },[matches])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[])

  return (
    <>
    {
      loading ? 
      <Loading />
      :
      <section className={ styles.historico }>
        {
          matches.map((singleMatch:Match) => (
            <HistoricMatch matchData={singleMatch} />
          ))
        }
      </section>
    }
    </>
  )
}

export default Historico