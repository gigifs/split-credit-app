import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

// Estilos
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
`;

const BackButton = styled.TouchableOpacity`
  padding: 10px;
`;

const Title = styled.Text`
  color: #00d1ff;
  font-size: 20px;
  font-weight: bold;
`;

const InviteSection = styled.View`
  background-color: #1a1a1a;
  margin: 0 20px;
  padding: 15px;
  border-radius: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SummaryCard = styled.View`
  background-color: #00d1ff;
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
`;

const SummaryLabel = styled.Text`
  color: #000;
  font-size: 14px;
  font-weight: 600;
`;

const SummaryValue = styled.Text`
  color: #000;
  font-size: 28px;
  font-weight: bold;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  margin-top: 10px;
`;

const TransactionItem = styled.View`
  background-color: #111;
  margin: 5px 20px;
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

// MOCKS
const MOCK_GROUP = { name: "Cartão Gigu", bank: "Nubank", code: "UX4I3H" };
const MOCK_TRANSACTIONS = [
  { id: "1", desc: "Netflix", value: 55.9, member: "Giovanna", date: "22 Abr" },
  {
    id: "2",
    desc: "Restaurante",
    value: 120.0,
    member: "Namorado",
    date: "21 Abr",
  },
];

export default function CardDetailsScreen({ route, navigation }) {
  const { groupId, isOwner } = route.params;
  const [selectedMonth, setSelectedMonth] = useState("Abril");

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#00D1FF" />
        </BackButton>
        <Title>
          {MOCK_GROUP.bank} - {MOCK_GROUP.name}
        </Title>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#00D1FF" />
        </TouchableOpacity>
      </Header>

      <ScrollView>
        <InviteSection>
          <View>
            <Text style={{ color: "#888", fontSize: 12 }}>
              CÓDIGO DE CONVITE
            </Text>
            <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 18 }}>
              {MOCK_GROUP.code}
            </Text>
          </View>
          <TouchableOpacity onPress={() => alert("Código copiado!")}>
            <Ionicons name="copy-outline" size={24} color="#00D1FF" />
          </TouchableOpacity>
        </InviteSection>

        <SummaryCard>
          <SummaryLabel>Total da Fatura ({selectedMonth})</SummaryLabel>
          <SummaryValue>R$ 175,90</SummaryValue>
          <View
            style={{
              marginTop: 10,
              borderTopWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
              paddingTop: 10,
            }}
          >
            <Text style={{ color: "#000", fontSize: 12 }}>
              SUA PARTE: R$ 55,90
            </Text>
          </View>
        </SummaryCard>

        <SectionHeader>
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
            Transações
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: "#1A1A1A", padding: 8, borderRadius: 8 }}
          >
            <Text style={{ color: "#00D1FF" }}>Filtrar Membro</Text>
          </TouchableOpacity>
        </SectionHeader>

        {MOCK_TRANSACTIONS.map((item) => (
          <TransactionItem key={item.id}>
            <View>
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                {item.desc}
              </Text>
              <Text style={{ color: "#666", fontSize: 12 }}>
                {item.member} • {item.date}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "#00D1FF", fontWeight: "bold" }}>
                R$ {item.value.toFixed(2)}
              </Text>
              {isOwner && (
                <TouchableOpacity onPress={() => alert("Cobrança enviada!")}>
                  <Text
                    style={{ color: "#FFD100", fontSize: 10, marginTop: 4 }}
                  >
                    COBRAR
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TransactionItem>
        ))}
      </ScrollView>

      {/* Botão Flutuante para adicionar despesa */}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          bottom: 30,
          backgroundColor: "#00D1FF",
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
        }}
        onPress={() => alert("Abrir modal de nova transação")}
      >
        <Ionicons name="add" size={32} color="#000" />
      </TouchableOpacity>
    </Container>
  );
}
