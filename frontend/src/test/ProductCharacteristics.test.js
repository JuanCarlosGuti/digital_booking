
import ProductCharacteristics from '../components/Body/Product/ProductCharacteristics';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

test ('should render component', () => {
    let view = render(<BrowserRouter>
            <ProductCharacteristics/>
            </BrowserRouter>);

        console.log(prettyDOM(view.container));
})
