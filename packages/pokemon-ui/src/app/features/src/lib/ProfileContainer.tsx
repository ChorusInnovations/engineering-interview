import styled from "@emotion/styled";
import { useState } from "react";
import { Profile } from "./types";
import axios from "axios";

const ProfilesContainer = styled.div`
  margin-bottom: 20px;
`;

const ProfilesTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const ProfilesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
`;

const ProfileButton = styled.button<{ isSelected: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.isSelected ? '#4a90e2' : '#f0f0f0'};
  color: ${props => props.isSelected ? 'white' : '#333'};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isSelected ? '#3578c7' : '#e0e0e0'};
  }
`;

const CreateProfileButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 10px;
  
  &:hover {
    background-color: #43a047;
  }
`;

const CreateProfileForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ProfileInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

type Props = {
  profiles: Profile[],
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>,
  selectedProfileId: number | null,
  setSelectedProfileId: (profileId: number | null) => void
}

export default function ProfileContainer({
  profiles,
  setProfiles,
  selectedProfileId,
  setSelectedProfileId,
}: Props) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');

  const handleProfileSelect = (profileId: number) => {
    setSelectedProfileId(profileId);
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    
    try {
      const response = await axios.post('http://localhost:3000/api/profiles', {
        name: newProfileName
      });
      
      const newProfile: Profile = {
        ...response.data,
        pokemon: [] // Always initialize with an empty array
      };
      
      setProfiles(prevProfiles => [...prevProfiles, newProfile]);
      
      setSelectedProfileId(newProfile.id);
      setNewProfileName('');
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating profile:', err);
      alert('Failed to create profile');
    }
  };

  return (
    <ProfilesContainer>
      <ProfilesTitle>Select a Profile:</ProfilesTitle>
      <ProfilesList>
        {profiles.map(profile => (
          <ProfileButton
            key={profile.id}
            isSelected={profile.id === selectedProfileId}
            onClick={() => handleProfileSelect(profile.id)}
          >
            {profile.name} ({profile.pokemon?.length}/6)
          </ProfileButton>
        ))}
        {!showCreateForm && (
          <CreateProfileButton onClick={() => setShowCreateForm(true)}>
            + New Profile
          </CreateProfileButton>
        )}
      </ProfilesList>
      
      {showCreateForm && (
        <CreateProfileForm onSubmit={handleCreateProfile}>
          <ProfileInput
            type="text"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            placeholder="Enter profile name"
            autoFocus
          />
          <CreateProfileButton type="submit">Create</CreateProfileButton>
          <button 
            type="button" 
            onClick={() => setShowCreateForm(false)}
            style={{ marginLeft: '5px' }}
          >
            Cancel
          </button>
        </CreateProfileForm>
      )}
    </ProfilesContainer>
  )
}