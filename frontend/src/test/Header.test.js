import Header from '../components/Header/Header';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

test ('should render component', () => {
    let view = render(<BrowserRouter>
                           <Header/>
                       </BrowserRouter>);

        console.log(prettyDOM(view.container));
})