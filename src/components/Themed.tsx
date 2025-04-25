/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '@/src/constants/Colors';
import { useColorScheme } from 'react-native';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
export function Card(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor || '#fff', dark: darkColor || '#121212' }, 'background');
  const shadowColor = useThemeColor({ light: '#000', dark: '#121212' }, 'text');

  return (
    <DefaultView
      style={[
        {
          backgroundColor,
          borderRadius: 8,
          padding: 16,
          marginVertical: 8,
          shadowColor,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function ItemSeparator(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor || '#e0e0e0', dark: darkColor || '#272727' }, 'background');

  return (
    <DefaultView
      style={[
        {
          height: 1,
          backgroundColor,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

