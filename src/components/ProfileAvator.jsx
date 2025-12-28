import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProfileAvatar = ({
  setObjectUrl,
  profilePic,
  rounded = false,
  className = "",
  fallback = "/default-avatar.png",
}) => {
  const axios = useAxiosPrivate();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let objectUrl = null;

    const fetchImage = async () => {
      if (!profilePic) return;
      try {
        const response = await axios.get(`public/${profilePic}`, {
          responseType: "blob",
        });

        objectUrl = URL.createObjectURL(response.data);
        if (isMounted) setImageUrl(objectUrl);
        setObjectUrl(objectUrl);
      } catch (error) {
        console.error("Profile image load failed", error);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [profilePic, axios]);

  return (
    <img
      src={imageUrl || fallback}
      alt="profile"
      className={`${
        rounded ? "rounded-full" : "rounded-lg"
      } object-contain ${className}`}
    />
  );
};

export default ProfileAvatar;
