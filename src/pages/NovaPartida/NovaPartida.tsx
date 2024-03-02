import styles from './NovaPartida.module.scss'

const NovaPartida = () => {
  return(
    <section className={ styles.novaPartida }>
      <div className={ styles.nomeJogador }><h3>Nome do jogador 1</h3></div>
      
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

      <div className={ styles.nomeJogador }><h3>Nome do jogador 2</h3></div>
    </section>
  );
};

export default NovaPartida;