import { routes } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import PropertiesCell from 'src/components/Property/PropertiesCell'
import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Id',
    accessor: 'id',
    link: (givenId) => {
      return routes.property({ id: givenId })
    },
    dataType: 'integer',

    showMatching,
    filterOut,
    /*
  {
  "name": "id",
  "kind": "scalar",
  "isList": false,
  "isRequired": true,
  "isUnique": false,
  "isId": true,
  "isReadOnly": false,
  "type": "Int",
  "hasDefaultValue": true,
  "default": {
  "name": "autoincrement",
  "args": []
  },
  "isGenerated": false,
  "isUpdatedAt": false,
  "label": "Id",
  "component": "NumberField",
  "defaultProp": "defaultValue",
  "deserilizeFunction": "",
  "validation": "{{ required: true }}",
  "listDisplayFunction": "truncate"
  }
  */
  },

  {
    Header: 'Created at',
    accessor: 'createdAt',

    dataType: 'timestamp',
    showMatching,
    filterOut,
    /*
  {
  "name": "createdAt",
  "kind": "scalar",
  "isList": false,
  "isRequired": true,
  "isUnique": false,
  "isId": false,
  "isReadOnly": false,
  "type": "DateTime",
  "hasDefaultValue": true,
  "default": {
  "name": "now",
  "args": []
  },
  "isGenerated": false,
  "isUpdatedAt": false,
  "label": "Created at",
  "component": "DatetimeLocalField",
  "defaultProp": "defaultValue",
  "deserilizeFunction": "formatDatetime",
  "validation": "{{ required: true }}",
  "listDisplayFunction": "timeTag",
  "displayFunction": "timeTag"
  }
  */
  },

  {
    Header: 'Updated at',
    accessor: 'updatedAt',

    dataType: 'timestamp',
    showMatching,
    filterOut,
    /*
  {
  "name": "updatedAt",
  "kind": "scalar",
  "isList": false,
  "isRequired": true,
  "isUnique": false,
  "isId": false,
  "isReadOnly": false,
  "type": "DateTime",
  "hasDefaultValue": false,
  "isGenerated": false,
  "isUpdatedAt": true,
  "label": "Updated at",
  "component": "DatetimeLocalField",
  "defaultProp": "defaultValue",
  "deserilizeFunction": "formatDatetime",
  "validation": "{{ required: true }}",
  "listDisplayFunction": "timeTag",
  "displayFunction": "timeTag"
  }
  */
  },

  {
    Header: 'Entity',
    accessor: 'entity',

    showMatching,
    filterOut,
    /*
  {
  "name": "entity",
  "kind": "scalar",
  "isList": false,
  "isRequired": true,
  "isUnique": false,
  "isId": false,
  "isReadOnly": false,
  "type": "String",
  "hasDefaultValue": false,
  "isGenerated": false,
  "isUpdatedAt": false,
  "label": "Entity",
  "component": "TextField",
  "defaultProp": "defaultValue",
  "deserilizeFunction": "",
  "validation": "{{ required: true }}",
  "listDisplayFunction": "truncate"
  }
  */
  },

  {
    Header: 'Value',
    accessor: 'value',

    showMatching,
    filterOut,
    /*
  {
  "name": "value",
  "kind": "scalar",
  "isList": false,
  "isRequired": false,
  "isUnique": false,
  "isId": false,
  "isReadOnly": false,
  "type": "String",
  "hasDefaultValue": false,
  "isGenerated": false,
  "isUpdatedAt": false,
  "label": "Value",
  "component": "TextField",
  "defaultProp": "defaultValue",
  "deserilizeFunction": "",
  "validation": null,
  "listDisplayFunction": "truncate"
  }
  */
  },

  {
    Header: 'Actions',
    accessor: 'actions',
    canSort: false,
    canRemove: false,
    canReset: true,
    canExport: true,
    canSetTake: true,
  },
]

const PropertiesList = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query // TODO: Fix this doesnt work
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'propertyCreate',
    updateRecord: 'propertyUpdate',
    deleteRecord: 'propertyDelete',
  }

  return (
    <Fragment>
      <PropertiesCell
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        columns={columns}
        setColumns={setColumns}
        initialColumns={initialColumns}
        take={take}
        setTake={setTake}
        skip={skip}
        setSkip={setSkip}
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        displayColumn="entity"
        roles={roles}
      />
    </Fragment>
  )
}

export default PropertiesList
