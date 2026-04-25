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

// MODAL
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

// Cartões de Grupo
export const Card = styled.TouchableOpacity`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  border-left-width: 5px;
  border-left-color: #00d1ff;
  elevation: 3; /* Sombra no Android */
`;

export const CardTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

export const CardSubtitle = styled.Text`
  color: #999;
  font-size: 16px;
  margin-top: 5px;
`;

export const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top-width: 1px;
  border-top-color: #333;
`;

export const CardInfoTag = styled.View`
  background-color: #333;
  padding: 5px 10px;
  border-radius: 8px;
`;

export const CardInfoText = styled.Text`
  color: #00d1ff;
  font-size: 14px;
  font-weight: bold;
`;
