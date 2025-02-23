import { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
    role: string | null;
    setRole: (role: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

    return (
        <AuthContext.Provider value={{ role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;