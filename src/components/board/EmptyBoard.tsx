import {View, Text} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {board, colors} from '../../utils/constants';

type PropsOfEmptyBoardComponent = {
  reverse?: boolean;
  size: number;
};

const EmptyBoard: React.FC<PropsOfEmptyBoardComponent> = (
  params: PropsOfEmptyBoardComponent,
) => {
  const {reverse, size} = params;
  const {boardSize} = board;
  const {lightGreen, boldGreen} = colors;

  return (
    <View
      style={{
        width: size,
        height: size,
      }}>
      <FlatGrid
        staticDimension={size}
        itemDimension={size / boardSize}
        fixed
        spacing={0}
        data={[...Array(boardSize * boardSize).keys()]}
        renderItem={({item: index}) => {
          const row = Math.floor(index / boardSize);
          const col = index % boardSize;
          const [columnIndex, rowIndex] =
            reverse === true
              ? [String.fromCharCode('h'.charCodeAt(0) - col), row + 1]
              : [String.fromCharCode('a'.charCodeAt(0) + col), 8 - row];
          const [squareColor, indexColor] =
            reverse === true
              ? (row + col) % 2 === 1
                ? [boldGreen, lightGreen]
                : [lightGreen, boldGreen]
              : (row + col) % 2 === 0
              ? [lightGreen, boldGreen]
              : [boldGreen, lightGreen];

          return (
            <View
              key={index.toString()}
              style={{
                width: size / boardSize,
                height: size / boardSize,
                backgroundColor: squareColor,
              }}>
              <Text
                style={{
                  color: indexColor,
                  fontWeight: '600',
                  opacity: col === 0 ? 1 : 0,
                }}>
                {rowIndex}
              </Text>
              <Text
                style={{
                  color: indexColor,
                  fontWeight: '600',
                  opacity: row === 7 ? 1 : 0,
                  alignSelf: 'flex-end',
                }}>
                {columnIndex}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default EmptyBoard;
