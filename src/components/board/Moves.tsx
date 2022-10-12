import {Move, ShortMove} from 'chess.js';
import {TouchableWithoutFeedback, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

type PropsOfMovesComponent = {
  reverse?: boolean;
  visibleMoves: Move[];
  size: number;
  onSelectMove: <T extends ShortMove>(move: T) => void | Promise<void>;
};

const Moves: React.FC<PropsOfMovesComponent> = (
  params: PropsOfMovesComponent,
) => {
  const {reverse, visibleMoves, size, onSelectMove} = params;
  const cellSize = size / 8;

  const moves = visibleMoves.map(move => {
    const {to, captured} = move;
    const [file, rank] = to.split('');
    const left =
      reverse === true
        ? ('h'.charCodeAt(0) - file.charCodeAt(0)) * cellSize
        : (file.charCodeAt(0) - 'a'.charCodeAt(0)) * cellSize;
    const bottom =
      reverse === true
        ? (8 - Number(rank)) * cellSize
        : (Number(rank) - 1) * cellSize;

    return (
      <TouchableWithoutFeedback
        onPressOut={async () => {
          await onSelectMove(move);
        }}
        key={`move-${to}`}>
        <View
          style={{
            position: 'absolute',
            width: size / 8,
            height: size / 8,
            left,
            bottom,
          }}>
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r={captured ? '40' : '20'}
              fill={captured ? 'none' : 'black'}
              fillOpacity={captured ? undefined : '0.2'}
              stroke={captured ? 'black' : undefined}
              strokeOpacity={captured ? '0.2' : undefined}
              strokeWidth={captured ? '10' : undefined}
            />
          </Svg>
        </View>
      </TouchableWithoutFeedback>
    );
  });

  return <View>{moves}</View>;
};

export default Moves;
