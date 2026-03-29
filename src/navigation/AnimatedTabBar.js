import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import AnimatedReanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS } from '../utils/constants';

const AnimatedTabBar = ({ state, descriptors, navigation }) => {
  const tabIndex = useSharedValue(0);
  const tabLayouts = useSharedValue({ width: 0, x: 0 });

  useEffect(() => {
    tabIndex.value = withTiming(state.index, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });
  }, [state.index]);

  const backgroundStyle = useAnimatedStyle(() => {
    const tabWidth = tabLayouts.value.width > 0 ? tabLayouts.value.width / state.routes.length : 0;
    const translateX = tabIndex.value * tabWidth;

    return {
      transform: [{
        translateX: withTiming(translateX, {
          duration: 250,
          easing: Easing.out(Easing.ease),
        })
      }],
      width: tabWidth || `${100 / state.routes.length}%`,
    };
  });

  return (
    <View
      style={styles.tabBarContainer}
      onLayout={(event) => {
        const { width, x } = event.nativeEvent.layout;
        tabLayouts.value = { width, x };
      }}
    >
      <AnimatedReanimated.View style={[styles.tabBarBackground, backgroundStyle]} />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabBarButton,
              index < state.routes.length - 1 && styles.tabBarButtonWithBorder,
            ]}
          >
            <View style={styles.tabBarButtonContent}>
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? COLORS.textWhite : COLORS.textContenido, size: 50 })}
              <Text style={[
                styles.tabBarLabel,
                { color: isFocused ? COLORS.textWhite : COLORS.textContenido }
              ]}>
                {label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.target,
    borderTopWidth: 3,
    borderTopColor: COLORS.textBorde,
    height: 85,
    paddingBottom: 5,
    paddingTop: 0,
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: COLORS.button,
    zIndex: 0,
    borderRadius: 0,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  tabBarButtonWithBorder: {
    borderRightWidth: 3,
    borderRightColor: COLORS.textBorde,
  },
  tabBarButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default AnimatedTabBar;
