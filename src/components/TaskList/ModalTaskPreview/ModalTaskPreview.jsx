import React from 'react';
import T from 'prop-types';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement(document.getElementById('root'));

const ModalTaskPreview = (props) => {
  const {
    formStates, handleAddTask, handleClosePreviewTask, modalTaskIsOpen
  } = props;

  const formValues = formStates || {};

  return (
    <Modal
      isOpen={modalTaskIsOpen}
      // onAfterOpen={this.afterOpenModal}
      onRequestClose={handleClosePreviewTask}
      style={customStyles}
      contentLabel="Preview task mode"
    >
      <h2 ref={subtitle => this.subtitle = subtitle}>Preview task mode</h2>
      <div>I am a modal</div>
      <div>
        {'User name: '}
        {formValues.username || ''}
      </div>
      <div>
        {'User email: '}
        {formValues.email || ''}
      </div>
      <div>
        {'Task description: '}
        {formValues.text || ''}
      </div>
      <Button onClick={handleAddTask} color="primary">
        Add task
      </Button>
      <Button onClick={handleClosePreviewTask} color="primary">
        Close Modal
      </Button>
    </Modal>
  );
};

// ModalTaskPreview.propTypes = {
//   taskList: T.arrayOf(T.any).isRequired,
//   classes: T.objectOf(T.any).isRequired,
// };

export default ModalTaskPreview;
