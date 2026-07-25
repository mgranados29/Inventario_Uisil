import {supabase} from "./supabase";

export async function obtenerProductos() {
    
    return await supabase.from("productos").select("*").order("id")
}

export async function insertarProducto(producto) {
    
    return await supabase.from("productos").insert(producto)
}

export async function actualizarProducto(id, producto) {
    
    return await supabase.from("productos").update(producto).eq("id", id)
}

export async function eliminarProducto(id) {
    
    return await supabase.from("productos").delete().eq("id", id)
}