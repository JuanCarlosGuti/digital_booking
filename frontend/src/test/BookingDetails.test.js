
import BookingDetails from '../components/Body/Booking/BookingDetails';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

test ('should render component', () => {
    let view = render(
             <BrowserRouter>
          <BookingDetails/>
            </BrowserRouter>);

        console.log(prettyDOM(view.container));
})