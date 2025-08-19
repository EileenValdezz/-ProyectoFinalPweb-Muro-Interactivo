import PostList from "../components/PostList";
import NewPost from "../components/NewPost";

export default function Home({ user }) {
  return (
    <div className="container">
       {!user && <h1 className="title">Pagina Principal</h1>}

      {user ? (
        <>
          <NewPost user={user} />
          <div className="card">
            <h2 className="subtitle">Últimas publicaciones</h2>
            <PostList user={user} />
          </div>
        </>
      ) : (
        <>
          <p className="lead">
            Bienvenido al Muro Interactivo. Puedes leer las publicaciones sin iniciar sesión.
            Si te registras, podrás crear tus propios posts.
          </p>
          <div className="card">
            <h2 className="subtitle">Últimas publicaciones</h2>
            <PostList user={user} />
          </div>
        </>
      )}
    </div>
  );
}
