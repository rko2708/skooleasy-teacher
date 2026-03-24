import type { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type TeacherCardProps = PropsWithChildren<{
  footer?: ReactNode;
  style?: ViewStyle;
}>;

export function TeacherCard({ children, footer, style }: TeacherCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
          shadowColor: palette.shadow,
        },
        style,
      ]}>
      {children}
      {footer ? <View style={[styles.footer, { borderTopColor: palette.border }]}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    gap: 14,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  footer: {
    borderTopWidth: 1,
    marginTop: 4,
    paddingTop: 14,
  },
});
