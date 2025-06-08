import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../../types';
import { UserModal } from '../UserModal/UserModal';
import { SearchBar } from '../SearchBar/SearchBar';
import { Pagination } from '../Pagination/Pagination';
import styles from './UserList.module.css';

type SortField = 'name' | 'address' | 'phone' | 'website' | 'company';
type SortOrder = 'asc' | 'desc';

const ITEMS_PER_PAGE = 5;

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const paginatedAndSortedUsers = useMemo(() => {
    let result = [...users];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query) ||
        user.address.city.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      let compareA, compareB;

      switch (sortField) {
        case 'name':
          compareA = a.name;
          compareB = b.name;
          break;
        case 'address':
          compareA = `${a.address.city}, ${a.address.street}`;
          compareB = `${b.address.city}, ${b.address.street}`;
          break;
        case 'phone':
          compareA = a.phone;
          compareB = b.phone;
          break;
        case 'website':
          compareA = a.website;
          compareB = b.website;
          break;
        case 'company':
          compareA = a.company.name;
          compareB = b.company.name;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return compareA.localeCompare(compareB);
      }
      return compareB.localeCompare(compareA);
    });

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(result.length / ITEMS_PER_PAGE);
    
    // Если текущая страница больше общего количества страниц, корректируем
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }

    // Применяем пагинацию
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return result.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [users, searchQuery, sortField, sortOrder, currentPage]);

  const totalPages = useMemo(() => {
    const filteredLength = users.filter(user => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query) ||
        user.address.city.toLowerCase().includes(query);
    }).length;
    return Math.ceil(filteredLength / ITEMS_PER_PAGE);
  }, [users, searchQuery]);

  if (isLoading) {
    return <div className={styles.loadingState}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <p>{error}</p>
        <button onClick={fetchUsers} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SearchBar onSearch={(value) => {
        setSearchQuery(value);
        setCurrentPage(1);
      }} />
      
      {paginatedAndSortedUsers.length === 0 ? (
        <div className={styles.emptyState}>
          {searchQuery ? 'No users found matching your search' : 'No users found'}
        </div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>
                  NAME / EMAIL {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('address')}>
                  ADDRESS {sortField === 'address' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('phone')}>
                  PHONE {sortField === 'phone' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('website')}>
                  WEBSITE {sortField === 'website' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('company')}>
                  COMPANY {sortField === 'company' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAndSortedUsers.map(user => (
                <tr 
                  key={user.id} 
                  onClick={() => setSelectedUser(user)}
                  className={styles.tableRow}
                >
                  <td data-label="NAME / EMAIL">
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </td>
                  <td data-label="ADDRESS">
                    {user.address.street}, {user.address.city}
                  </td>
                  <td data-label="PHONE">
                    {user.phone}
                  </td>
                  <td data-label="WEBSITE">
                    {user.website}
                  </td>
                  <td data-label="COMPANY">
                    {user.company.name}
                  </td>
                  <td>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id);
                      }}
                      className={styles.deleteButton}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {selectedUser && (
        <UserModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
}; 