import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import T from 'prop-types';
import Button from '@material-ui/core/Button';
import { Portal } from 'react-portal';

const styles = {
  root: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(204, 204, 204)',
    background: 'rgb(255, 255, 255)',
    overflow: 'auto',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '320px',
  },
};

class ModalTaskPreview extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    this.readContent = this.readContent.bind(this);
  }

  componentDidMount() {
    const { formStates: { image } } = this.props;

    if (image) this.readContent(image);
  }

  readContent(image) {
    const fr = new FileReader();

    fr.onload = () => {
      this.myRef.current.src = fr.result;
    };

    fr.readAsDataURL(image);
  }

  render() {
    const {
      formStates: { username, email, text }, handleAddTask, handleClosePreviewTask, classes,
    } = this.props;

    return (
      <Portal>
        <div className={classes.root}>
          <div className={classes.content}>
            <div>
              {'User name: '}
              {username}
            </div>
            <div>
              {'User email: '}
              {email}
            </div>
            <div>
              {'Task description: '}
              {text}
            </div>
            <img ref={this.myRef} width="320" height="240" alt="" />
            <div>
              <Button onClick={handleAddTask} color="primary">
                Add task
              </Button>
              <Button onClick={handleClosePreviewTask} color="primary">
                Close Modal
              </Button>
            </div>
          </div>

        </div>
      </Portal>
    );
  }
}

// ModalTaskPreview.propTypes = {
//   taskList: T.arrayOf(T.any).isRequired,
//   classes: T.objectOf(T.any).isRequired,
// };

export default withStyles(styles)(ModalTaskPreview);
