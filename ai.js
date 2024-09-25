function setupDonation(donateBtnId, donationInputId, totalDonationId, localDonationId, isAdding) {
    document.getElementById(donateBtnId).addEventListener('click', function() {
        const donationInput = document.getElementById(donationInputId);
        const donationAmount = parseInt(donationInput.value, 10);

        const totalDonationElement = document.getElementById(totalDonationId);
        const localDonationElement = document.getElementById(localDonationId);

        if (!totalDonationElement || !localDonationElement) {
            console.error('Total or local donation element not found.');
            return;
        }

        const currentTotalDonation = parseInt(totalDonationElement.innerText.replace('$', '').replace(' BDT', '').trim(), 10) || 0;
        const currentLocalDonation = parseInt(localDonationElement.innerText.replace('$', '').replace(' BDT', '').trim(), 10) || 0;

        if (!isNaN(donationAmount) && donationAmount > 0) {
            const newTotalDonation = isAdding ? currentTotalDonation + donationAmount : Math.max(currentTotalDonation - donationAmount, 0);
            const newLocalDonation = isAdding ? currentLocalDonation + donationAmount : Math.max(currentLocalDonation - donationAmount, 0);

            totalDonationElement.innerText = newTotalDonation;
            localDonationElement.innerText = newLocalDonation;
            console.log(newLocalDonation);

            document.getElementById('donateShowMinus1').innerText = newTotalDonation;

            // Get the current date and format time
            const currentDate = new Date(); 
            const formattedDate = formatDate(currentDate); 

            const div1 = document.createElement("div");
            div1.classList.add("bg-white");
            div1.style.border = "2px solid gray";
            div1.style.padding = "20px";
            div1.innerHTML = `
                <p class="text-2xl font-bold">${newTotalDonation} Taka is Donated for famine-2024 at Feni, Bangladesh</p>
                <p class="text-gray-600 text-xl">Date: ${formattedDate}</p>
            `;

            const div2 = document.createElement("div");
            div2.classList.add("bg-white");
            div2.style.border = "2px solid gray";
            div2.style.padding = "20px";
            div2.innerHTML = `
                <p class="text-2xl font-bold">${newLocalDonation} Taka is Donated for Flood Relief in Feni, Bangladesh</p>
                <p class="text-gray-600 text-xl">Date: ${formattedDate}</p>
            `;

            const historyContainer = document.getElementById("transaction-section");
            historyContainer.appendChild(div1); // append div1
            historyContainer.appendChild(div2); // append div2

            donationInput.value = ''; // Clear the input field
        } else {
            alert('Please enter a valid donation amount.');
        }
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

// input action function
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

donationTab.addEventListener("click", function() {
    donationTab.classList.add("text-white", "bg-[#B4F463]", "w-24");
    historyTab.classList.remove("text-white", "bg-[#B4F463]", "w-24");
    historyTab.classList.add("text-gray-600");
    document.getElementById("all-card").classList.remove("hidden");
});