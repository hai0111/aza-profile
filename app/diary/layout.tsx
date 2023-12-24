import { Metadata } from 'next';
import React, { FC, ReactNode } from 'react'

import 'react-day-picker/dist/style.css';


export const metadata: Metadata = {
    title: "Aza - Diary",
  }; 

const layout : FC<{children: ReactNode}> = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default layout