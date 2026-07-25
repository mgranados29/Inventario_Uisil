import { useState } from "react";
import { login } from "../auth/auth";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Login(){

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function iniciarSesion(e) {
        e.preventDefault();

        const {error} = await login(email, password)

        if(error){
            alert(error.message);
            return
        }

        navigate("/dashboard")
    }

    return(
        <div>
            <Navbar/>
            <h1>Página de Login</h1>
            <form onSubmit={iniciarSesion}>
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>

                <button>Iniciar Sesion</button>
            </form>
        </div>
    );
}

export default Login;