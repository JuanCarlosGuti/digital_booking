import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { getBookingsByProperty, getUserById } from "../../../../services/fetchService";
import "./ProductOccupants.scss";

/** Vista del propietario: quién reservó esta propiedad y cuándo. El backend ya exige que
 * sea el dueño (o un admin) el que consulte /api/bookings/property/{id} — acá solo evitamos
 * mostrar la sección a quien claramente no la va a poder ver. */
export default function ProductOccupants({ productId, ownerId }) {
  const { session, isAuthenticated } = useAuth();
  const [occupants, setOccupants] = useState(null);

  const isOwner = isAuthenticated && ownerId != null && session.id === ownerId;

  useEffect(() => {
    if (!isOwner || !productId) {
      return undefined;
    }
    let cancelled = false;

    getBookingsByProperty(productId)
      .then(async (bookings) => {
        const withGuests = await Promise.all(
          bookings.map(async (booking) => {
            const guest = await getUserById(booking.userId).catch(() => null);
            return { ...booking, guest };
          })
        );
        if (!cancelled) setOccupants(withGuests);
      })
      .catch(() => {
        if (!cancelled) setOccupants([]);
      });

    return () => {
      cancelled = true;
    };
  }, [isOwner, productId]);

  if (!isOwner) {
    return null;
  }

  return (
    <div className="prodOccupants">
      <div className="prodOccupants__container">
        <h3>Ocupantes de esta propiedad</h3>
        {occupants === null && <p>Cargando ocupantes...</p>}
        {occupants && occupants.length === 0 && <p>Todavía no tenés reservas para esta propiedad.</p>}
        {occupants && occupants.length > 0 && (
          <ul className="prodOccupants__list">
            {occupants.map((o) => (
              <li key={o.id} className="prodOccupants__item">
                <span className="prodOccupants__guest">
                  {o.guest ? `${o.guest.name} ${o.guest.lastname}` : `Huésped #${o.userId}`}
                </span>
                <span className="prodOccupants__dates">
                  {o.checkIn} → {o.checkOut}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
