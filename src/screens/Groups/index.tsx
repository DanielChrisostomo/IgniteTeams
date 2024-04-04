import React from "react";
import { FlatList } from "react-native";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import GroupCard from "@components/GroupCard";
import ListEmpty from "@components/ListEmpty";
import * as S from "./styles";
import Button from "@components/Button";

const Groups = () => {
  const [groups, setGroups] = React.useState<string[]>([]);

  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma ?" />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button title="Criar nova turma" />
    </S.Container>
  );
};

export default Groups;
