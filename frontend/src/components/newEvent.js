import Modal from 'react-bootstrap/Modal'
import NewEventForm from './newEventForm.js'
import Button from 'react-bootstrap/Button'

import {useState} from 'react'

const NewEvent = ({center, userObj}) => {
  const [newEvent, setNewEvent] = useState(false)
  const [newEventSuccess,setNewEventSuccess] = useState(false)
  const [newEventFailure, setNewEventFailure] = useState(false)
  const toggleNewEvent = () => {
    setNewEvent(!newEvent)
  }

  return (
    <div>
      <Button className = 'rounded' onClick = {toggleNewEvent} variant = 'light'>
        Create new event
      </Button>
      <Modal show = {newEvent} onHide = {toggleNewEvent} >
        <NewEventForm center = {center} toggleNewEvent = {toggleNewEvent} setNewEventSuccess = {setNewEventSuccess} userObj = {userObj} setNewEventFailure = {setNewEventFailure}/>
       </Modal>
    </div>
  )
}
export default NewEvent
