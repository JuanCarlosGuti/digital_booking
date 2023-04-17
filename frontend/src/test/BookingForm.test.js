
import BookingForm from '../components/Body/Booking/BookingForm';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

test ('should render component', () => {
    let view = render(<BrowserRouter>
            <BookingForm/>
            </BrowserRouter>);

        console.log(prettyDOM(view.container));
})