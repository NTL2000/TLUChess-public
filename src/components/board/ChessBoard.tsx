import {ChessInstance, Move, ShortMove, Square} from 'chess.js';
import React, {useEffect, useState} from 'react';
import {
  useWindowDimensions,
  View,
  StyleSheet,
  ActivityIndicator,
  Clipboard,
} from 'react-native';
import {GameStatus} from '../../../types/chess';
import useChess from '../../hooks/useChess';
import simpleChessAi from '../../lib/simple_chess_ai';
import {
  colors,
  simpleAi as simpleAiConstants,
  board,
} from '../../utils/constants';
import {computeGameStatus} from '../../utils/helpers/chess';
import nonNull from '../../utils/optimusCore/nonNull';
import {UIButton, UIModal} from '../commom';
import UISelectDropdown from '../commom/UISelectDropDown';
import {useGameStatus} from './boardContext';
import EmptyBoard from './EmptyBoard';
import Moves from './Moves';
import Pieces from './Pieces';

type PropsOfChessBoardComponent = {
  reverse?: boolean;
  playWithSimpleAi?: boolean;
  playOnline?: {
    color: 'w' | 'b';
    currentFen: string;
    roomCode: string;
    onMove: (params: {fen: string; movesHistory: Move[]}) => Promise<void>;
    opponentListener: (
      chess: ChessInstance,
      refreshAction: () => void,
    ) => () => void;
  };
};

const ChessBoard: React.FC<PropsOfChessBoardComponent> = (
  params: PropsOfChessBoardComponent,
) => {
  const {playWithSimpleAi, playOnline} = params;
  const [reverse, setReverse] = useState(params.reverse === true);
  const {width} = useWindowDimensions();
  const chess = useChess(playOnline?.currentFen);
  const [visibleMoves, setVisibleMoves] = useState<Move[]>([]);
  const boardSize = Math.min(width, 400);
  const [visibleEndGameModal, setVisibleEndGameModal] = useState(false);
  const [modalText, setModalText] = useState<string>();
  const {levelOptions, defaultLevel} = simpleAiConstants;
  const [simpleAiDepth, setSimpleAiDepth] = useState<number>(defaultLevel);
  const [isAiComputing, setIsAiComputing] = useState<boolean>(false);
  const {gameStatus, setGameStatus} = useGameStatus();

  let listener: () => void = () => {};

  // Same as componentDidUpdate.
  useEffect(() => {
    if (playWithSimpleAi === true) {
      // Run ai asynchronously.
      setTimeout(() => {
        if (
          (chess.turn() === 'b' && reverse === false) ||
          (chess.turn() === 'w' && reverse === true)
        ) {
          setIsAiComputing(true);
        } else {
          setIsAiComputing(false);
        }

        simpleChessAi.simpleAi({
          depth: simpleAiDepth,
          chess,
          reverse,
          setVisibleMoves,
        });
      });

      if (chess.game_over()) {
        if (
          (chess.turn() === 'b' && reverse === false) ||
          (chess.turn() === 'w' && reverse === true)
        ) {
          setModalText('Thắng cuộc!');
        } else {
          setModalText('Thua cuộc!');
        }

        setVisibleEndGameModal(true);
      }
    }

    if (playOnline) {
      nonNull(setGameStatus)(
        computeGameStatus({chess, currentColor: playOnline.color}),
      );

      if (
        (chess.turn() === 'w' && reverse === false) ||
        (chess.turn() === 'b' && reverse === true)
      ) {
        listener();
      } else {
        listener = playOnline.opponentListener(chess, () => {
          setVisibleMoves([]);
        });
      }
    }
  });

  useEffect(() => {
    if (playOnline) {
      if (gameStatus === GameStatus.resetting) {
        listener();

        resetGame();

        nonNull(setGameStatus)(GameStatus.playing);
      }
    }
  }, [gameStatus]);

  const handleSelectPiece = (square: Square) => {
    if (
      playWithSimpleAi ||
      (playOnline != null && chess.turn() === playOnline.color)
    ) {
      const moves: Move[] = chess.moves({square: square, verbose: true});
      setVisibleMoves(moves);
    }
  };

  const handleSelectMove = async <T extends ShortMove>(move: T) => {
    /**
     * After the pawn has reached the bottom of the chessboard.
     * => Always promote to queen.
     */
    chess.move(move.promotion ? {...move, promotion: 'q'} : move);

    if (playOnline != null) {
      await playOnline
        .onMove({
          fen: chess.fen(),
          movesHistory: chess.history({verbose: true}),
        })
        .then(() => {
          setVisibleMoves([]);
        })
        .catch(error => {
          throw error;
        });
    } else {
      setVisibleMoves([]);
    }
  };

  const resetGame: () => void = () => {
    chess.reset();
    setVisibleMoves([]);
  };

  const closeModalEndGame = () => {
    resetGame();
    setVisibleEndGameModal(false);
  };

  const setLevelSimpleAi = (_: any, index: number) => {
    _;
    setSimpleAiDepth(index + 2);
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

  return (
    <View>
      <UIModal
        onPressSubmitModal={closeModalEndGame}
        modalText={modalText}
        submitText={'Đồng ý'}
        modalVisible={visibleEndGameModal}
      />
      <View style={styles.toolBar}>
        <View>
          {playWithSimpleAi && !isAiComputing && chess.history().length > 0 && (
            <UIButton
              title="Chơi lại"
              style={styles.resetButton}
              iconName="refresh"
              onPress={resetGame}
            />
          )}
          {playOnline && (
            <UIButton
              title={playOnline.roomCode}
              style={styles.resetButton}
              iconName="copy"
              onPress={() => copyToClipboard(playOnline.roomCode)}
            />
          )}
          {isAiComputing && !chess.game_over() && (
            <ActivityIndicator
              style={styles.computingIndicator}
              size={60}
              color={colors.pink}
            />
          )}
          {playWithSimpleAi === true &&
            reverse === false &&
            chess.history().length === 0 && (
              <UISelectDropdown
                data={Object.values(levelOptions)}
                defaultValue={Object.values(levelOptions)[simpleAiDepth - 2]}
                onSelect={setLevelSimpleAi}
              />
            )}
        </View>
        <UIButton
          style={styles.turn}
          iconName="circle"
          disabled={true}
          iconColor={chess.turn() === 'b' ? colors.black : colors.white}
        />
      </View>
      <View>
        <EmptyBoard reverse={reverse} size={boardSize} />
        <Pieces
          reverse={reverse}
          chess={chess}
          board={chess.board()}
          onSelectPiece={handleSelectPiece}
          size={boardSize}
        />
        <Moves
          reverse={reverse}
          visibleMoves={visibleMoves}
          onSelectMove={handleSelectMove}
          size={boardSize}
        />
      </View>
      {playWithSimpleAi && (
        <View>
          <UISelectDropdown
            data={Object.values(board.pieceColor)}
            defaultValue={Object.values(board.pieceColor)[0]}
            onSelect={(_: any, index: number) => {
              setReverse(index === 1);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toolBar: {
    flexDirection: 'row-reverse',
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resetButton: {
    width: 150,
  },
  turn: {
    width: 40,
    backgroundColor: colors.lightTeal,
  },
  computingIndicator: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  copyRoomCodeButton: {
    width: 150,
  },
});

export default ChessBoard;
