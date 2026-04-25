import React from "react";
import styled from "styled-components/native";

const BaseAvatarButton = styled.TouchableOpacity`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: #333;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-width: 2px;
  border-color: #00d1ff;
`;

const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const AvatarFallbackText = styled.Text`
  color: #00d1ff;
  font-size: ${(props) =>
    props.size * 0.4}px; /* A fonte cresce junto com o botão */
  font-weight: bold;
`;

export default function UserAvatar({ profile, onPress, size = 45, style }) {
  if (!profile) return null;

  return (
    <BaseAvatarButton onPress={onPress} size={size} style={style}>
      {profile.avatar_url ? (
        <AvatarImage source={{ uri: profile.avatar_url }} />
      ) : (
        <AvatarFallbackText size={size}>
          {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : ""}
        </AvatarFallbackText>
      )}
    </BaseAvatarButton>
  );
}
