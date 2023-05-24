import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const handleDateChange = (event, date) => {
        setShowCalendar(false);
        setSelectedDate(date);
    };

    return (
        <View>
            <Button title="Vælg dato" onPress={() => setShowCalendar(true)} />
            {showCalendar && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Text>Valgt dato: {selectedDate.toDateString()}</Text>
        </View>
    );
};