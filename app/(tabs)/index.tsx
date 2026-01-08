import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useExpenses } from '@/contexts/ExpenseContext';

export default function ExpenseListScreen() {
  const { expenses } = useExpenses();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">비용 목록</ThemedText>
      {expenses.length === 0 ? (
        <ThemedText style={styles.emptyText}>비용 내역이 없습니다.</ThemedText>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
              <ThemedText style={styles.itemAmount}>{item.amount.toLocaleString()}원</ThemedText>
            </View>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemDescription: {
    fontSize: 16,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
