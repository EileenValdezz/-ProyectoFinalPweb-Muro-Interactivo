import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function NewPost({ user }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const disabled = sending || text.trim().length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    try {
      setSending(true);
      await addDoc(collection(db, "posts"), {
        text: text.trim(),
        authorId: user.uid,
        authorName: user.displayName || user.email?.split("@")[0] || "usuario",
        createdAt: serverTimestamp(),
      });
      setText("");
      alert("¡Publicación creada con éxito! 🎉");
    } finally {
      setSending(false);
    }
  };

return (
    <form className="card new-post" onSubmit={handleSubmit}>
      <h3 className="title center">Nueva Publicación</h3>
      <textarea
        className="input"
        placeholder="¿Qué estás pensando? ✨"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        maxLength={500}
      />
      <div className="new-post__actions">
        <button className="btn" type="submit" disabled={disabled}>
          {sending ? "Publicando..." : "Publicar"}
        </button>
        <span className="hint">{text.length}/500</span>
      </div>
    </form>
  );
}
