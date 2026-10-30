import { DataList } from '@mantine/core';
import { useAuth } from '../../auth/hooks/useAuth';



export function UserInfoCard() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div>
            
        </div>
    );
}