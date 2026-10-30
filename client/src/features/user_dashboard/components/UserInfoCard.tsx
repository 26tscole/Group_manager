import { DataList, Paper } from '@mantine/core';
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
            <Paper shadow="xs" p="xl">
                <DataList orientation="vertical" withDivider>
                    {Object.entries(user)
                        .filter(([key]) => key !== 'id')
                        .map(([key, value]) => (
                            <DataList.Item key={key}>
                                <DataList.ItemLabel>
                                    {key.replaceAll('_', ' ').replace(/^./, (letter) => letter.toUpperCase())}
                                </DataList.ItemLabel>
                                <DataList.ItemValue>{value}</DataList.ItemValue>
                            </DataList.Item>
                        ))}
                </DataList>
            </Paper>
        </div>
    );
}