import { Link } from "react-router-dom";
import styles from './Home.module.scss'

const Home = () => {
  return(
    <nav className={ styles.navegacao }>
      <Link className={ styles.link } to='nova-partida'>Nova partida</Link>
      <Link className={ styles.link } to='historico'>Histórico de partidas</Link>
      <Link className={ styles.link } to='estatisticas'>Estatísticas</Link>
    </nav>
  );
};

export default Home;