import React from 'react'
import ButtonIcon from './ButtonIcon'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useDarkMode } from '../context/DarkModeContext'

function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <ButtonIcon iconSize='2.1rem' onClick={toggleDarkMode} >
           {isDarkMode?<HiOutlineSun />: <HiOutlineMoon />}
        </ButtonIcon>
    )
}

export default DarkModeToggle