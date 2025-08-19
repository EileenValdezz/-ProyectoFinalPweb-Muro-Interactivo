import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Register() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
    if (!passwordRegex.test(clave)) {
      setErr("La clave solo puede contener letras, números y símbolos");
      return;
    }

    try {
      setLoading(true);
      const fakeEmail = `${usuario}@muro.com`;

      const userCred = await createUserWithEmailAndPassword(auth, fakeEmail, clave);

      // Guardamos info adicional en Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        usuario,
        nombre,
        apellido,
      });

      alert("Cuenta creada con éxito ✅");

    } catch (e) {
      setErr("Error al crear cuenta: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container small">
      <h1 className="title center">Crear cuenta</h1>
      <form className="card form" onSubmit={onSubmit}>
        <label className="label">Usuario</label>
        <input
          className="input"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <label className="label">Clave</label>
        <input
          className="input"
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />

        <label className="label">Nombre</label>
        <input
          className="input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label className="label">Apellido</label>
        <input
          className="input"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />

        {err && <div className="error">{err}</div>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="muted center">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}
