import { useState } from "react";
import { register } from "../auth/auth";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function Register(){
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registrarUsuario(e) {
        e.preventDefault();
        const {data, error} = await register(email, password);

        if(error){
            alert(error.message)
            return;
        }

        await supabase.from("perfiles").insert({
            id: data.user.id,
            nombre,
            telefono
        });

        alert("Usuario registrado correctamente");
        navigate("/")
        
    }

    return(
        <div>
            <Navbar/>
            <h1>Página de Registro de usuario</h1>
            <form onSubmit={registrarUsuario}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <br/>

                <input
                    type="text"
                    placeholder="Telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <br/>

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

                <button>Registrarse</button>

            </form>
        </div>
    );
}

export default Register;