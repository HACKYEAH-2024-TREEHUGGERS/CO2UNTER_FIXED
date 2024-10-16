import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Card } from '../card';
import { format, Locale } from 'date-fns';

export type ActivityType = 'transport' | 'media';

export type Activity = {
  type: ActivityType;
  date: string;
  name: string;
  icon: string;
  co2: number;
};

type TimelineEntryProps = {
  activity: Activity;
  style?: StyleProp<ViewStyle>;
};

export const TimelineEntry = ({ activity, style }: TimelineEntryProps) => {
  const styles = useMemo(() => createStyles(activity.type), [activity.type]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSide}>
        <Text style={{ marginTop: -32, fontSize: 12 }}>
          {format(new Date(activity.date), 'dd.MM.yyyy')}
        </Text>
        <View style={styles.circle} />
      </View>
      <View style={styles.rightSide}>
        <Card radius={8} containerStyle={{ marginTop: -72 }}>
          <View style={{ padding: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                paddingBottom: 8,
              }}
            >
              <MaterialIcons
                name={activity.icon as any}
                size={24}
                color={Colors.light.green[900]}
              />
              <Text style={styles.activityHeader}>{activity.name}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{activity.type}</Text>
              <Text>{activity.co2}kg CO₂</Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
};

const createStyles = (activityType: ActivityType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
    },
    leftSide: {
      position: 'relative',
      justifyContent: 'center',
      width: '30%',
      padding: 16,
    },
    rightSide: {
      position: 'relative',
      width: '70%',
      padding: 16,
      paddingLeft: 24,
    },
    circle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: Colors.light.green[500],
      position: 'absolute',
      right: -8,
      top: '50%',
      marginTop: -8,
    },
    activityHeader: {
      fontSize: 16,
      fontWeight: '500',
      color: Colors.light.neutral[900],
    },
  });
