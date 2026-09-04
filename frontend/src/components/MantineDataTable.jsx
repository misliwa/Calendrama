import {useState} from 'react';
import {Table, Checkbox, ActionIcon, Menu, Group, Button} from '@mantine/core';
import {IconDots} from '@tabler/icons-react';

function MantineDataTable({columns, data, onAdd, onEdit, onDelete, onDeleteSelected, additionalButtons}) {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(data.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRows = (rowId) => {
        setSelectedRows(prev =>
            prev.includes(rowId)
                ? prev.filter(id => id !== rowId)
                : [...prev, rowId]
        );
    };

    const rows = data.map((row) => (
        <Table.Tr
            key={row.id}
            bg={selectedRows.includes(row.id) ? 'var(--mantine-color-blue-light)' : undefined}
        >
            <Table.Td>
                <Checkbox
                    type="checkbox"
                    aria-label="Select row"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRows(row.id)}
                />
            </Table.Td>
            {columns.map(column => (
                <Table.Td key={column.name}>
                    {column.getValue(row)}
                </Table.Td>
            ))}

            <Table.Td className="text-end">
                <Menu>
                    <Menu.Target>
                        <ActionIcon>
                            <IconDots size={16}/>
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item onClick={() => onEdit(row)}>
                            Edytuj
                        </Menu.Item>

                        <Menu.Item onClick={() => onDelete(row.id)}>
                            Usuń
                        </Menu.Item>

                        {additionalButtons?.map((button) => (
                                <Menu.Item key={button.name} onClick={() => button.handleClick(row.id)}>
                                    {button.text}
                                </Menu.Item>
                            )
                        )}
                    </Menu.Dropdown>
                </Menu>
            </Table.Td>
        </Table.Tr>
    ))


    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px', overflow: 'hidden' }}>
        <Table.ScrollContainer minWidth={500} style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
                <Table striped highlightOnHover withTableBorder stickyHeader bg="white">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <Checkbox
                                    aria-label="Select row"
                                    checked={
                                        data.length !== 0 &&
                                        selectedRows.length === data.length
                                    }
                                    onChange={handleSelectAll}
                                />
                            </Table.Th>
                            {columns.map((column) => (
                                    <Table.Th key={column.name}>{column.name}</Table.Th>
                                )
                            )}
                            <Table.Th ta="right">
                                Akcje
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            <Group justify="flex-end" style={{ flexShrink: 0 }}>
                <Button type="button" variant="filled" onClick={() => onAdd()}>
                    Dodaj
                </Button>

                <Button type="button" variant="filled" color="red"
                        onClick={() => onDeleteSelected(selectedRows)}
                        disabled={selectedRows.length === 0}
                >
                    Usuń zaznaczone
                </Button>
            </Group>
        </div>
    );
}

export default MantineDataTable;