import React, {Fragment, useEffect, useState} from 'react';

import {ChessBoard} from '../components/board';
import {Frame, UIButton, UIModal} from '../components/commom';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {colors} from '../utils/constants';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {loginRequiredListener} from '../utils/helpers/listener';
import {
  deleteRoom,
  resetGameInRoom,
  roomListener,
  updateRoom,
} from '../utils/helpers/playOnline';
import auth from '@react-native-firebase/auth';
import nonNull from '../utils/optimusCore/nonNull';
import {ABC} from '../utils/helpers/nativeModule';
import useChess from '../hooks/useChess';
import {ChessInstance, Move} from 'chess.js';
import {ListenerEventType} from '../../types/firebase';
import {useGameStatus} from '../components/board/boardContext';
import {GameStatus} from '../../types/chess';

type PlayOnlineScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PlayOnline'
>;

const PlayOnline: React.FC<PlayOnlineScreenProps> = ({route, navigation}) => {
  const {isOwner} = route.params;
  let {roomDetail} = route.params;
  const uid = nonNull(auth().currentUser).uid;
  const chess = useChess();
  chess.load(roomDetail.currentFen);

  const {gameStatus, setGameStatus} = useGameStatus();
  const [modalText, setModalText] = useState<string>();
  const [visibleEndGameModal, setVisibleEndGameModal] =
    useState<boolean>(false);

  if (uid === roomDetail.roomOwner && isOwner === true) {
    ABC.setOnDestroy(async () => {
      await deleteRoom(roomDetail.roomId);
    });
  }

  useEffect(() => {
    loginRequiredListener(navigation);

    // return () => {
    //   if (uid === roomDetail.roomOwner && isOwner === true) {
    //     deleteRoom(roomDetail.roomId);
    //   }
    // };
  });

  useEffect(() => {
    if (gameStatus === GameStatus.lost || gameStatus === GameStatus.win) {
      if (gameStatus === GameStatus.win) {
        setModalText('Thắng cuộc!. Bạn muốn chơi tiếp không?');
      }

      if (gameStatus === GameStatus.lost) {
        setModalText('Thua cuộc!. Bạn muốn chơi tiếp không?');
      }

      setVisibleEndGameModal(true);
    }
  }, [gameStatus]);

  const onMove = async (params: {fen: string; movesHistory: Move[]}) => {
    const {fen, movesHistory} = params;

    roomDetail = {
      ...roomDetail,
      ...{
        currentFen: fen,
        latestMove: movesHistory[movesHistory.length - 1],
      },
    };

    await updateRoom({
      roomCode: roomDetail.roomId,
      data: roomDetail,
    });
  };

  const opponentListener = (
    currentChess: ChessInstance,
    refreshAction: () => void,
  ) =>
    roomListener({
      roomCode: roomDetail.roomId,
      eventType: ListenerEventType.childChanged,
      action: snapshot => {
        const changedValue = snapshot.val()?.latestMove ?? snapshot.val();

        if (typeof changedValue === 'object') {
          currentChess.move(changedValue);
          refreshAction();

          return;
        }
      },
    });

  const goBack = async () => {
    if (uid === roomDetail.roomOwner && isOwner === true) {
      await deleteRoom(roomDetail.roomId);
    }

    navigation.goBack();
  };

  const resetGame = async () => {
    if (isOwner === true) {
      await resetGameInRoom({roomDetail})
        .then(() => {
          nonNull(setGameStatus)(GameStatus.resetting);

          setVisibleEndGameModal(false);
        })
        .catch(error => {
          throw error;
        });
    } else {
      nonNull(setGameStatus)(GameStatus.resetting);

      setVisibleEndGameModal(false);
    }
  };

  return (
    <Frame>
      <UIModal
        modalVisible={visibleEndGameModal}
        child={
          <Fragment>
            <Text style={styles.modalText}>{modalText}</Text>
            <View style={styles.modalButtonsContainer}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.modalButton}>
                <Text style={styles.textStyle}>{'Thoát'}</Text>
              </Pressable>
              <Pressable onPress={resetGame} style={styles.modalButton}>
                <Text style={styles.textStyle}>{'Đồng ý'}</Text>
              </Pressable>
            </View>
          </Fragment>
        }
      />
      <View>
        <UIButton
          title="Trở về"
          iconName="step-backward"
          iconColor={colors.primary}
          textColor={colors.primary}
          backgroundColor={colors.transparent}
          onPress={goBack}
          style={{width: 100}}
        />
        <ChessBoard
          reverse={!isOwner}
          playOnline={{
            color: isOwner ? 'w' : 'b',
            currentFen: roomDetail.currentFen,
            roomCode: roomDetail.roomId,
            onMove,
            opponentListener,
          }}
        />
      </View>
    </Frame>
  );
};

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.primary,
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalButtonsContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default PlayOnline;
