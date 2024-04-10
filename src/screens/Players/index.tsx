import React from "react";
import { useRoute } from "@react-navigation/native";
import { Alert, FlatList } from "react-native";

import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/playerStorageDTO";

import Header from "@components/Header";
import Highlight from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import Input from "@components/Input";
import Filter from "@components/Filter";
import PlayerCard from "@components/PlayerCard";
import ListEmpty from "@components/ListEmpty";
import Button from "@components/Button";
import * as S from "./styles";

type RouteParams = {
  group: string;
};

const Players = () => {
  const [newPlayerName, setNewPLayerName] = React.useState("");
  const [team, setTeam] = React.useState("Time A");
  const [players, setPlayers] = React.useState<PlayerStorageDTO[]>([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar",
      );
    }

    const newPLayer = {
      team,
      name: newPlayerName,
    };

    try {
      await playerAddByGroup(newPLayer, group);
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possível adicionar");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas filtradas do time selecionado",
      );
    }
  }

  React.useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <S.Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <S.Form>
        <Input
          placeholder="Nome da Pessoa"
          autoCorrect={false}
          onChangeText={setNewPLayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </S.Form>

      <S.HeaderList>
        <FlatList
          data={["Time A", "Time B", "Time C"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <S.NumberOfPlayers>{players.length}</S.NumberOfPlayers>
      </S.HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time ?" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover Turma" type="SECUNDARY" />
    </S.Container>
  );
};

export default Players;
