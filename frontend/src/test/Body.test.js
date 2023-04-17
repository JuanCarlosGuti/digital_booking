import Body from '../components/Body/Body';
import {render, prettyDOM} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';


test ('should render component', () => {
    let view = render(<BrowserRouter>
            <Body/>
            </BrowserRouter>);

        console.log(prettyDOM(view.container));

})
