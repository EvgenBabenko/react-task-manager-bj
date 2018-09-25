import React from 'react';
import T from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { clearNotifyMessage } = this.props;

    clearNotifyMessage();
  }

  render() {
    const { notifyMessage } = this.props;

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={!!notifyMessage}
        autoHideDuration={4000}
        onClose={this.handleClose}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={(
          <span id="message-id">
            {notifyMessage}
          </span>
        )}
      />
    );
  }
}

Notification.propTypes = {
  clearNotifyMessage: T.func.isRequired,
  notifyMessage: T.string,
};

Notification.defaultProps = {
  notifyMessage: null,
};

export default Notification;
