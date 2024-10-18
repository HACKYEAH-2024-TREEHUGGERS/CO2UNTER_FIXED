import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatField } from '@/components/ui/stat-field';
import { Field } from '@/components/ui/field';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ky } from '@/api/ky';
import { useUserStore } from '@/stores/user';

export default function addTransportScreen() {
  const { name, icon, type } = useLocalSearchParams();
  const [input, setInput] = useState('');
  const { id } = useUserStore((state) => state.user);
  const client = useQueryClient();

  const addActivityMutation = useMutation({
    mutationFn: async (amount: number) => {
      await ky.post(`users/${id}/activities`, {
        json: {
          type: 'transport' as const,
          activity: type,
          amount,
        },
      });
    },
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: ['dashboard'],
        exact: false,
      });

      router.dismissAll();
    },
  });

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
          Dodaj Transport
        </Text>
      </View>
      <View
        style={{
          gap: 12,
          padding: 16,
          paddingBottom: 24,
        }}
      >
        <StatField
          value={name as any}
          icon={icon as any}
          valueTextSize="small"
        />
        <Field
          label="Dystans"
          value={input}
          onChangeText={setInput}
          suffix="km"
        />
        <Button
          loading={addActivityMutation.isPending}
          onPress={() => {
            addActivityMutation.mutate(+input);
          }}
        >
          Dodaj
        </Button>
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
