import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const Sorting = (props) => {
  const {
    handleChangeSortBy, sortBy,
  } = props;

  const mapSortFields = [
    'id',
    'username',
    'email',
    'status',
  ];

  return (
    <div>
      {'Sort by '}
      <form autoComplete="off">
        <FormControl>
          <InputLabel>
            field
          </InputLabel>
          <Select
            value={sortBy}
            onChange={handleChangeSortBy}
          >
            {mapSortFields.map(field => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

// Sorting.propTypes = {
//   taskList: T.arrayOf(T.any).isRequired,
//   classes: T.objectOf(T.any).isRequired,
// };

export default Sorting;
