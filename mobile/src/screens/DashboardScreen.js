import React from "react";
import { Button } from "react-native";
import { supabase } from "../../lib/supabase";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #121212;
  align-items: center;
  justify-content: center;
`;

const WelcomeText = styled.Text`
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
`;

export default function DashboardScreen() {
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <Container>
      <WelcomeText>Bem-vindo ao SplitCredit!</WelcomeText>
      <Button title="Sair" onPress={handleLogout} color="#00D1FF" />
    </Container>
  );
}
