/**
 * @jest-environment jsdom
 */

import React from 'react'
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {ToolbarButton, ToolBar} from './toolbar'

afterEach(cleanup)

test('Link changes the class when hovered', () => {
    let toggled = false
    const onToggle = (arg0: string) => {
        toggled = !toggled
    }

    const initialProps = {
        key: 'test',
        label: 'test',
        onToggle: onToggle,
        style: ''
    }

    render(<ToolbarButton {...initialProps}/>,)

    expect(screen.getByText('test')).toBeTruthy()

    fireEvent.click(screen.getByText('test'))

    expect(screen.getByText('test')).toBeTruthy()
    expect(toggled).toBeTruthy()
})