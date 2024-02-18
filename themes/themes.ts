import type { ThemeConfig } from 'antd';

export const DefaultTheme = {
  primary: '#3C3C3C',
  primary200: '#303030',
  secondary: '#FCFCFC',
  secondary200: '#E9E9E9',
  accent: '#76CE6F',
  inactive: '#7D7D7D',
};

export const AntDTheme: ThemeConfig = {
  token: {
    colorPrimary: '#6e2d26',
    colorInfo: '#6e2d26',
    colorSuccess: '#7ec959',
    colorWarning: '#ffd070',
    colorError: '#fa7677',
    colorTextBase: '#724747',
    colorBgBase: '#fbf0ee',
  },
  components: {
    Button: {
      primaryColor: 'rgb(251, 240, 238)',
    },
    Divider: {
      margin: 4,
      marginLG: 4,
    },
    Form: {
      itemMarginBottom: 8,
    },
  },
};
