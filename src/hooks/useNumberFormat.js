export const numberFormat = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    }).format(value);

export const numberPerCentageFormat = (value) =>
    new Intl.NumberFormat({
        floatValue: value | undefined,
        formattedValue: value,
        value: value
    }).format(value ? value.toFixed(2) : 0.00);

// export interface NumberFormatValues {
// floatValue: number | undefined;
// formattedValue: string;
// value: string;
// }
