
import Register from '../components/Body/Register/Register';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

test ('should render component', () => {
    let view = render(<BrowserRouter>
            <Register/>
            </BrowserRouter>);

        console.log(prettyDOM(view.container));
})