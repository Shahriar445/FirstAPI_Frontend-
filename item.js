// for show all list items 
document.addEventListener('DOMContentLoaded',async function(){
    try{
        await DisplayItemList();
    }catch(error){
        console.error('error items',error);
    }
});


document.getElementById('itemForm').addEventListener('submit',handleSubmit);

async function handleSubmit(event){
    event.preventDefault(); // not refresh the tab 

    const itemData=getFormData();
    try{
        const response =await sendItemData(itemData);
        const result = await response.text();
        alert(result);
        await DisplayItemList();
    }catch(error)
    {
        console.error('Error',error);
        alert('Faild to create item');
    }
}

function getFormData(){
    return {
        itemName: document.querySelector('[name="Items.itemName"]').value,
        numStockQuantity: document.querySelector('[name="Items.NumStockQuantity"]').value,
        isActive: document.querySelector('[name="Items.IsActive"]').checked
    };
}

async function sendItemData(itemData)
{
    return fetch('https://localhost:7242/CreateItem',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(itemData)
    });
}

async function DisplayItemList()
{
    try{
        const response = await fetch('https://localhost:7242/GetAllItems'  );
        if (!response.ok){
            throw new error('network response want not ok');
        }

        const items = await response.json();
        const tableBody = document.querySelector('#itemTable tbody');

        tableBody.innerHTML='';
        items.forEach(item=>{
           const row = tableBody.insertRow();

            row.innerHTML= `
            <td>${item.itemId}</td>
            <td>${item.itemName}</td>
            <td> ${item.numStockQuantity}</td>
            <td> ${item.isActive ? 'Yes':'No'}</td>
            `;
            
        });

    }
    catch(error){
        console.error('error for item list',error);
    }
}