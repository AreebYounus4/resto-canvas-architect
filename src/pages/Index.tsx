
import { Layout } from '@/components/Layout';
import { FloorplanProvider } from '@/context/FloorplanContext';

const Index = () => {
  return (
    <FloorplanProvider>
      <Layout />
    </FloorplanProvider>
  );
};

export default Index;
