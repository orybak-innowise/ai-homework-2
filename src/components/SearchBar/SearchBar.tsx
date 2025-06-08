import { ChangeEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search users..."
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
}; 