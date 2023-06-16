import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const handleDateChange = (event, date) => {
        setShowCalendar(false);
        setSelectedDate(date);
    };

    return (
        <View className="flex w-1/4">
            <TouchableOpacity className="border rounded-lg h-8" onPress={() => setShowCalendar(true)}>
                <Text className="text-center justify-center items-center">{selectedDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showCalendar && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};