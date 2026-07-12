import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

const cuponesRef = collection(db, "cupones");

// Obtener todos los cupones
export async function obtenerCupones() {
  const snapshot = await getDocs(cuponesRef);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
}

// Agregar cupón
export async function agregarCupon(cupon) {
  return await addDoc(cuponesRef, cupon);
}

// Editar cupón
export async function editarCupon(id, cupon) {
  return await updateDoc(doc(db, "cupones", id), cupon);
}

// Eliminar cupón
export async function eliminarCupon(id) {
  return await deleteDoc(doc(db, "cupones", id));
}

// Obtener un cupón por ID
export async function obtenerCupon(id) {
  const referencia = doc(db, "cupones", id);

  const respuesta = await getDoc(referencia);

  return {
    id: respuesta.id,
    ...respuesta.data(),
  };
}

// Buscar cupón por código
export async function buscarCupon(codigo) {
  const consulta = query(
    cuponesRef,
    where("codigo", "==", codigo.toUpperCase())
  );

  const resultado = await getDocs(consulta);

  if (resultado.empty) return null;

  return {
    id: resultado.docs[0].id,
    ...resultado.docs[0].data(),
  };
}