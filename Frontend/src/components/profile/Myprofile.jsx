import { useState, useRef, useEffect } from "react";
import { User, Mail, Phone, MapPin, Camera, Pencil, Check } from "lucide-react";

import api from "../../lib/api";
import { s } from "./styles";

export default function MyProfile({ user, setUser }) {
  const fileRef = useRef(null);

  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    location: "",
  });

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // User aane ke baad form fill karo

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        mobile: user.mobile || "",
        location: user.location || "",
      });
    }
  }, [user]);

  // Profile update API

  const saveProfile = async () => {
    try {
      setLoading(true);

      const response = await api.patch("/auth/profile", form);

      setUser(response.data.user);

      setMessage("Profile updated successfully ✨");

      setEdit(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  // Upload profile image

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {
      const response = await api.post("/auth/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const details = [
    {
      icon: User,
      label: "Name",
      key: "name",
    },

    {
      icon: Mail,
      label: "Email",
      value: user?.email,
      readonly: true,
    },

    {
      icon: Phone,
      label: "Mobile",
      key: "mobile",
    },

    {
      icon: MapPin,
      label: "Location",
      key: "location",
    },
  ];

  return (
    <div style={s.panel}>
      {/* Top section */}

      <div style={s.profileHeader}>
        <div style={s.profileInfo}>
          <div style={s.profileImage} onClick={() => fileRef.current.click()}>
            {user?.image ? (
              <img src={user.image} alt="" style={s.image} />
            ) : (
              <div style={s.avatarFallback}>
                {(user?.name?.[0] || "U").toUpperCase()}
              </div>
            )}

            <div style={s.camera}>
              <Camera size={16} />
            </div>
          </div>

          <input
            type="file"
            hidden
            ref={fileRef}
            accept=".jpg,.png,.jpeg,.webp"
            onChange={uploadImage}
          />

          <div>
            <h2 style={s.title}>{user?.name}</h2>

            <p style={s.subTitle}>{user?.email}</p>
          </div>
        </div>

        <button
          style={edit ? s.saveBtn : s.editBtn}
          onClick={() => {
            if (edit) {
              saveProfile();
            } else {
              setEdit(true);
            }
          }}
        >
          {edit ? (
            <>
              <Check size={15} />
              {loading ? "Saving..." : "Save"}
            </>
          ) : (
            <>
              <Pencil size={15} />
              Edit
            </>
          )}
        </button>
      </div>

      <div style={s.line} />

      {/* Details */}

      {details.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} style={s.field}>
            <div style={s.leftField}>
              <Icon size={16} color="#a78bfa" />

              <span>{item.label}</span>
            </div>

            {edit && !item.readonly ? (
              <input
                style={s.input}
                value={form[item.key]}
                onChange={(e) =>
                  setForm({
                    ...form,

                    [item.key]: e.target.value,
                  })
                }
              />
            ) : (
              <span style={s.value}>
                {item.value || form[item.key] || "Not added"}
              </span>
            )}
          </div>
        );
      })}

      {message && <div style={s.toast}>{message}</div>}
    </div>
  );
}
