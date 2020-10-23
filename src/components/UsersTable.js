import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  headCell: {
    fontWeight: 600,
  },
}));

export const UsersTable = ({data}) => {
  const classes = useStyles();
  const [isChronological, setIsChronological] = React.useState(false);

  const changeSortingDirection = () => {
    setIsChronological(!isChronological);
  };

  const compareByTimestamps = (a, b) => {
    const result = Math.sign(a.timestamp - b.timestamp);

    return isChronological ? result : -result;
  };

  const getDateString = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
      month = '0' + month;
    }

    return `${day}-${month}-${year}`;
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            size={'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  className={classes.headCell}
                  sortDirection={isChronological ? 'asc' : 'desc'}
                >
                  <TableSortLabel
                    direction={isChronological ? 'asc' : 'desc'}
                    onClick={changeSortingDirection}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.headCell}>User ID</TableCell>
                <TableCell className={classes.headCell}>Old value</TableCell>
                <TableCell className={classes.headCell}>New value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .sort(compareByTimestamps)
                .map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{getDateString(row.timestamp)}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.diff[0].oldValue}</TableCell>
                      <TableCell>{row.diff[0].newValue}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

UsersTable.propTypes = {
  rows: PropTypes.array
};

export default UsersTable;
