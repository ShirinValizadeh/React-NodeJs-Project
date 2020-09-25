import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmModal extends React.Component {


  //if is true muss be false  or ...
  confirm = () => {
    this.props.onConfirm(this.props.payload)

  }

  toggle = () => {
    // this.props.DltToggle()
    this.props.close()
  }


  render() {
    console.log(this.props);
    const { toggle, confirm } = this

    const { className, title, children } = this.props

    return (
      <Modal isOpen={this.props.show} toggle={toggle} >
        <ModalHeader className={className} toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirm}>Delete</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ConfirmModal