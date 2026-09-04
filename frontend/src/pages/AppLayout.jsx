import {Outlet} from "react-router-dom";
import MantineNavBar from "../components/MantineNavBar.jsx";
import {AppShell, Burger, Center, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";

function AppLayout(){

    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            layout="alt"
            padding="md"
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
        >
            <AppShell.Header>
                <Center h="100%">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                        style={{ position: 'absolute', left: 16 }}
                    />
                    <Title order={2}>Calendrama</Title>
                </Center>

            </AppShell.Header>

            <AppShell.Navbar>
                <MantineNavBar />
            </AppShell.Navbar>

            <AppShell.Main style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

export default AppLayout;