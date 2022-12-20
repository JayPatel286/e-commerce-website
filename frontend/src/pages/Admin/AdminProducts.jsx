import { Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import NewProduct from '../../components/Admin/NewProduct';
import Products from '../../components/Admin/Products';
import Sidebar from '../../components/Admin/Sidebar';
import MetaData from '../../components/MetaData';

const AdminProducts = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <MetaData title="Admin Dashboard" />
      <Stack direction="row" gap={1} mt={1}>
        <Sidebar tab="products" />

        <Stack flex={4}>
          <Paper sx={{ minHeight: '90vh', padding: '20px' }}>
            <Typography variant="subtitle2" fontSize={22} mb={1}>
              Products Manager
            </Typography>

            <Tabs
              value={tab}
              onChange={(e, newValue) => setTab(newValue)}
              indicatorColor="primary"
              textColor="inherit"
              variant="standard"
            >
              <Tab label="All Products" />
              <Tab label="Add New Product" />
            </Tabs>

            {tab === 0 ? <Products /> : <NewProduct />}
          </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default AdminProducts;
