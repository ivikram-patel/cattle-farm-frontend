import { useEffect } from 'react';

const useNumberInputOnly = (initialValue = '') => {
    console.log(initialValue)
    useEffect(() => {
        const isNumberKey = (event) => {
            const key = event.key;

            // Allow numbers, backspace, delete, and decimal point keys
            if (!/^[0-9.]$/.test(key) && key !== 'Backspace' && key !== 'Delete') {
                event.preventDefault();
            }

            // Allow only one decimal point
            if (key === '.' && event.target.value.includes('.')) {
                event.preventDefault();
            }
        };

        const handleKeyDown = (event) => {
            isNumberKey(event);
        };

        const inputElement = document.getElementById('number-input');
        if (inputElement) {
            inputElement.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, []);

    return {};
};

export default useNumberInputOnly;
