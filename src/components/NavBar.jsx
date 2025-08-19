import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function NavBar({ user, onLogout }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
 
  useEffect(() => {
    const fetchFullName = async () => {
      if (user) {
        // Intentamos obtener nombre completo de Firestore
        try {
          const docRef = doc(db, "users", user.uid);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.data();
            setFullName(`${data.nombre} ${data.apellido}`);
          } else {
            // Si no hay info en Firestore, usamos displayName o email
            setFullName(user.displayName || user.email?.split("@")[0]);
          }
        } catch (err) {
          setFullName(user.displayName || user.email?.split("@")[0]);
        }
      } else {
        setFullName("");
      }
    };

    fetchFullName();
  }, [user]);

  const handleLogout = async () => {
    if (window.confirm("¿Deseas cerrar sesión?")) {
      await signOut(auth);
      alert("Has cerrado sesión ✅");
      if (onLogout) onLogout();
      navigate("/");
    }
  };

  return (
    <header className="nav">
      <div className="nav__brand">
        <span className="brand">Muro Interactivo 💗</span>
      </div>

      <nav className="nav__links">
        {!user && (
          <Link className={`nav__link ${pathname === "/" ? "active" : ""}`} to="/">
            Inicio
          </Link>
        )}

        {!user && (
          <>
            <Link className={`nav__link ${pathname === "/login" ? "active" : ""}`} to="/login">
              Iniciar Sesión
            </Link>
            <Link className={`nav__link ${pathname === "/register" ? "active" : ""}`} to="/register">
              Crear Cuenta
            </Link>
          </>
        )}

        {user && (
          <>
            <span>Hola, {fullName}</span>
            <button className="btn btn--outline" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

