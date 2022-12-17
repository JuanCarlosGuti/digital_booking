import CategoryList from '../components/Body/CategoryList/CategoryList';
import React from 'react';
import { ReactDOM } from 'react';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';




    it('prueba',()=>{
        render(<CategoryList/>);
        expect(screen.getByText('Buscar por tipo de alojamiento')).toBeInTheDocument();

    })
