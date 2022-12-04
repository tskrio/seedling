import { Fragment } from 'react'

import { Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'

import GroupMembers from 'src/components/GroupMember/GroupMembers'
import Preferences from 'src/components/Preference/Preferences'
import EditUserCell from 'src/components/User/EditUserCell'

const EditUserPage = ({ id }) => {
  return (
    <Fragment>
      <EditUserCell id={id} />
      <Tabs isLazy variant="enclosed">
        <TabList>
          <Tab>Group Members</Tab>
          <Tab>Preferences</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GroupMembers initialQuery={`{"userId": ${id}}`} />
          </TabPanel>
          <TabPanel>
            <Preferences initialQuery={`{"userId": ${id}}`} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Fragment>
  )
}

export default EditUserPage
