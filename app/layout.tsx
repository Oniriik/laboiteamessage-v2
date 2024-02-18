'use client';

import StyledComponentsRegistry from '@/lib/registry';
import AntDRegistry from '@/lib/AntdRegistry';
import { ThemeProvider } from 'styled-components';
import { DefaultTheme, AntDTheme } from '@/themes';
import { ConfigProvider } from 'antd';
import './global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntDRegistry>
          <ConfigProvider theme={AntDTheme}>
            <StyledComponentsRegistry>
              <ThemeProvider theme={DefaultTheme}>
                {children}
              </ThemeProvider>
            </StyledComponentsRegistry>
          </ConfigProvider>
        </AntDRegistry>
      </body>
    </html>
  );
}
