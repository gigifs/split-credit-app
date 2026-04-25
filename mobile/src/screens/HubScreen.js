import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../lib/supabase";
import { Button, Input } from "../components/AuthComponents";
import UserAvatar from "../components/UserAvatar";
import {
  Container,
  Header,
  AvatarButton,
  AvatarImage,
  AvatarFallbackText,
  SectionTitle,
  EmptyText,
  ModalOverlay,
  ModalContent,
  FABContainer,
  FABMain,
  FABText,
  FABOption,
  FABOptionText,
  Card,
  CardTitle,
  CardSubtitle,
  CardRow,
  CardInfoTag,
  CardInfoText,
} from "../components/HubComponents";
import ProfileModal from "../components/ProfileModal";
import CreateGroupModal from "../components/CreateGroupModal";
import JoinGroupModal from "../components/JoinGroupModal";

export default function HubScreen({ navigation }) {
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
  const [myGroups, setMyGroups] = useState([]);
  const [memberGroups, setMemberGroups] = useState([]);

  // Buscar dados do perfil
  useEffect(() => {
    fetchProfile();
    fetchGroups();
    fetchMemberGroups();
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

  // Busca os cartões que o usuário é dono
  async function fetchGroups() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMyGroups(data || []);
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);
    }
  }

  // Busca os cartões onde o usuário é dependente
  async function fetchMemberGroups() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("group_members")
        .select(
          `
          status,
          groups (
            id,
            group_name,
            bank_name,
            due_day
          )
        `,
        )
        .eq("profile_id", user.id);

      if (error) throw error;
      setMemberGroups(data || []);
    } catch (error) {
      console.error("Erro ao buscar grupos como dependente:", error);
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
        <UserAvatar
          profile={profile}
          onPress={() => setProfileModalOpen(true)}
          size={60}
        />
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Listas de Cartões */}
        <SectionTitle>Cartões que Gerencio</SectionTitle>
        {myGroups.length === 0 ? (
          <EmptyText>Você ainda não possui cartões.</EmptyText>
        ) : (
          myGroups.map((group) => (
            <Card
              key={group.id}
              onPress={() =>
                navigation.navigate("CardDetails", {
                  groupId: group.id,
                  isOwner: true,
                })
              }
            >
              <CardTitle>{group.group_name}</CardTitle>
              <CardSubtitle>{group.bank_name}</CardSubtitle>

              <CardRow>
                <CardInfoTag>
                  <CardInfoText>Vence dia {group.due_day}</CardInfoText>
                </CardInfoTag>
                <CardInfoTag>
                  <CardInfoText>Convite: {group.invite_code}</CardInfoText>
                </CardInfoTag>
              </CardRow>
            </Card>
          ))
        )}

        <SectionTitle>Cartões que Participo</SectionTitle>
        {memberGroups.length === 0 ? (
          <EmptyText>Você ainda não é dependente em nenhum cartão.</EmptyText>
        ) : (
          memberGroups.map((member) => (
            <Card
              key={member.groups.id}
              onPress={() =>
                navigation.navigate("CardDetails", {
                  groupId: group.id,
                  isOwner: true,
                })
              }
            >
              <CardTitle>{member.groups.group_name}</CardTitle>
              <CardSubtitle>{member.groups.bank_name}</CardSubtitle>

              <CardRow>
                <CardInfoTag>
                  <CardInfoText>Vence dia {member.groups.due_day}</CardInfoText>
                </CardInfoTag>
                <CardInfoTag
                  style={{
                    backgroundColor:
                      member.status === "pendente" ? "#ffaa00" : "#333",
                  }}
                >
                  <CardInfoText
                    style={{
                      color: member.status === "pendente" ? "#000" : "#00d1ff",
                    }}
                  >
                    {member.status.toUpperCase()}
                  </CardInfoText>
                </CardInfoTag>
              </CardRow>
            </Card>
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

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
      <ProfileModal
        isVisible={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profile={profile}
        onPickImage={handlePickImage}
        onLogout={handleLogout}
      />

      {/* MODAL Criar Grupo */}
      <CreateGroupModal
        isVisible={isCreateGroupModalOpen}
        onClose={() => setCreateGroupModalOpen(false)}
        onSuccess={fetchGroups}
      />

      {/* MODAL de Entrar em Grupo */}
      <JoinGroupModal
        isVisible={isJoinGroupModalOpen}
        onClose={() => setJoinGroupModalOpen(false)}
        onSuccess={() =>
          console.log(
            "Entrou no grupo! Precisa recarregar a lista de dependente",
          )
        }
      />
    </Container>
  );
}
