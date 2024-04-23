import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

const GroupCard = ({ title, ...rest }: Props) => {
  return (
    <S.Container {...rest}>
      <S.Icon></S.Icon>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default GroupCard;
