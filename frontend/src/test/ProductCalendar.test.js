
import ProductCalendar from '../components/Body/Product/ProductCalendar';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

test ('should render component', () => {
    let view = render(<BrowserRouter>
            <ProductCalendar/>
            </BrowserRouter>);

        console.log(prettyDOM(view.container));
})

