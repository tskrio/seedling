import React from 'react'
import Modal from 'react-modal'
import { useMutation } from '@redwoodjs/web'
import { Column } from './Column'
import { useAuth } from '@redwoodjs/auth'
import { UPDATE_USER_MUTATION } from 'src/components/User/EditUserCell'
const UserPreferencesModal = (data) => {
  const { currentUser } = useAuth()
  const [updateUserPreferences] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User preferences updated.')
    },
  })
  let moveKey = (direction, key) => {
    let newPreferences = data.myColumns
    console.log('newPreferences', newPreferences)
    // swap the key with the one above or below it
    if (direction === 'up') {
      // loop over the columns and find the one with the key
      data.myColumns.forEach((column, index) => {
        //if the key is found, swap it with the one above it
        if (column.key === key) {
          if (index > 0) {
            let temp = newPreferences[index - 1]
            newPreferences[index - 1] = newPreferences[index]
            newPreferences[index] = temp
          }
        }
      })
    } else if (direction === 'down') {
      // swap the key with the one below it
      // loop over the columns and find the one with the key
      data.myColumns.forEach((column, index) => {
        // if the key is found, swap it with the one below it
        if (column.key === key) {
          console.log(
            'index',
            index,
            'length',
            data.myColumns.length,
            'key',
            key
          )
          if (index < data.myColumns.length - 1) {
            let temp = newPreferences[index + 1]
            console.log('key', key, 'temp', temp)
            newPreferences[index + 1] = newPreferences[index]
            newPreferences[index] = temp
          }
        }
      })
    }

    console.log('newPreferences after', newPreferences)
    updateUserPreferences({
      variables: {
        id: currentUser.id,
        myColumns: newPreferences,
      },
    })
  }

  let myColumnsElements = (things) => {
    let downArrow = (column) => {
      return (
        <button onClick={() => moveKey('down', column.key)}>
          <span role="img" aria-label="down arrow">
            🔽
          </span>
        </button>
      )
    }
    let upArrow = (
      <span role="img" aria-label="up arrow">
        🔼
      </span>
    )
    return things.map((thing, index) => {
      let controls
      if (index === 0) {
        controls = (
          <div>
            <div></div>
            <div>{downArrow(thing)}</div>
          </div>
        )
      } else if (index === things.length - 1) {
        controls = (
          <div>
            <div>{upArrow}</div>
            <div></div>
          </div>
        )
      } else {
        controls = (
          <div>
            <div>🔼</div>
            <div>🔽</div>
          </div>
        )
      }
      return (
        <Column key={thing.key} columnObj={thing}>
          {controls}
        </Column>
      )
    })
  }
  let removeField = (field) => {
    console.log('removing field', field, usersColumns)
    let newColumns = usersColumns.filter((column) => {
      return column.key !== field
    })
    console.log('newColumns', newColumns)
    let justColumns = newColumns.map((column) => {
      return column.key
    })
    currentUser.preferences[meta.labels.single + 'Fields'] = justColumns
    updateUserPreferences({
      variables: {
        id: currentUser.id,
        input: { preferences: currentUser.preferences },
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: query }],
      awaitRefetchQueries: true,
    })
  }

  Modal.setAppElement('#redwood-app')
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }
  let subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
        <p>myColumns: {JSON.stringify(data.myColumns)}</p>
        {myColumnsElements(data.myColumns)}
        <br />
        <p>allColumns: {JSON.stringify(data.allColumns)}</p>
      </Modal>
    </div>
  )
}

export default UserPreferencesModal
