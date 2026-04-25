import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../lib/supabase";
import { Button, Input } from "../components/AuthComponents";
import {
  Container,
  Header,
  AvatarButton,
  SectionTitle,
  EmptyText,
  ModalOverlay,
  ModalContent,
  CloseButton,
  CloseButtonText,
  AvatarContainer,
  ProfileAvatarButton,
  AvatarImage,
  AvatarFallbackText,
  EditPhotoText,
  ProfileName,
  ProfileEmail,
  LogoutButton,
  LogoutButtonText,
  FABContainer,
  FABMain,
  FABText,
  FABOption,
  FABOptionText,
} from "../components/HubComponents";

export default function HubScreen() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    full_name: "",
    avatar_url: "",
    email: "",
  });
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isFabOpen, setFabOpen] = useState(false);
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [isJoinGroupModalOpen, setJoinGroupModalOpen] = useState(false);

  // Buscar dados do perfil
  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Busca o nome e foto na tabela profiles
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile({
            full_name: data.full_name,
            avatar_url: data.avatar_url,
            email: user.email, // O e-mail vem direto da auth
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Foto (PICKER + UPLOAD)
  async function handlePickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      uploadAvatar(result.assets[0].uri);
    }
  }

  async function uploadAvatar(uri) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const fileExt = uri.split(".").pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;

      // Lê o arquivo nativamente pelo Expo e transforma em Base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });

      // Sobe o binário decodificado direto pro Supabase
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, decode(base64), {
          contentType: `image/${fileExt}`,
        });

      if (uploadError) {
        console.error("Erro do Storage:", uploadError);
        throw uploadError;
      }

      // Pega a URL pública
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);
      const publicUrl = urlData.publicUrl;

      // Atualiza a tabela profiles
      const { error: dbError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (dbError) throw dbError;

      // Atualiza a tela
      setProfile({ ...profile, avatar_url: publicUrl });
      Alert.alert("Sucesso", "Foto atualizada!");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", error.message || "Não foi possível subir a foto.");
    }
  }

  if (loading)
    return (
      <Container>
        <ActivityIndicator color="#00D1FF" />
      </Container>
    );

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <Container>
      <Header>
        <AvatarButton onPress={() => setProfileModalOpen(true)}>
          {profile.avatar_url ? (
            <AvatarImage source={{ uri: profile.avatar_url }} />
          ) : (
            <AvatarFallbackText>
              {profile.full_name?.charAt(0)}
            </AvatarFallbackText>
          )}
        </AvatarButton>
      </Header>

      {/* Listas de Cartões */}
      <SectionTitle>Cartões que Gerencio</SectionTitle>
      <EmptyText>Você ainda não possui cartões.</EmptyText>

      <SectionTitle>Cartões que Participo</SectionTitle>
      <EmptyText>Você ainda não é dependente em nenhum cartão.</EmptyText>

      {/* FAB */}
      <FABContainer>
        {isFabOpen && (
          <>
            <FABOption
              onPress={() => {
                setFabOpen(false);
                setCreateGroupModalOpen(true);
              }}
            >
              <FABOptionText>Criar Grupo de Cartão</FABOptionText>
            </FABOption>
            <FABOption
              onPress={() => {
                setFabOpen(false);
                setJoinGroupModalOpen(true);
              }}
            >
              <FABOptionText> Entrar em um Grupo </FABOptionText>
            </FABOption>
          </>
        )}
        <FABMain onPress={() => setFabOpen(!isFabOpen)}>
          <FABText>{isFabOpen ? "×" : "+"}</FABText>
        </FABMain>
      </FABContainer>

      {/* MODAL Perfil */}
      <Modal visible={isProfileModalOpen} transparent animationType="slide">
        <ModalOverlay>
          <ModalContent>
            {/* Botão de Fechar */}
            <CloseButton onPress={() => setProfileModalOpen(false)}>
              <CloseButtonText>Fechar</CloseButtonText>
            </CloseButton>

            {/* Seção do Avatar */}
            <AvatarContainer>
              <ProfileAvatarButton onPress={handlePickImage}>
                {profile.avatar_url ? (
                  <AvatarImage source={{ uri: profile.avatar_url }} />
                ) : (
                  <AvatarFallbackText>
                    {profile.full_name?.charAt(0)}
                  </AvatarFallbackText>
                )}
              </ProfileAvatarButton>

              <TouchableOpacity onPress={handlePickImage}>
                <EditPhotoText>Editar Foto</EditPhotoText>
              </TouchableOpacity>
            </AvatarContainer>

            {/* Informações do Usuário */}
            <ProfileName>{profile.full_name}</ProfileName>
            <ProfileEmail>{profile.email}</ProfileEmail>

            {/* Botão de Logout */}
            <LogoutButton onPress={handleLogout}>
              <LogoutButtonText>Sair do App</LogoutButtonText>
            </LogoutButton>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      {/* MODAL Criar Grupo */}
      <Modal visible={isCreateGroupModalOpen} transparent animationType="slide">
        <ModalOverlay>
          <ModalContent>
            <Text style={{ color: "#00D1FF", fontSize: 20, marginBottom: 20 }}>
              Novo Cartão
            </Text>
            {/* Aqui vai ter inputs de Nome, Select de Banco e Dia do Vencimento */}
            <Button onPress={() => setCreateGroupModalOpen(false)}>
              <Text>Cancelar</Text>
            </Button>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Container>
  );
}
