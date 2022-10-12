import {Room} from '../playOnline';

/**
 * List screens.
 * Use to create navigator.
 */
type RootStackParamList = {
  Home: undefined;
  PlayOnline: {
    roomDetail: Room;
    isOwner?: boolean;
  };
  Login: undefined;
  PlayPractice: undefined;
  PlayOnlineOption: undefined;
};

export type {RootStackParamList};
