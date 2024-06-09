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
   
    const imageInput = document.getElementById('imageFile');
    if (imageInput && imageInput.files.length > 0) {
        formData.append('imageFile', imageInput.files[0]);
    }
    const OnlyforFile = document.getElementById('File');
    if (OnlyforFile && OnlyforFile.files.length > 0) {
        formData.append('File', OnlyforFile.files[0]);
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
                <td><a href="https://localhost:7242${item.fileUrl}" download>downlaod file here</a></td>

            `;
        });
    } catch (error) {
        console.error('Error fetching item list', error);
    }
}
