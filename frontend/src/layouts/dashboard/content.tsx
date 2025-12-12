import type { Breakpoint } from '@mui/material/styles';
import type { ContainerProps } from '@mui/material/Container';

import { mergeClasses } from 'minimal-shared/utils';

import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

export type DashboardContentProps = ContainerProps & {
  layoutQuery?: Breakpoint;
  disablePadding?: boolean;
};

export function DashboardContent({
  children,
}: DashboardContentProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
