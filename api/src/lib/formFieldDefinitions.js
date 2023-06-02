import * as FaIcons from 'react-icons/fa';
const FaIconsKeys = Object.keys(FaIcons);
let FaIconsMap = FaIconsKeys.map((icon)=>{
  return {
    label: icon,
    value: icon
  }
})
import * as SiIcons from 'react-icons/si';
const SiIconsKeys = Object.keys(SiIcons)
let SiIconsMap = SiIconsKeys.map((icon)=>{
  return {
    label: icon,
    value: icon
  }
})
import * as MdIcons from 'react-icons/md';
const MdIconsKeys = Object.keys(MdIcons)
let MdIconsMap = MdIconsKeys.map((icon)=>{
  return {
    label: icon,
    value: icon
  }
})


let getFaIconOptions = () => {
    // return an array of objects with label and value
    return Object.keys(FaIcons).map((icon) => ({
      label: icon,
      value: icon,
    }))
  }
export const definitions = {
  /**
   * Options
   * label
   * readOnly
   * required
   * minLength
   * onChange
   * defaultValue
   * defaultOptions (for simple lists) array of strings or objects with label and value
   *
   */
  FormDefinition: {
    //✅
    table: {
      label: 'Table',
    },
    title: {
      label: 'TitleForForm',
    },
    content: {
      label: 'Content',
      type: 'textarea',
    },
  },
  SideBarItem: {
    name: {
      label: 'Name',
    },
    type: {
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Pick something', value: '' },
        { label: 'Internal Link', value: 'link' },
        { label: 'External Link', value: 'externalLink' },
      ]
    },
    link: {
      label: 'Link',
    },
    icon: {
      label: 'Icon',
      type: 'select',
      options: [
        { label: 'Pick something', value: '' },
        ...FaIconsMap,
        ...SiIconsMap,
        ...MdIconsMap,
      ],
    },
    order: {
      label: 'Order',
      type: 'number',
    },
    iconFamily: {
      label: 'Icon Family',
      type: 'select',
      //options: [//this also works
      //  'admin','user','guest'
      //]
      options: [
        { label: 'Pick The Icon family (first two letters) from icon', value: '' },
        { label: 'Material Design', value: 'MdIcons' },
        { label: 'Simple Icons', value: 'SiIcons' },
        { label: 'Font Awesome', value: 'FaIcons' },
      ],
      value: 'cuid',
    },
  },

  Page: {
    //✅
    title: {
      label: 'Title',
      canSort: true,
    },
    slug: {
      label: 'Slug',
      canSort: true,
    },
    content: {
      label: 'Content',
      type: 'code',
    }
  },
  User: {
    //✅
    username: {
      label: 'User Name',
      canSort: false,
      canFilter: true,
      canShowMatching: true,
    },
    name: {
      label: 'Name',
      canSort: true,
    },
  },
  Preference: {
    entity: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    value: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    User: {
      label: 'User',
      field: 'userCuid',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      order: 100,
      type: 'reference',
    },
  },
  Property: {
    name: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    type: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    value: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    //'cuid': {
    //  label: 'Cuid',
    //  fontFamily: 'mono',
    //  canSort: true,
    //  canFilter: true,
    //  canShowMatching: true,
    //},
  },
  Message: {
    language: {
      label: 'Language',
    },
    entity: {
      label: 'Entity',
    },
    value: {
      label: 'Value',
    },
  },
  Group: {
    name: {
      label: 'Name',
      minLength: 3,
    },
    description: {
      label: 'Description',
    },
  },
  GroupRole: {
    createdAt: {
      label: 'Created At',
    },
    role: {
      label: 'Role',
      type: 'select',
      //options: [//this also works
      //  'admin','user','guest'
      //]
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Guest', value: 'guest' },
      ],
      value: 'cuid',
    },
    Group: {
      label: 'Group',
      display: 'name',
      value: 'cuid',
      //type: 'reference2',
      // lets think about this
      // this will need the fields to query
      // this will need the table
      // this will need filter skip and take
      // this will need the default value
      // this will need the default display
      graphql: {
        table: 'group',
        fields: ['name', 'cuid'],
        filter: {},
        skip: 0,
        take: 10,
        defaultDisplay: 'name',
        defaultValue: 'cuid',
      },
    },
  },
  GroupMember: {
    User: {
      label: 'User',
      field: 'userCuid',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      order: 100,
      type: 'reference',
    },

    Group: {
      label: 'Group',
      field: 'groupCuid',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      table: 'group',
      type: 'reference',
      order: 200,
    },
  },
  Log: {
    createdAt: { label: 'Created At' },
    updatedAt: { label: 'Updated At' },
    message: { label: 'Message' },
    source: { label: 'Source' },
  },
}
