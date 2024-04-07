import React from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "@components/Header";
import * as S from "./styles";
import Highlight from "@components/Highlight";
import Button from "@components/Button";
import Input from "@components/Input";

const NewGroup = () => {
  const [group, setGroup] = React.useState("");
  const navigate = useNavigation();

  function handleNew() {
    navigate.navigate("players", { group });
  }

  return (
    <S.Container>
      <Header showBackButton />
      <S.Content>
        <S.Icon />
        <Highlight
          title="Nova Turma"
          subtitle="Crie a turma para a adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </S.Content>
    </S.Container>
  );
};

export default NewGroup;
