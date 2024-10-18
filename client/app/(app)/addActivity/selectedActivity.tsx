import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ListButton } from '@/components/list-button';

const VehicleActivities = {
  MOVE_BY_CAR: 'move_by_car',
  MOVE_BY_ELECTRIC_CAR: 'move_by_electric_car',
  MOVE_BY_MOTORBIKE: 'move_by_motorbike',
  MOVE_BY_PUBLIC_TRANSPORT: 'move_by_public_transport',
  MOVE_BY_BIKE: 'move_by_bike',
  MOVE_BY_SCOOTER: 'move_by_scooter',
  MOVE_BY_WALK: 'move_by_walk',
} as const;

type VehicleActivitiesType = keyof typeof VehicleActivities;
type VehicleActivities = (typeof VehicleActivities)[VehicleActivitiesType];

const ACTIVITY_OPTIONS: Record<
  string,
  {
    options: { icon: string; name: string; type: VehicleActivities }[];
    pathname: string;
  }
> = {
  Transport: {
    pathname: '/addActivity/addTransport',
    options: [
      {
        name: 'Samochód',
        icon: 'directions-car',
        type: 'move_by_car',
      },
      {
        name: 'Samochód elektryczny',
        icon: 'electric-car',
        type: 'move_by_electric_car',
      },
      {
        name: 'Motocykl',
        icon: 'two-wheeler',
        type: 'move_by_motorbike',
      },
      {
        name: 'Hulajnoga Elektryczna',
        icon: 'electric-scooter',
        type: 'move_by_electric_car',
      },
      {
        name: 'Rower',
        icon: 'pedal-bike',
        type: 'move_by_bike',
      },
      {
        name: 'Rower Elektryczny',
        icon: 'electric-bike',
        type: 'move_by_electric_car',
      },
      {
        name: 'Komunikacja Miejska',
        icon: 'directions-bus',
        type: 'move_by_public_transport',
      },
    ],
  },
  // Media: {
  //   pathname: '/addActivity/addMedia',
  //   options: [
  //     {
  //       icon: 'bolt',
  //       name: 'Sieć Elektryczna',
  //     },
  //   ],
  // },
  // Usługi: {
  //   pathname: '/addActivity/addService',
  //   options: [
  //     {
  //       icon: 'theaters',
  //       name: 'Kino',
  //     },
  //     { icon: 'tv', name: 'Streaming' },
  //     { icon: 'memory', name: 'ChatGPT' },
  //     { icon: 'bolt', name: 'Własne' },
  //   ],
  // },
  // Wydarzenie: {
  //   pathname: '/addActivity/addEvent',
  //   options: [{ icon: 'add', name: 'Dodaj Własne' }],
  // },
};

export default function SelectedActivityScreen() {
  const { name } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View
        style={{
          alignItems: 'center',
          marginVertical: 16,
        }}
      >
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={Colors.light.neutral[900]}
          style={{ position: 'absolute', left: 24 }}
          onPress={router.back}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: Colors.light.neutral[900],
          }}
        >
          {`Dodaj ${name}`}
        </Text>
      </View>
      <View
        style={{
          gap: 12,
          padding: 16,
          paddingBottom: 24,
        }}
      >
        {ACTIVITY_OPTIONS[name as string].options.map((activity) => (
          <ListButton
            key={activity.name}
            icon={activity.icon}
            label={activity.name}
            onPress={() => {
              router.push({
                pathname: ACTIVITY_OPTIONS[name as string].pathname as any,
                params: activity,
              });
            }}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.neutral[0],
  },
});
