import { Fragment } from 'react'

import { Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'

import GroupMembers from 'src/components/GroupMember/GroupMembers'
import Preferences from 'src/components/Preference/Preferences'
import EditUserCell from 'src/components/User/EditUserCell'

const EditUserPage = ({ cuid }) => {
  return (
    <Fragment>
      <EditUserCell cuid={cuid} />
      <Tabs isLazy variant="enclosed">
        <TabList>
          <Tab>Group Members</Tab>
          <Tab>Preferences</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GroupMembers initialQuery={`{"userCuid": "${cuid}"}`} />
          </TabPanel>
          <TabPanel>
            <Preferences initialQuery={`{"userCuid": "${cuid}"}`} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Fragment>
  )
}

export default EditUserPage
