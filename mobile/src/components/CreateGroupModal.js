import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../../lib/supabase";
import styled from "styled-components/native";
import { Button, Input } from "./AuthComponents";
import { ModalOverlay, ModalContent } from "./HubComponents";
import { CloseButton, CloseButtonText } from "./ProfileModal";

const Title = styled.Text`
  color: #00d1ff;
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  color: #c0c0c0;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
`;

const PickerContainer = styled.View`
  background-color: #1e1e1e;
  border-radius: 8px;
  border-width: 1px;
  border-color: #333;
  margin-bottom: 15px;
  overflow: hidden;
`;

export const CreateGroupButton = styled(Button)`
  margin-top: 20px;
`;

export const CreateGroupButtonText = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: bold;
`;

export default function CreateGroupModal({ isVisible, onClose, onSuccess }) {
  const [groupName, setGroupName] = useState("");
  const [bankName, setBankName] = useState("Nubank");
  const [dueDay, setDueDay] = useState("");
  const [loading, setLoading] = useState(false);

  // Gera um código de 6 caracteres (letras e números)
  const generateInviteCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      return Alert.alert("Erro", "Dê um nome para o cartão.");
    }

    const day = parseInt(dueDay);
    if (!dueDay || isNaN(day) || day < 1 || day > 31) {
      return Alert.alert("Erro", "O dia de vencimento deve ser entre 1 e 31.");
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const inviteCode = generateInviteCode();

      // Grava no Supabase (tabela groups)
      const { error } = await supabase.from("groups").insert({
        owner_id: user.id,
        group_name: groupName,
        bank_name: bankName,
        due_day: day,
        invite_code: inviteCode,
      });

      if (error) throw error;

      Alert.alert(
        "Sucesso!",
        `Cartão criado! Código de convite: ${inviteCode}`,
      );

      // Limpa o formulário e fecha o modal
      setGroupName("");
      setBankName("Nubank");
      setDueDay("");
      onSuccess(); // Avisa a HubScreen para atualizar a lista
      onClose();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível criar o grupo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <ModalOverlay>
        <ModalContent>
          {/* Botão de Fechar */}
          <CloseButton onPress={onClose}>
            <CloseButtonText>Fechar</CloseButtonText>
          </CloseButton>

          <Title>Novo Cartão Compartilhado</Title>

          <Label>Nome de identificação (Ex: Cartão da Casa)</Label>
          <Input
            placeholder="Nome do cartão"
            value={groupName}
            onChangeText={setGroupName}
          />

          <Label>Banco Emissor</Label>
          <PickerContainer>
            <Picker
              selectedValue={bankName}
              onValueChange={(itemValue) => setBankName(itemValue)}
              style={{ color: "#fff", width: "100%", height: 50 }}
              dropdownIconColor="#00D1FF"
            >
              <Picker.Item label="Nubank" value="Nubank" />
              <Picker.Item label="Itaú" value="Itaú" />
              <Picker.Item label="Banco Inter" value="Banco Inter" />
              <Picker.Item label="C6 Bank" value="C6 Bank" />
            </Picker>
          </PickerContainer>

          <Label>Dia de Vencimento da Fatura</Label>
          <Input
            placeholder="Ex: 15"
            value={dueDay}
            onChangeText={setDueDay}
            keyboardType="numeric"
            maxLength={2}
          />

          <CreateGroupButton onPress={handleCreateGroup} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <CreateGroupButtonText>Salvar Cartão</CreateGroupButtonText>
            )}
          </CreateGroupButton>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
