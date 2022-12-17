
import ProductImages from '../components/Body/Product/ProductImages';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

test ('should render component', () => {
    let view = render(<BrowserRouter>
            <ProductImages/>
            </BrowserRouter>);

        console.log(prettyDOM(view.container));
})
