import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import {GameStatus} from '../../../types/chess';

interface GameStatusContextType {
  gameStatus: GameStatus;
  setGameStatus?: Dispatch<React.SetStateAction<GameStatus>>;
}

const GameStatusContext = createContext<GameStatusContextType>({
  gameStatus: GameStatus.playing,
});

/**
 * Share game status between components.
 */
function useGameStatus(): GameStatusContextType {
  return useContext(GameStatusContext);
}

const GameStatusProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.playing);

  return (
    <GameStatusContext.Provider value={{gameStatus, setGameStatus}}>
      {children}
    </GameStatusContext.Provider>
  );
};

export {GameStatusProvider, useGameStatus};
