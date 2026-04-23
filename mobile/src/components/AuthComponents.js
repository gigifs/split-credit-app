import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #00d1ff;
  margin-bottom: 10px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  color: #fff;
  margin-bottom: 30px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#999",
})`
  width: 100%;
  height: 50px;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 0 15px;
  color: #fff;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: #333;
`;

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

export const ButtonText = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: bold;
`;

export const SwitchModeText = styled.Text`
  color: #00d1ff;
  margin-top: 20px;
`;
