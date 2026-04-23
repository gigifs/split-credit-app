import React, { useState } from "react";
import { Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import {
  Container,
  Title,
  Subtitle,
  Input,
  Button,
  ButtonText,
  SwitchModeText,
} from "../components/AuthComponents";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAuth() {
    if (!email || !password || (!isLogin && !fullName)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        Alert.alert("Sucesso!", "Cadastro realizado!");
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Title>SplitCredit</Title>
      <Subtitle>{isLogin ? "Faça seu login" : "Crie sua conta"}</Subtitle>

      {!isLogin && (
        <Input
          placeholder="Nome Completo"
          value={fullName}
          onChangeText={setFullName}
        />
      )}

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button onPress={handleAuth} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <ButtonText>{isLogin ? "Entrar" : "Cadastrar"}</ButtonText>
        )}
      </Button>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <SwitchModeText>
          {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
        </SwitchModeText>
      </TouchableOpacity>
    </Container>
  );
}
