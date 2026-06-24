export const s = {
  /* Main Panels */

  panel: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    color: "#fff",
  },

  /* Sidebar */

  sidebar: {
    width: "280px",
    minHeight: "600px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(139,92,246,0.25)",
    backdropFilter: "blur(15px)",
    borderRadius: "24px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  avatar: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #8b5cf6",
  },

  avatarFallback: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: "20px",
  },

  name: {
    margin: 0,
    color: "#fff",
    fontSize: "15px",
    fontWeight: "700",
  },

  email: {
    marginTop: "4px",
    color: "rgba(255,255,255,0.5)",
    fontSize: "12px",
  },

  /* Lines */

  line: {
    height: "1px",
    background: "rgba(139,92,246,0.25)",
  },

  /* Menu */

  menuBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    border: "none",
    borderRadius: "12px",
    background: "transparent",
    color: "#ddd",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },

  activeBtn: {
    background: "rgba(124,58,237,0.25)",
    color: "#fff",
    boxShadow: "0 0 20px rgba(124,58,237,0.4)",
  },

  deleteActive: {
    background: "rgba(248,113,113,0.15)",
    color: "#f87171",
  },

  logout: {
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    background: "transparent",
    border: "none",
    color: "#f87171",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },

  /* Headings */

  title: {
    margin: 0,
    color: "#fff",
    fontSize: "22px",
    fontWeight: "700",
  },

  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  subTitle: {
    color: "rgba(255,255,255,0.55)",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  /* Profile */

  profileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
  },

  profileInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  profileImage: {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    border: "2px solid #8b5cf6",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  camera: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },

  /* Buttons */

  editBtn: {
    padding: "10px 18px",
    borderRadius: "12px",
    border: "none",
    background: "rgba(139,92,246,0.35)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },

  saveBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  deleteBtn: {
    padding: "12px",
    border: "1px solid #f87171",
    borderRadius: "12px",
    background: "rgba(248,113,113,0.15)",
    color: "#f87171",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
  },

  /* Inputs */

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    color: "#ddd",
    fontSize: "14px",
  },

  inputWrapper: {
    position: "relative",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(139,92,246,0.25)",
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },

  eyeButton: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    color: "#999",
    cursor: "pointer",
  },

  /* Fields */

  field: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  leftField: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#ddd",
  },

  value: {
    color: "#c4b5fd",
    fontWeight: "500",
  },

  /* Toast */

  toast: {
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(34,197,94,0.15)",
    color: "#86efac",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  errorToast: {
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(248,113,113,0.15)",
    color: "#fca5a5",
  },

  /* Warning */

  warningBox: {
    background: "rgba(251,191,36,0.10)",
    border: "1px solid rgba(251,191,36,0.25)",
    borderRadius: "15px",
    padding: "15px",
    display: "flex",
    gap: "12px",
  },

  warningTitle: {
    color: "#fbbf24",
    margin: "0 0 8px 0",
  },

  warningList: {
    color: "rgba(255,255,255,0.65)",
    margin: 0,
    paddingLeft: "18px",
    lineHeight: "1.6",
  },

  toggleBtn: {
    padding: "8px 15px",
    borderRadius: "20px",
    border: "none",
    background: "rgba(139,92,246,0.25)",
    color: "#fff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
};
