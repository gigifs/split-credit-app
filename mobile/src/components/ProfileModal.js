import React, { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Button } from "./AuthComponents";
import UserAvatar from "./UserAvatar";
import { AvatarButton, ModalOverlay, ModalContent } from "./HubComponents";

export const CloseButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const CloseButtonText = styled.Text`
  color: #999;
  font-size: 18px;
`;

export const AvatarContainer = styled.View`
  align-items: center;
  margin-top: -10px;
`;

export const EditPhotoText = styled.Text`
  color: #00d1ff;
  font-size: 16px;
`;

export const ProfileName = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

export const ProfileEmail = styled.Text`
  color: #999;
  font-size: 18px;
  text-align: center;
`;

export const LogoutButton = styled(Button)`
  background-color: #ff4444;
  margin-top: 30px;
`;

export const LogoutButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export default function ProfileModal({
  isVisible,
  onClose,
  profile,
  onPickImage,
  onLogout,
}) {
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <ModalOverlay>
        <ModalContent>
          {/* Botão de Fechar */}
          <CloseButton onPress={onClose}>
            <CloseButtonText>Fechar</CloseButtonText>
          </CloseButton>

          {/* Seção do Avatar */}
          <AvatarContainer>
            <UserAvatar
              profile={profile}
              onPress={onPickImage}
              size={100}
              style={{ marginBottom: 10 }}
            />

            <TouchableOpacity onPress={onPickImage}>
              <EditPhotoText>Editar Foto</EditPhotoText>
            </TouchableOpacity>
          </AvatarContainer>

          {/* Informações do Usuário */}
          <ProfileName>{profile.full_name}</ProfileName>
          <ProfileEmail>{profile.email}</ProfileEmail>

          {/* Botão de Logout */}
          <LogoutButton onPress={onLogout}>
            <LogoutButtonText>Sair do App</LogoutButtonText>
          </LogoutButton>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
