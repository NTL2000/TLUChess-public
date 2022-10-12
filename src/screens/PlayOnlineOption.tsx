import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {Fragment, useEffect} from 'react';
import {useState} from 'react';
import {Alert, TextInput, View} from 'react-native';
import {RootStackParamList} from '../../types/navigation';
import {Frame, UIButton, UIModal} from '../components/commom';
import {board, colors} from '../utils/constants';
import {loginRequiredListener} from '../utils/helpers/listener';
import {randomRoomCode} from '../utils/helpers/random';
import database from '@react-native-firebase/database';
import {Room} from '../../types/playOnline';
import auth from '@react-native-firebase/auth';
import nonNull from '../utils/optimusCore/nonNull';
import {findExistingRoom, updateRoom} from '../utils/helpers/playOnline';

type PlayOnlineScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PlayOnlineOption'
>;

const PlayOnlineOption: React.FC<PlayOnlineScreenProps> = ({navigation}) => {
  const [visibleRoomModal, setVisibleRoomModal] = useState<boolean>(false);
  const [roomCodeInput, setRoomCodeInput] = useState<string>('');
  const uid = nonNull(auth().currentUser).uid;

  useEffect(() => {
    loginRequiredListener(navigation);
  });

  const closeRoomModal = () => {
    setVisibleRoomModal(!visibleRoomModal);
  };

  const createNewGame = async () => {
    const newRoomCode: string = randomRoomCode();
    const newReference = database().ref(`/rooms/${newRoomCode}`);
    const roomDetail: Room = {
      roomId: newRoomCode,
      currentFen: board.defaultFen,
      latestMove: {init: ''} as any,
      roomOwner: uid,
    };

    await newReference
      .set(roomDetail)
      .then(() => {
        navigation.navigate('PlayOnline', {roomDetail, isOwner: true});
      })
      .catch(error => {
        throw error;
      });
  };

  const joinExistingGame = async () => {
    if (roomCodeInput === '') {
      Alert.alert('Vui lòng nhập mã phòng!');
      return;
    }

    const existingRoom = await findExistingRoom(roomCodeInput);
    if (existingRoom == null) {
      Alert.alert('Mã phòng không tồn tại!');
      return;
    }

    if (existingRoom.opponent !== uid) {
      await updateRoom({
        roomCode: roomCodeInput,
        data: {opponent: uid},
      })
        .then(() => {
          existingRoom.opponent = uid;
        })
        .catch(error => {
          throw error;
        });
    }

    setVisibleRoomModal(false);

    navigation.navigate('PlayOnline', {roomDetail: existingRoom});

    return;
  };

  return (
    <Frame>
      <UIModal
        modalVisible={visibleRoomModal}
        closeIconVisible={true}
        onPressHideModal={closeRoomModal}
        child={
          <Fragment>
            <TextInput
              onChangeText={text => setRoomCodeInput(text.toLowerCase())}
              style={{
                color: 'black',
                borderWidth: 1,
                borderColor: colors.placeholder,
                borderRadius: 10,
                width: 200,
                marginTop: 15,
              }}
              placeholder="Nhập mã phòng."
              placeholderTextColor={colors.placeholder}
            />
            <UIButton title="Vào phòng" onPress={joinExistingGame} />
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
          onPress={() => navigation.goBack()}
          style={{width: 100}}
        />
        <UIButton title="Tạo phòng mới" onPress={createNewGame} />
        <UIButton title="Vào phòng" onPress={() => setVisibleRoomModal(true)} />
      </View>
    </Frame>
  );
};

export default PlayOnlineOption;
