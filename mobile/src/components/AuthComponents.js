import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;
// SplitCredit
export const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #00d1ff;
  margin-bottom: 10px;
`;

// Faça seu login/Crie sua conta
export const Subtitle = styled.Text`
  font-size: 20px;
  color: #fff;
  margin-bottom: 30px;
`;

// Campos de cadastro
export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#999",
})`
  width: 100%;
  height: 50px;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: #333;
`;

// Botão cadastro/login
export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #00d1ff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

// Entrar/Cadastrar
export const ButtonText = styled.Text`
  color: #000;
  font-size: 20px;
  font-weight: bold;
`;

// Troca entre login/cadastro
export const SwitchModeText = styled.Text`
  color: #00d1ff;
  margin-top: 20px;
`;
