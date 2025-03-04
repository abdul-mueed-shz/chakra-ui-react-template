import {
  Box,
  Heading,
  Grid,
  VStack,
  Divider,
  Avatar,
  Image,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile, updateUserProfile } from "@redux/slices/user";
import PasswordForm from "@components/profile/password-form";
import ProfileForm from "@components/profile/info-form";

const Profile = () => {
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState(null); // Base64 image
  const [binaryImage, setBinaryImage] = useState(null); // Binary image data
  const [selectedFile, setSelectedFile] = useState(null); // Store the file object

  useEffect(() => {
    dispatch(getProfile())
      .unwrap()
      .then((profileData) => {
        setProfilePic(profileData.data.image);
      });
  }, [dispatch]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Store file for later use

      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);

      const binaryReader = new FileReader();
      binaryReader.onloadend = () => {
        const blob = new Blob([binaryReader.result], { type: file.type });
        setBinaryImage(blob);
      };

      reader.readAsDataURL(file);
      binaryReader.readAsArrayBuffer(file);
    }
  };

  const handleProfileUpdate = (data) => {
    const formData = new FormData();

    if (binaryImage && selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop();
      const uniqueFileName = `profile_${Date.now()}.${fileExtension}`;
      formData.append("image", binaryImage, uniqueFileName);
    }

    for (const key in data) {
      formData.append(key, data[key]);
    }

    dispatch(updateUserProfile(formData))
      .unwrap()
      .then(() => {
        dispatch(getProfile());
      })
      .catch(() => {});
  };

  return (
    <Box maxW="1000px" mx="auto" p={5} boxShadow="lg" borderRadius="lg">
      <Heading size="lg" mb={6}>
        User Profile
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
        <VStack spacing={6} align="center" w="full">
          <VStack spacing={4}>
            {profilePic ? (
              <Image
                src={profilePic}
                alt="Profile"
                w="100px"
                h="100px"
                borderRadius="full"
              />
            ) : (
              <Avatar size="2xl" />
            )}
            <Box position="relative">
              <Button
                as="label"
                htmlFor="file-upload"
                colorScheme="blue"
                size="sm"
              >
                Upload Photo
              </Button>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                opacity={0}
                position="absolute"
                width="100%"
                height="100%"
                cursor="pointer"
              />
            </Box>
          </VStack>
          <Divider />
          <PasswordForm />
        </VStack>
        <ProfileForm onSubmit={handleProfileUpdate} />
      </Grid>
    </Box>
  );
};

export default Profile;
