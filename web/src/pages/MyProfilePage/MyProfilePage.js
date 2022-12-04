import { Fragment } from 'react'

//import Preferences from 'src/components/Preference/Preferences'
//import { Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import { MetaTags } from '@redwoodjs/web'

import EditMyProfile from 'src/components/EditMyProfileCell/EditMyProfileCell'
//import { useAuth } from '@redwoodjs/auth'

const MyProfilePage = () => {
  //const { currentUser } = useAuth()
  return (
    <Fragment>
      <MetaTags title="MyProfile" description="MyProfile page" />
      <EditMyProfile />
      {/*<Tabs isLazy variant="enclosed">
        <TabList>
          <Tab>Preferences</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Preferences initialQuery={`{"userId": ${currentUser.id}}`} />
          </TabPanel>
        </TabPanels>
      </Tabs>*/}
    </Fragment>
  )
}

export default MyProfilePage
