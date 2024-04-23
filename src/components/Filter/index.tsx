import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type Props = TouchableOpacityProps &
  S.FilterStyleProps & {
    title: string;
  };

const Filter = ({ title, isActive = false, ...rest }: Props) => {
  return (
    <S.Container isActive={isActive} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default Filter;
