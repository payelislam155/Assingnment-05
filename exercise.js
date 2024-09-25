function setupDonation(donateBtnId, donationInputId, totalDonationId, localDonationId, isAdding) {
    document.getElementById(donateBtnId).addEventListener('click', function () {
        const donationInput = document.getElementById(donationInputId); // Input field for donation
        const donationAmount = parseFloat(donationInput.value) || 0; // Get the donation amount input and parse as float

        // Get the total and local donation elements
        const totalDonationElement = document.getElementById(totalDonationId);
        const localDonationElement = document.getElementById(localDonationId);

        // Ensure elements are valid
        if (!totalDonationElement || !localDonationElement) {
            console.error('Total or local donation element not found.');
            return;
        }

        // Current donations prepared for operation
        const currentTotalDonation = parseFloat(totalDonationElement.innerText.replace(/[$ BDT]/g, '').trim()) || 0;
        const currentLocalDonation = parseFloat(localDonationElement.innerText.replace(/[$ BDT]/g, '').trim()) || 0;

        // Validate the donation amount
        if (donationAmount > 0) {
            if (isAdding) {
                // Update total donation (add)
                const newTotalDonation = currentTotalDonation + donationAmount;
                totalDonationElement.innerText = '$' + newTotalDonation.toFixed(2) + ' BDT';
                
                // Update local donation (add)
                const newLocalDonation = currentLocalDonation + donationAmount;
                localDonationElement.innerText = '$' + newLocalDonation.toFixed(2) + ' BDT';
            } else {
                // Update total donation (subtract) ensuring it doesn't go negative
                const newTotalDonation = Math.max(0, currentTotalDonation - donationAmount);
                totalDonationElement.innerText = '$' + newTotalDonation.toFixed(2) + ' BDT';
                
                // Update local donation (subtract) ensuring it doesn't go negative
                const newLocalDonation = Math.max(0, currentLocalDonation - donationAmount);
                localDonationElement.innerText = '$' + newLocalDonation.toFixed(2) + ' BDT';
            }

            // Clear the input field after donation
            donationInput.value = '';
        } else {
            alert('Please enter a valid donation amount greater than zero.');
        }
    });
}

// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setupDonation('addButton', 'balanceAddInput', 'totalBalance', 'donateShow', true); 
    setupDonation('minusButton', 'balanceMinusInput', 'totalBalance', 'donateShowMinus', false);
    setupDonation('thirdDonationBtn', 'balanceThirdCard', 'totalBalance', 'donateShow3', true); // Assuming the third button adds
});