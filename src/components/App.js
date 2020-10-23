import React from 'react';
import {Button, Container, Box, CircularProgress, Typography, CssBaseline} from '@material-ui/core';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {red, blue} from '@material-ui/core/colors';

import api from '../lib/api';

import UsersTable from './UsersTable';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
    background: {
      default: "#ededed"
    },
  },
});

export const App = () => {
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const fetchTableData = React.useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    let fetchedTableData;

    try {
      fetchedTableData = await api.getUsersDiff();

      setTableData((tableData) => [
        ...tableData,
        ...fetchedTableData.data,
      ]);
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className="app" fixed>
        <Box data-testid="app-box" m={2}>
          <UsersTable rows={tableData} />
          {
            isError ?
              <Box pt={2}>
                <Typography color="secondary" align="center" fontSize="fontSize" >
                  We had problems fetching your data. Please try again.
                </Typography>
              </Box> :
              null
          }
          <Box display="flex" justifyContent="center" p={2}>
            {
              isLoading ?
                <CircularProgress /> :
                <Button
                  variant="contained"
                  color="primary"
                  align="center"
                  disabled={isLoading}
                  onClick={fetchTableData}
                >
                  {isError ? 'Retry' : 'Load more'}
                </Button>
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
