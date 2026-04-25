import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import { supabase } from "../../lib/supabase";
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
  color: #ccc;
  font-size: 16px;
  margin-bottom: 6px;
`;

export const JoinGroupButton = styled(Button)`
  margin-top: 20px;
`;

export const JoinGroupButtonText = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: bold;
`;

export default function JoinGroupModal({ isVisible, onClose, onSuccess }) {
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoinGroup = async () => {
    if (!inviteCode.trim() || inviteCode.length < 6) {
      return Alert.alert(
        "Aviso",
        "Digite um código de convite válido (6 caracteres).",
      );
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Busca se existe algum grupo com este código
      const { data: group, error: searchError } = await supabase
        .from("groups")
        .select("*")
        .eq("invite_code", inviteCode.toUpperCase())
        .single();

      if (searchError || !group) {
        throw new Error("Código inválido ou cartão não encontrado.");
      }

      // Impede que o próprio dono entre no cartão como dependente
      if (group.owner_id === user.id) {
        throw new Error("Você já é o titular deste cartão!");
      }

      // Insere o usuário na tabela de membros (como pendente/participante)
      const { error: insertError } = await supabase
        .from("group_members")
        .insert({
          group_id: group.id,
          profile_id: user.id,
        });

      // Se der erro de violação de chave (já está no grupo)
      if (insertError && insertError.code === "23505") {
        throw new Error("Você já está neste grupo (ou aguardando aprovação).");
      } else if (insertError) {
        throw insertError;
      }

      Alert.alert(
        "Sucesso!",
        `Você solicitou entrada no cartão: ${group.group_name}`,
      );

      setInviteCode("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", error.message || "Não foi possível entrar no grupo.");
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

          <Title>Entrar em um Cartão</Title>

          <Label>Código de Convite</Label>
          <Input
            placeholder="Ex: X8B9K2"
            value={inviteCode}
            onChangeText={(text) => setInviteCode(text.toUpperCase())}
            autoCapitalize="characters"
            maxLength={6}
          />

          <JoinGroupButton onPress={handleJoinGroup} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <JoinGroupButtonText>Solicitar Entrada</JoinGroupButtonText>
            )}
          </JoinGroupButton>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
