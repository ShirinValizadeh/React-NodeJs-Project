import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class PopUpModal extends React.Component {


    //if is true muss be false  or ...
    toggle = ()=>{
    this.props.closeToggle()
    }



  render() {
      const {toggle} = this
      
      const {className,title,children} = this.props

    return (
      <Modal isOpen={this.props.show} toggle={toggle} >
        <ModalHeader className={className} toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
            {children}
        </ModalBody>
        <ModalFooter>
         
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default  PopUpModal