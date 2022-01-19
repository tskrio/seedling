import GroupMembers from 'src/components/GroupMember/GroupMembers'
import { Fragment } from 'react'
import EditUserCell from 'src/components/User/EditUserCell'
import Preferences from 'src/components/Preference/Preferences'
import { Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
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
