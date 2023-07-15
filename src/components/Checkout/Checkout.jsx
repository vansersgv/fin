
import { useState, useContext } from "react";
import { CarritoContext } from '../../context/CarritoContext';
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import './Checkout.css';

const Checkout = () => {
    const { carrito, total, vaciarCarrito, cantidadTotal } = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [orderId, setOrdenId] = useState("");

    const manejadorFormulario = (e) => {
        e.preventDefault();
        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor complete todos los campos");
            return;
        }
        if (email !== emailConfirmacion) {
            setError("Los campos del email no coinciden");
            return;
        }

        const orden = {
            items: carrito.map((producto) => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad
            })),
            total: cantidadTotal,
            nombre,
            apellido,
            telefono,
            email,
            fecha: new Date()
        };

        Promise.all(
            orden.items.map(async (productoOrden) => {
                const productoRef = doc(db, "productos", productoOrden.id);
                const productoDoc = await getDoc(productoRef);
                const stockActual = productoDoc.data().stock;
                await updateDoc(productoRef, {
                    stock: stockActual - productoOrden.cantidad
                });
            })
        )
            .then(() => {
                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id);
                        vaciarCarrito();
                    })
                    .catch((error) => {
                        console.log("Error al crear la orden", error);
                        setError("Error al crear la orden, intente nuevamente");
                    });
            })
            .catch((error) => {
                console.log("Error al actualizar el stock", error);
                setError("Error al actualizar el stock, inténtelo nuevamente");
            });
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <form onSubmit={manejadorFormulario} className="formulario">
                <div className="carrito-items">
                    {carrito.map((producto) => (
                        <div key={producto.id} className="carrito-item">
                            <p>{producto.item.nombre} x {producto.cantidad}</p>
                            <p>Precio: $ {producto.item.precio}</p>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="total">
                    <h3>Total de la compra: $ {total}</h3>
                </div>
                <hr />
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="text" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="emailConfirmacion">Confirmar Email</label>
                    <input type="email" id="emailConfirmacion" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="btn-finalizar">Finalizar Compra</button>
            </form>
            {orderId && (
                <strong className="ordenId">¡Gracias por tu compra! Tu número de orden es {orderId}</strong>
            )}
        </div>
    );
};

export default Checkout;

