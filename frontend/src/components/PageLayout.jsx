import {Paper, Stack, Title} from "@mantine/core";

function PageLayout({ title, children }) {
    return (
        <Stack gap="md" h="100%">
            <Paper radius="md" p="md" shadow="sm">
                <Title order={5}>{title}</Title>
            </Paper>

            <Paper sstyle={{
                flex: 1,
                minHeight: 0,
                display: 'flex',        
                flexDirection: 'column'
            }}
                   p="md">
                {children}
            </Paper>
        </Stack>
    );
}

export default PageLayout;