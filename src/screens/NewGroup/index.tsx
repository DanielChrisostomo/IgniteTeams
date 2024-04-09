import React from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "@components/Header";
import * as S from "./styles";
import Highlight from "@components/Highlight";
import Button from "@components/Button";
import Input from "@components/Input";
import { groupCreate } from "@storage/groups/groupCreate";
import { Alert } from "react-native";
import { appError } from "@utils/AppError";

const NewGroup = () => {
  const [group, setGroup] = React.useState("");
  const navigate = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma");
      }
      await groupCreate(group);
      navigate.navigate("players", { group });
    } catch (error) {
      if (error instanceof appError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo");
        console.log(error);
      }
    }
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
