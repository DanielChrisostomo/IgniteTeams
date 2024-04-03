import React from "react";
import * as S from "./styles";
import Header from "@components/Header";
import Highlight from "@components/Highlight";

const Groups = () => {
  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
    </S.Container>
  );
};

export default Groups;
