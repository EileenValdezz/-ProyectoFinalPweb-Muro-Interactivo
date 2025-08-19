import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function PostList({ user }) {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPosts(data);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar esta publicación?")) return;
    await deleteDoc(doc(db, "posts", id));
  };

  const handleEdit = async (id) => {
    await updateDoc(doc(db, "posts", id), { text: editText });
    setEditId(null);
    setEditText("");
  };

  if (!posts.length) {
    return <div className="empty">Aún no hay publicaciones. ¡Sé el primero en postear!</div>;
  }

  return (
    <ul className="post-list">
      {posts.map((p) => (
        <li key={p.id} className="post-card">
          <div className="post-card__header">
            <span className="post-card__author">@{p.authorName ?? "anónimo"}</span>
            {p.createdAt?.toDate ? (
              <time className="post-card__time">
                {p.createdAt.toDate().toLocaleString()}
              </time>
            ) : null}
          </div>

          {editId === p.id ? (
            <>
              <textarea
                className="input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="new-post__actions">
                <button className="btn" onClick={() => handleEdit(p.id)}>Guardar</button>
                <button className="btn btn--outline" onClick={() => setEditId(null)}>Cancelar</button>
              </div>
            </>
          ) : (
            <p className="post-card__text">{p.text}</p>
          )}

          {user?.uid === p.authorId && editId !== p.id && (
            <div className="post-actions">
              <button className="btn btn--outline" onClick={() => { setEditId(p.id); setEditText(p.text); }}>Editar</button>
              <button className="btn btn--outline" onClick={() => handleDelete(p.id)}>Eliminar</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

