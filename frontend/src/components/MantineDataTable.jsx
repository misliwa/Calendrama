// import {Accordion, Table} from "@mantine/core";
//
// const staffingRows = staffingData.map((element) => (
//     <Table.Tr key={element.id}>
//         <Table.Td>{element.id}</Table.Td>
//         <Table.Td>{element.profession}</Table.Td>
//         <Table.Td>{element.roleName}</Table.Td>
//         <Table.Td>
//             <Accordion radius="xs" order={3} defaultValue="Apples">
//                 <Accordion.Item value={"Pracownicy"}>
//                     <Accordion.Control icon={"👤"}>Pracownicy</Accordion.Control>
//                     <Accordion.Panel>Tutaj lista pracowników</Accordion.Panel>
//                 </Accordion.Item>                </Accordion>
//         </Table.Td>
//     </Table.Tr>
// ));
//
// <Table striped highlightOnHover stickyHeader stickyHeaderOffset={60}>
//     <Table.Thead>
//         <Table.Tr>
//             <Table.Th>id</Table.Th>
//             <Table.Th>Zawód</Table.Th>
//             <Table.Th>Nazwa roli</Table.Th>
//             <Table.Th>Akcje</Table.Th>
//         </Table.Tr>
//     </Table.Thead>
//     <Table.Tbody>{staffingRows}</Table.Tbody>
// </Table>