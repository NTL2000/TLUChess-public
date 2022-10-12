import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {Room} from '../../../types/playOnline';
import {ListenerEventType} from '../../../types/firebase';
import board from '../constants/board';

const findExistingRoom = async (roomCode: string): Promise<Room | null> => {
  const room: Room | null = await database()
    .ref(`/rooms/${roomCode}`)
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(error => {
      throw error;
    });

  return room;
};

/**
 * Update data of room.
 *
 * Must be called after check existing room.
 *
 * @param roomCode
 * @returns
 */
const updateRoom = async ({
  roomCode,
  data,
}: {
  roomCode: string;
  data: Partial<Room>;
}): Promise<true> => {
  await database()
    .ref(`/rooms/${roomCode}`)
    .update(data)
    .catch(error => {
      throw error;
    });

  return true;
};

const deleteRoom = async (roomCode: string): Promise<true> => {
  await database()
    .ref(`/rooms/${roomCode}`)
    .set(null)
    .then()
    .catch(error => {
      throw error;
    });

  return true;
};

const roomListener = (params: {
  roomCode: string;
  eventType: ListenerEventType;
  action: (
    snapshot: FirebaseDatabaseTypes.DataSnapshot,
  ) => void | Promise<void>;
}) => {
  const {roomCode, eventType, action} = params;

  const onValueChange = database()
    .ref(`/rooms/${roomCode}`)
    .on(eventType, action);

  return () =>
    database().ref(`/rooms/${roomCode}`).off(eventType, onValueChange);
};

const resetGameInRoom = async ({
  roomDetail,
}: {
  roomDetail: Room;
}): Promise<true | void> => {
  const data = {
    ...roomDetail,
    ...{currentFen: board.defaultFen, latestMove: {init: ''} as any},
  };

  await updateRoom({
    roomCode: roomDetail.roomId,
    data,
  })
    .then(() => {
      return true;
    })
    .catch(error => {
      throw error;
    });
};

export {
  findExistingRoom,
  updateRoom,
  deleteRoom,
  roomListener,
  resetGameInRoom,
};
