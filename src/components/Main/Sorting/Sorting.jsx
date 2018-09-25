import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = {
  root: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'baseline',
    marginTop: '10px',
    marginBottom: '10px',
  },
};

const Sorting = (props) => {
  const {
    handleChangeSortByField, handleChangeSortDirection, sortByField, sortDirection, classes,
  } = props;

  const mapSortByField = [
    'id',
    'username',
    'email',
    'status',
  ];

  const mapSortDirection = [
    'asc',
    'desc',
  ];

  return (
    <div className={classes.root}>
      <p>Sort by:</p>
      <div>
        <FormControl>
          <InputLabel>
            field
          </InputLabel>
          <Select
            value={sortByField}
            onChange={handleChangeSortByField}
          >
            {mapSortByField.map(field => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <p>Sort :</p>
      <div>
        <FormControl>
          <InputLabel>
            direction
          </InputLabel>
          <Select
            value={sortDirection}
            onChange={handleChangeSortDirection}
          >
            {mapSortDirection.map(field => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

    </div>
  );
};

Sorting.propTypes = {
  classes: T.objectOf(T.any).isRequired,
  handleChangeSortByField: T.func.isRequired,
  handleChangeSortDirection: T.func.isRequired,
  sortByField: T.string.isRequired,
  sortDirection: T.string.isRequired,
};

export default withStyles(styles)(Sorting);
