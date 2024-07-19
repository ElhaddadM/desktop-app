"use client"
import Template from '@/app/Template'
import React, { useState } from 'react'
import TableB from '@/components/TableB'
import { AllDataByGroup } from '../Functions';

function page() {

    

  return (
    <Template Contents ={<TableB  />} />
  )
}

export default page