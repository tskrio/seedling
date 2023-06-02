import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import FormDefinitionCell from 'src/components/FormDefinitionCell'
import {
  getSchema,
  readGQL,
  getRecord,
  tableNames,
} from 'src/lib/atomicFunctions'

const FormPage = ({ table, cuid }) => {
  let { pascalTable, pluralTable, singularTable } = tableNames({ table })

  return (
    <>
      <MetaTags title="Form" description="Form page" />
      <FormDefinitionCell
        table={table}
        cuid={cuid}
      />
    </>
  )
}

export default FormPage
