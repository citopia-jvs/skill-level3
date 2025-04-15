import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useCallback } from 'react';

interface DatePickerProps {
    value?: Date;
    onChange: (selectedDate: Date) => void;
    onCancel?: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, onCancel }) => {
    if (!value) {
        value = new Date();
    }
    const dateSelected = useCallback((event: DateTimePickerEvent, date?: Date | undefined): void => {
        if (!date) {
            return;
        };
        if (event.type === "dismissed") {
            onCancel && onCancel();
            return;
        }
        onChange(date);
    }, [ onChange ]);

    return (
        <DateTimePicker
            value={ value }
            locale="fr-FR"
            onChange={ dateSelected }
        />
    );
};

export default DatePicker;