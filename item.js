

document.getElementById('itemForm').addEventListener('submit',handleSubmit);

async function handleSubmit(event){
    event.preventDefault();

    const itemData=getFormData();
    try{
        const response =await sendItemData(itemData);
        const result = await response.text();
        alert(result);
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