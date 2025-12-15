
import { Iconify } from 'src/components/iconify/iconify';
import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

const icon = (name: string) => <Iconify icon={name} color={"red"} width={30} height={30} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Capture',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Scanning',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'History',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
];
