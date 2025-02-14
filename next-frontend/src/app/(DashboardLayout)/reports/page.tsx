import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Report: React.FC = () => {
  return (
    <PageContainer title="Reports" description="this is the reports page">
      <DashboardCard title="Reports Page">
        <Typography>This is the reports page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Report;