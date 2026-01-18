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
          renderItem={({ item }) => {
            const date = new Date(item.timestamp);
            const formattedDate = date.toLocaleDateString('ko-KR');
            const formattedTime = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

            return (
              <View style={styles.itemContainer}>
                <View style={styles.itemDetails}>
                  <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
                  <ThemedText style={styles.itemPaymentMethod}>{item.paymentMethod}</ThemedText>
                </View>
                <View style={styles.itemRightSection}>
                  <ThemedText style={styles.itemAmount}>{item.amount.toLocaleString()}원</ThemedText>
                  <ThemedText style={styles.itemTimestamp}>{`${formattedDate} ${formattedTime}`}</ThemedText>
                </View>
              </View>
            );
          }}
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
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPaymentMethod: {
    fontSize: 14,
    color: 'gray',
  },
  itemRightSection: {
    alignItems: 'flex-end',
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTimestamp: {
    fontSize: 12,
    color: 'gray',
  },
});
