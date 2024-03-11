import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import styles from './Historico.module.scss'
import { getMatches } from '../../service/service'
import { Match } from '../../types'
import HistoricMatch from '../../components/HistoricMatch/HistoricMatch'

const Historico = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [matches, setMatches] = useState<Match[]>([])
  
  
  const searchMatches = async () => {
    const matchesFromDB:Match[] = await getMatches()
    setMatches(matchesFromDB)
  }

  useEffect(() => {
    if(!!matches && !!matches.length)
      setLoading(false)
  },[matches])

  useEffect(() => {
    searchMatches()
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
            <HistoricMatch matchData={singleMatch}/>
          ))
        }
      </section>
    }
    </>
  )
}

export default Historico