import React from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/groups/groupGetAll";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import GroupCard from "@components/GroupCard";
import ListEmpty from "@components/ListEmpty";
import Button from "@components/Button";
import * as S from "./styles";

const Groups = () => {
  const [groups, setGroups] = React.useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchGroups();
    }, []),
  );

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

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </S.Container>
  );
};

export default Groups;
