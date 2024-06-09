document.addEventListener('DOMContentLoaded', async function() {
    try {
        await DisplayItemList();
    } catch (error) {
        console.error('Error fetching items', error);
    }
});

document.getElementById('itemForm').addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault(); // Prevent page refresh

    const formData = new FormData();
    formData.append('itemName', document.querySelector('[name="Items.itemName"]').value);
    formData.append('numStockQuantity', document.querySelector('[name="Items.NumStockQuantity"]').value);
    formData.append('isActive', document.querySelector('[name="Items.IsActive"]').checked);
   
    const fileInput = document.getElementById('imageFile');
    if (fileInput && fileInput.files.length > 0) {
        formData.append('imageFile', fileInput.files[0]);
    }
    
    try {
        const response = await sendItemData(formData);
        const result = await response.text();
        alert(result);
        await DisplayItemList();
    } catch (error) {
        console.error('Error', error);
        alert('Failed to create item');
    }
}

async function sendItemData(formData) {
    return fetch('https://localhost:7242/CreateItem', {
        method: 'POST',
        body: formData
    });
}

async function DisplayItemList() {
    try {
        const response = await fetch('https://localhost:7242/GetAllItems');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const items = await response.json();
        const tableBody = document.querySelector('#itemTable tbody');

        tableBody.innerHTML = '';
        items.forEach(item => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${item.itemId}</td>
                <td>${item.itemName}</td>
                <td>${item.numStockQuantity}</td>
                <td>${item.isActive ? 'Yes' : 'No'}</td>
                <td><img src="https://localhost:7242${item.imageUrl}" width="50" height="50"></td>
            `;
        });
    } catch (error) {
        console.error('Error fetching item list', error);
    }
}
