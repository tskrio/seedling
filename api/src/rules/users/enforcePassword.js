import { logger } from 'src/lib/logger'
import { UserInputError } from '@redwoodjs/graphql-server';


module.exports = {
  command: async function (incomingData) {
    try {
      //console.log('incomingData', incomingData);
      var data = incomingData.hashedPassword;
      //console.log(`data ${typeof data} ${data}`);
      if (data.length < 4) {
        incomingData._error = {
          abort : true,
          message : 'Password not long enough.  Update not saved'
        }

        //console.log('password less than 4');
        //throw new UserInputError('Password11 not long enough.  Update not saved');

      }
    } catch (e) {
      logger.error(e)
    }
    return await incomingData
  },
  active: true,
  order: 1,
  title: 'enforce Password',
  when: ['before'],
  type: ['update', 'create'],
  name: 'hashpassword',
  file: __filename,
}
