import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/pl';
import {DatesProvider} from "@mantine/dates";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MantineProvider>
            <DatesProvider settings={{locale: 'pl'}}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </DatesProvider>
        </MantineProvider>
    </StrictMode>
)
