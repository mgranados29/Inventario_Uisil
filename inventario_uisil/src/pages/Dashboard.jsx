import { useEffect, useState } from "react";

import { getCurrentUser, logout } from "../auth/auth";

import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";

import { obtenerProductos, insertarProducto, actualizarProducto, eliminarProducto } from "../services/productos";

function Dashboard(){

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    
    const [productos,setProductos]=useState([]);

    const [nombre,setNombre]=useState("");

    const [descripcion,setDescripcion]=useState("");

    const [precio,setPrecio]=useState("");

    const [cantidad,setCantidad]=useState("");

    const [editando,setEditando]=useState(false);

    const [idEditar,setIdEditar]=useState(null);



    useEffect(()=>{
        async function cargar(){
            const user = await getCurrentUser();
            setUsuario(user)
            await cargarProductos();
        }
        cargar();
    },[]);

    async function cerrarSesion() {
        await logout();
        navigate("/")
    }

    async function cargarProductos(){

        const {data,error}=await obtenerProductos();

        if(error){

            console.log(error);

            return;

        }

        setProductos(data);

    }   

    async function guardarProducto() {
        
        if(editando){
            const {error} = await actualizarProducto(
                idEditar,
                {
                    nombre,
                    descripcion,
                    precio,
                    cantidad
                }

            );

            if(error){
                alert(error.message);
                return;
            }
        }else{
               const {error} = await insertarProducto({
                nombre,
                descripcion,
                precio,
                cantidad,
                usuario_id: usuario.id
               }) 

               if(error){
                alert(error.message);
                return;
            }
        }   

        limpiarFormulario();
        cargarProductos();
        
    }

    function limpiarFormulario(){

        setNombre("");

        setDescripcion("");

        setPrecio("");

        setCantidad("");

        setEditando(false);

        setIdEditar(null);

    }

    function editarProducto(producto){

        setNombre(producto.nombre);

        setDescripcion(producto.descripcion);

        setPrecio(producto.precio);

        setCantidad(producto.cantidad);

        setIdEditar(producto.id);

        setEditando(true);

    }

    async function borrarProducto(id){

        if(!confirm("¿Eliminar producto?"))

            return;

        await eliminarProducto(id);

        cargarProductos();

    }



    return(
        <div>
            <Navbar/>
            <h1>Página de Dashboard</h1>
            {
                usuario && (
                    <>
                    <h3>{usuario.email}</h3>
                    <button onClick={cerrarSesion}>Cerrar Sesión</button>
                    <hr/>
                    <h2>Productos</h2>
                    
                        <input
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <br/><br/>
                        <textarea
                            placeholder="Descripción"
                            value={descripcion}
                            onChange={(e)=>setDescripcion(e.target.value)}
                        />

                        <br/><br/>

                        <input
                            type="number"
                            placeholder="Precio"
                            value={precio}
                            onChange={(e)=>setPrecio(e.target.value)}
                        />

                        <br/><br/>

                        <input
                            type="number"
                            placeholder="Cantidad"
                            value={cantidad}
                            onChange={(e)=>setCantidad(e.target.value)}
                        />

                        <br/><br/>

                        <button onClick={guardarProducto}>{editando?"Actualizar":"Guardar"}</button>


                        <div>
                            <h2>Mis productos</h2>
                            {
                                productos.map((producto)=>(
                                <div
                                        key={producto.id}
                                        style={{border:"1px solid gray",padding:10,marginBottom:10}}
                                    >
                                    <h3>
                                        {producto.nombre}
                                    </h3>
                                    <p>
                                        {producto.descripcion}
                                    </p>

                                    <p>
                                        Precio: ₡ {producto.precio}
                                    </p>

                                    <p>
                                        Cantidad: {producto.cantidad}
                                    </p>
                                    <button onClick={()=> editarProducto(producto)}>Editar</button>
                                    <button onClick={()=> borrarProducto(producto.id)}>Eliminar</button>

                                </div>

                                ))
                                }

                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Dashboard;