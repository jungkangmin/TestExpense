import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Keyboard, TouchableWithoutFeedback, Alert, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useExpenses } from '@/contexts/ExpenseContext';
import { Colors } from '@/constants/theme';

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { addExpense } = useExpenses();
  const colorScheme = useColorScheme();

  const handleAddExpense = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('오류', '유효한 금액을 입력하세요.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('오류', '사용 내역을 입력하세요.');
      return;
    }
    if (!paymentMethod.trim()) {
      Alert.alert('오류', '결제 수단을 입력하세요.');
      return;
    }

    addExpense({ amount: numericAmount, description, paymentMethod });
    setAmount('');
    setDescription('');
    setPaymentMethod('');
    Keyboard.dismiss();
    Alert.alert('성공', '비용이 추가되었습니다.');
  };

  const themeColors = Colors[colorScheme ?? 'light'];
  const inputStyle = {
    ...styles.input,
    backgroundColor: themeColors.background,
    color: themeColors.text,
    borderColor: themeColors.tint,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">비용 추가</ThemedText>
        <TextInput
          style={inputStyle}
          placeholder="금액"
          placeholderTextColor={themeColors.tint}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={inputStyle}
          placeholder="사용 내역"
          placeholderTextColor={themeColors.tint}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={inputStyle}
          placeholder="결제 수단"
          placeholderTextColor={themeColors.tint}
          value={paymentMethod}
          onChangeText={setPaymentMethod}
        />
        <Button title="저장" onPress={handleAddExpense} />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
