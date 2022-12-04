//import { routes } from '@redwoodjs/router'

import ShareButton from './ShareButton'

//import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const generated = () => {
  let column = {
    Header: '⚙️',
    accessor: 'actions',
    canSort: false,
    canRemove: false,
    canReset: true,
    canExport: true,
    canSetTake: true,
    canUpVote: false,
    canReport: false,
    canShare: true,
    canAddParticipant: true,
  }
  let row = {
    id: 205459,
    title:
      'CMDB - difference between business service offering and technical service offering records',
    url: 'http://www.cloudminus89.com/2022/03/cmdb-difference-between-business.html',
    createdAt: '2022-03-07T12:07:00.000Z',
    feed: {
      title: 'cloudminus89.com',
      feedIcon: 'Text',
      id: 15,
      __typename: 'Feed',
    },
    FeedItemParticipant: [
      {
        id: 99543,
        participant: {
          id: 110,
          name: 'Ruen Smith',
          active: true,
          __typename: 'Participant',
        },
        __typename: 'FeedItemParticipant',
      },
      {
        id: 99962,
        participant: {
          id: 776405,
          name: 'noreply@blogger.com (Ruen Smith)',
          active: true,
          __typename: 'Participant',
        },
        __typename: 'FeedItemParticipant',
      },
    ],
    __typename: 'Item',
  }
  return <ShareButton column={column} row={row} />
}

export const canShareIsFalse = () => {
  let column = {
    Header: '⚙️',
    accessor: 'actions',
    canSort: false,
    canRemove: false,
    canReset: true,
    canExport: true,
    canSetTake: true,
    canUpVote: false,
    canReport: false,
    canShare: false,
    canAddParticipant: true,
  }
  let row = {
    id: 205459,
    title:
      'CMDB - difference between business service offering and technical service offering records',
    url: 'http://www.cloudminus89.com/2022/03/cmdb-difference-between-business.html',
    createdAt: '2022-03-07T12:07:00.000Z',
    feed: {
      title: 'cloudminus89.com',
      feedIcon: 'Text',
      id: 15,
      __typename: 'Feed',
    },
    FeedItemParticipant: [
      {
        id: 99543,
        participant: {
          id: 110,
          name: 'Ruen Smith',
          active: true,
          __typename: 'Participant',
        },
        __typename: 'FeedItemParticipant',
      },
      {
        id: 99962,
        participant: {
          id: 776405,
          name: 'noreply@blogger.com (Ruen Smith)',
          active: true,
          __typename: 'Participant',
        },
        __typename: 'FeedItemParticipant',
      },
    ],
    __typename: 'Item',
  }
  return <ShareButton column={column} row={row} />
}

export default { title: 'Components/ShareButton' }
