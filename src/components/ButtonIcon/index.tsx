import { TouchableHighlightProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as S from "./style";

type Props = TouchableHighlightProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: S.ButtonIconTypeStyleProps;
};

const ButtonIcon = ({ icon, type = "PRIMARY", ...rest }: Props) => {
  return (
    <S.Container>
      <S.Icon name={icon} type={type} />
    </S.Container>
  );
};

export default ButtonIcon;
