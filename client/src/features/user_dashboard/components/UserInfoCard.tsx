import { DataList, Input } from '@mantine/core';

export function UserInfoCard() {
    return (
        <div>
            <DataList orientation="vertical" withDivider>
                <DataList.Item>
                    <DataList.ItemLabel>Name</DataList.ItemLabel>
                    <DataList.ItemValue>John Doe <Input placeholder="Enter new name" /></DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel>Email</DataList.ItemLabel>
                    <DataList.ItemValue>john@example.com <Input placeholder="Enter new email" /></DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel>Role</DataList.ItemLabel>
                    <DataList.ItemValue>Software Engineer <Input placeholder="Enter new role" /></DataList.ItemValue>
                </DataList.Item>
            </DataList>
        </div>
    );
}