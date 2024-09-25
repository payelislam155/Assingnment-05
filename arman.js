function setupDonation(donationBtn, inputDonation, totalDonation, allDonation, isAdding) {
    document.getElementById(donationBtn).addEventListener('click', function() {
        const donationInput = document.getElementById(inputDonation);
        const donationAmount = parseInt(donationInput.value, 10);

        const totalDonationElement = document.getElementById(totalDonation);
        const allDonationElement = document.getElementById(allDonation);

        if (!totalDonationElement || !allDonationElement) {
            console.error('Please enter a not positive number.');
            return;
        }

                     // Validate donation amount
        if (isNaN(donationAmount) || donationAmount <= 0) {
            alert('Please enter a valid donation amount.');
            return; // Prevent execution of the rest of the function
        }

                    // Show success modal if the amount is valid
        document.getElementById('my_modal_5').showModal();

        const currentTotalDonation = parseInt(totalDonationElement.innerText.replace('$', '').replace(' BDT', '').trim(), 10) || 0;
        const currentLocalDonation = parseInt(allDonationElement.innerText.replace('$', '').replace(' BDT', '').trim(), 10) || 0;

        const newTotalDonation = isAdding ? currentTotalDonation + donationAmount : Math.max(currentTotalDonation - donationAmount, 0);
        const newLocalDonation = isAdding ? currentLocalDonation + donationAmount : Math.max(currentLocalDonation - donationAmount, 0);

        totalDonationElement.innerText = newTotalDonation;
        allDonationElement.innerText = newLocalDonation;

        document.getElementById('donateShowMinus1').innerText = newTotalDonation;

                  // Get the current date and format time
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);

        const div = document.createElement("div");
        div.classList.add(isAdding ? "bg-white" : "bg-yellow-50");
        div.style.border = "2px solid gray";
        div.style.padding = "20px";
        div.innerHTML = `
            <p class="text-2xl font-bold">${donationAmount} Taka is Donated for ${isAdding ? 'famine-2024' : 'Flood Relief'} in Feni, Bangladesh</p>
            <p class="text-gray-600 text-xl">Date: ${formattedDate}</p>`;

        const historyContainer = document.getElementById("transaction-section");
        historyContainer.appendChild(div);

        donationInput.value = '';
    });
}

                     // Define the formatDate function
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    return date.toLocaleString('en-US', options);
}

                  // Input action function
document.addEventListener('DOMContentLoaded', function() {
    setupDonation('addButton', 'balanceAddInput', 'totalBalance', 'donateShow', true);
    setupDonation('minusButton', 'balanceMinusInput', 'totalBalance', 'donateShowMinus1', false);
    setupDonation('thirdDonationBtn', 'balanceThirdCard', 'totalBalance', 'donateShow3', true);
});

                 // History tab functionality
const historyTab = document.getElementById("history-tab");
const donationTab = document.getElementById("donation-tab");

historyTab.addEventListener("click", function() {
    historyTab.classList.add("text-white", "bg-[#B4F463]", "w-24");
    donationTab.classList.remove("text-white", "bg-[#B4F463]", "w-24");
    donationTab.classList.add("text-gray-600");
    document.getElementById("all-card").classList.add("hidden");
    document.getElementById("transaction-section").classList.remove("hidden");
});

donationTab.addEventListener("click", function(){
    donationTab.classList.add("text-white", "bg-[#B4F463]", "w-24");
    historyTab.classList.remove("text-white", "bg-[#B4F463]", "w-24");
    historyTab.classList.add("text-gray-600");
    document.getElementById("all-card").classList.remove("hidden");
    document.getElementById("transaction-section").classList.add("hidden");
});
