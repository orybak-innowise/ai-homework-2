import { User } from '../../types';
import styles from './UserModal.module.css';

interface UserModalProps {
  user: User;
  onClose: () => void;
}

export const UserModal = ({ user, onClose }: UserModalProps) => {
  const mapLink = `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.content}>
          <h2>{user.name}</h2>
          <a href={`mailto:${user.email}`} className={styles.email}>{user.email}</a>

          <div className={styles.section}>
            <h3>Address</h3>
            <p>{user.address.street}, Apt. {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
            <a href={mapLink} className={styles.mapLink}>
              <span className={styles.mapIcon}>📍</span> View on map
            </a>
          </div>

          <div className={styles.section}>
            <h3>Contact</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactRow}>
                <span>Phone:</span>
                <span>{user.phone}</span>
              </div>
              <div className={styles.contactRow}>
                <span>Website:</span>
                <a href={`https://${user.website}`}>{user.website}</a>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Company</h3>
            <div className={styles.companyInfo}>
              <div className={styles.contactRow}>
                <span>Name:</span>
                <span>{user.company.name}</span>
              </div>
              <div className={styles.contactRow}>
                <span>Catchphrase:</span>
                <span>{user.company.catchPhrase}</span>
              </div>
              <div className={styles.contactRow}>
                <span>Business:</span>
                <span>{user.company.bs}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 