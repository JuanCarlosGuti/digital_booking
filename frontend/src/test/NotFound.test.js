import NotFound from '../components/NotFound/index';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

test ('should render component', () => {
    let view = render(<BrowserRouter>
                         <NotFound/>
                       </BrowserRouter>);

        console.log(prettyDOM(view.container));
})