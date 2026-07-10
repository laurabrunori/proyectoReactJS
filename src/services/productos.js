import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

const productosRef = collection(db, "productos");

export async function obtenerProductos() {
  const snapshot = await getDocs(productosRef);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
}

export async function agregarProducto(producto) {
  return await addDoc(productosRef, producto);
}

export async function editarProducto(id, producto) {
  return await updateDoc(doc(db, "productos", id), producto);
}

export async function eliminarProducto(id) {
  return await deleteDoc(doc(db, "productos", id));
}

export async function obtenerProducto(id) {
  const referencia = doc(db, "productos", id);

  const respuesta = await getDoc(referencia);

  if (!respuesta.exists()) {
    return null;
  }

  return {
    id: respuesta.id,
    ...respuesta.data(),
  };
}