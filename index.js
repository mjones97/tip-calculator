// Get the necessary elements
let billAmountInput = document.getElementById('bill-amount');
let serviceOptions = document.getElementById('service-options');
let numOfPeopleInput = document.getElementById('people-amount');
let customPercentageInput = document.getElementById('custom-percentage');
let calculateBtn = document.getElementById('calculate');
let totalTip = document.getElementById('total-tip');
let tipPerCustomer = document.getElementById('tip-per');
let billTotal = document.getElementById('bill-total');
let error = document.getElementById('error');
let serviceError = document.getElementById('service-error');
let customerError = document.getElementById('customer-error');


// Attach a change event listener to the serviceOptions dropdown
serviceOptions.addEventListener('change', function () {
    if (serviceOptions.value === 'custom') {
        customTipInput.style.display = 'block';
    } else {
        customTipInput.style.display = 'none';
    }
});

// Attach a click event listener to the calculate button
calculateBtn.addEventListener('click', function () {
    let billAmount = parseFloat(billAmountInput.value);
    let serviceValue = parseFloat(serviceOptions.value);
    let numOfPeople = parseFloat(numOfPeopleInput.value);
    
    // Check if the "custom" option is selected and use the custom percentage if entered
    if (serviceOptions.value === 'custom') {
        let customPercentage = parseFloat(customPercentageInput.value);
        if (!isNaN(customPercentage)) {
            serviceValue = customPercentage / 100;
        }
    }

    // Error validation
    let errorFlag = false; 

    function displayError(element, message, condition) {
        if (condition) {
            element.textContent = message;
            errorFlag = true;
        } else {
            element.textContent = '';
        }
    }

    displayError(error, 'Please enter an amount', billAmountInput.value === '');
    displayError(serviceError, 'Please select a service level', serviceOptions.selectedIndex === 0);
    displayError(serviceError, 'Please enter a percentage', serviceOptions.value === 'custom' && customPercentageInput.value === '');
    displayError(customerError, 'Please enter number of customers', numOfPeopleInput.value === '');

    if (!errorFlag) {
        // Calculate totals only if billAmount is a valid number
        if (!isNaN(billAmount)) {
            let totalTipAmount = billAmount * serviceValue;
            let totalPerCustomer = totalTipAmount / numOfPeople;
            let total = billAmount + totalTipAmount;

            // Round the totals and ensure they have two decimal places
            totalTipAmount = totalTipAmount.toFixed(2);
            totalPerCustomer = totalPerCustomer.toFixed(2);
            total = total.toFixed(2);

            // Display the results
            totalTip.textContent = "$" + totalTipAmount;
            tipPerCustomer.textContent = "$" + totalPerCustomer;
            billTotal.textContent = "$" + total;
        } else {
            // Clear the total tip and other results if billAmount is not a valid number
            totalTip.textContent = '';
            tipPerCustomer.textContent = '';
            billTotal.textContent = '';
        }
    }
});