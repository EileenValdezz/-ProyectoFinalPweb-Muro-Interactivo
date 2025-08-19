import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    // Validacion de contraseña: al menos 6 caracteres, numeros y simbolos permitidos
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
    if (!passwordRegex.test(clave)) {
      setErr("La clave solo puede contener letras, números y símbolos");
      return;
    }

    try {
      setLoading(true);

      // Convertimos el usuario en email ficticio para Firebase Auth
      const fakeEmail = `${usuario}@muro.com`;
      await signInWithEmailAndPassword(auth, fakeEmail, clave);

    } catch (e) {
      setErr("Usuario o clave incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container small">
      <h1 className="title center">Iniciar Sesión</h1>
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

        {err && <div className="error">{err}</div>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Iniciar sesión"}
        </button>

        <p className="muted center">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}



