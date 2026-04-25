import styled from "styled-components/native";
import { Button } from "./AuthComponents";

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px;
  padding-top: 50px;
`;

// Cabeçalho
export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 20px;
`;

// Botão da foto
export const AvatarButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #333;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-width: 2px;
  border-color: #00d1ff;
`;

export const SectionTitle = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const EmptyText = styled.Text`
  color: #999;
  font-size: 16px;
`;

// Estilo do Modal
export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  background-color: #1e1e1e;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
`;

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

export const ProfileAvatarButton = styled(AvatarButton)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const AvatarFallbackText = styled.Text`
  color: #00d1ff;
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

// FAB
export const FABContainer = styled.View`
  position: absolute;
  bottom: 60px;
  right: 20px;
  align-items: flex-end;
`;

export const FABMain = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #00d1ff;
  align-items: center;
  justify-content: center;
  elevation: 5;
  border-width: 2px;
  border-color: #00d1ff;
`;

export const FABText = styled.Text`
  font-size: 50px;
  color: #000;
  font-weight: 500;
  line-height: 50px;
`;

export const FABOption = styled.TouchableOpacity`
  background-color: #1e1e1e;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  border-width: 2px;
  border-color: #666;
`;

export const FABOptionText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
`;
