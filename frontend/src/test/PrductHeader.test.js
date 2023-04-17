
import ProductHeader from '../components/Body/Product/ProductHeader/index';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

test ('should render component', () => {
    let view = render(<BrowserRouter>
                    <ProductHeader/>
                </BrowserRouter>);


        console.log(prettyDOM(view.container));
})
