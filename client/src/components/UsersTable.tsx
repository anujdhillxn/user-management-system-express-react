import React, { useState, useEffect } from 'react';
import Colors from '../styles/colors';
import { User, UserRole } from '../types/context';

interface UsersTableProps {
    users: User[];
    selectedUser: User | null;
    onSelectUser: (user: User) => void;
    onUpdateUser: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, selectedUser, onSelectUser, onUpdateUser }) => {
    const [editedUser, setEditedUser] = useState<User | null>(null);

    useEffect(() => {
        setEditedUser(selectedUser);
    }, [selectedUser]);

    const handleInputChange = (field: string, value: string) => {
        if (editedUser) {
            setEditedUser({ ...editedUser, [field]: value });
        }
    };

    const handleRoleChange = (value: string) => {
        if (editedUser) {
            setEditedUser({ ...editedUser, role: value as UserRole });
        }
    };

    const handleSaveChanges = () => {
        if (editedUser) {
            onUpdateUser(editedUser);
        }
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl mb-6" style={{ color: Colors.Text1 }}>Users</h1>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="p-2" style={{ color: Colors.Text1 }}>Username</th>
                        <th className="p-2" style={{ color: Colors.Text1 }}>Email</th>
                        <th className="p-2" style={{ color: Colors.Text1 }}>Role</th>
                        <th className="p-2" style={{ color: Colors.Text1 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="cursor-pointer hover:bg-gray-700">
                            <td className="p-2" style={{ color: Colors.Text2 }}>
                                {selectedUser?.id === user.id ? (
                                    <input
                                        type="text"
                                        value={editedUser?.username || ''}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        className="w-full p-2 border rounded"
                                        style={{ borderColor: Colors.Text3, backgroundColor: Colors.Background2, color: Colors.Text1 }}
                                    />
                                ) : (
                                    <span onClick={() => onSelectUser(user)}>{user.username}</span>
                                )}
                            </td>
                            <td className="p-2" style={{ color: Colors.Text2 }}>
                                {selectedUser?.id === user.id ? (
                                    <input
                                        type="email"
                                        value={editedUser?.email || ''}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full p-2 border rounded"
                                        style={{ borderColor: Colors.Text3, backgroundColor: Colors.Background2, color: Colors.Text1 }}
                                    />
                                ) : (
                                    <span onClick={() => onSelectUser(user)}>{user.email}</span>
                                )}
                            </td>
                            <td className="p-2" style={{ color: Colors.Text2 }}>
                                {selectedUser?.id === user.id ? (
                                    <select
                                        value={editedUser?.role || ''}
                                        onChange={(e) => handleRoleChange(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        style={{ borderColor: Colors.Text3, backgroundColor: Colors.Background2, color: Colors.Text1 }}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                ) : (
                                    <span onClick={() => onSelectUser(user)}>{user.role}</span>
                                )}
                            </td>
                            <td className="p-2" style={{ color: Colors.Text2 }}>
                                {selectedUser?.id === user.id && (
                                    <button
                                        onClick={handleSaveChanges}
                                        className="p-2 bg-green-500 text-white rounded"
                                        style={{ backgroundColor: Colors.Primary1 }}
                                    >
                                        Save
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;