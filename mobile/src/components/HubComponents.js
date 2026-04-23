import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px;
  padding-top: 50px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const AvatarButton = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background-color: #333;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-width: 2px;
  border-color: #00d1ff;
`;

export const SectionTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const EmptyText = styled.Text`
  color: #666;
  font-size: 14px;
`;

// Estilos do Modal
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

export const ProfileName = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

export const ProfileEmail = styled.Text`
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
`;

// FAB
export const FABContainer = styled.View`
  position: absolute;
  bottom: 30px;
  right: 20px;
  align-items: flex-end;
`;

export const FABOption = styled.TouchableOpacity`
  background-color: #1e1e1e;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: #333;
`;

export const FABOptionText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const FABMain = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #00d1ff;
  align-items: center;
  justify-content: center;
  elevation: 5;
`;
