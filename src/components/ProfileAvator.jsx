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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let objectUrl = null;

    const fetchImage = async () => {
      if (!profilePic) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`public/${profilePic}`, {
          responseType: "blob",
        });

        objectUrl = URL.createObjectURL(response.data);
        if (isMounted) setImageUrl(objectUrl);
        setObjectUrl && setObjectUrl(objectUrl);
      } catch (error) {
        console.error("Profile image load failed", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [profilePic, axios, setObjectUrl]);

  return (
    <div
      className={`relative overflow-hidden ${
        rounded ? "rounded-full" : "rounded-lg"
      } h-10 w-10 bg-gray-200 flex items-center justify-center ${className}`}
    >
      {loading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
      )}
      <img
        src={imageUrl || fallback}
        alt="profile"
        className={`object-contain h-full w-full ${
          rounded ? "rounded-full" : "rounded-lg"
        } ${
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"
        }`}
      />
    </div>
  );
};

export default ProfileAvatar;
