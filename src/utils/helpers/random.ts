const randomRoomCode = (): string => {
  return (+new Date()).toString(36);
};

export {randomRoomCode};
