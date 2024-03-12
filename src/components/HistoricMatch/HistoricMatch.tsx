import { ImCross } from "react-icons/im"
import { Match } from "../../types"
import styles from './HistoricMatch.module.scss'

interface Props{
  matchData: Match
}

const HistoricMatch = (props:Props) => {
  const { matchData } = props

  return(
    <div className={ styles.container }>
      <div className={ styles.playerData }>
        <span className={ styles.name }>{matchData.player1_name}</span>
        <span className={ styles.points }>{matchData.player1_points}</span>
      </div>
      
      <div className={ styles.dateContainer }>
        <span className={ styles.date }>{new Date(matchData.data).toLocaleDateString('pt-BR')}</span>
        <ImCross size='2em' color="#ff8114" />
      </div>
      
      <div className={ styles.playerData }>
        <span className={ styles.name }>{matchData.player2_name}</span>
        <span className={ styles.points }>{matchData.player2_points}</span>
      </div>
    </div>
  )
}

export default HistoricMatch