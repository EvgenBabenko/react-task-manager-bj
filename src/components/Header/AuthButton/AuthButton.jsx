import React from 'react';
import T from 'prop-types';
import Button from '@material-ui/core/Button';

import UserMenu from '../UserMenu/UserMenu';
import history from '../../../helpers/history';

const AuthButton = (props) => {
  const { isLogin } = props;

  function handleRedirect() {
    history.push('/login');
  }

  return (
    <React.Fragment>
      {!isLogin
        ? (
          <Button onClick={handleRedirect} color="inherit">
            Login
          </Button>
        )
        : <UserMenu {...props} />
      }
    </React.Fragment>
  );
};

AuthButton.propTypes = {
  isLogin: T.bool.isRequired,
};

export default AuthButton;
