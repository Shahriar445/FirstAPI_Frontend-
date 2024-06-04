let itemIndex=1;



document.getElementById('itemForm').addEventListener('submit',async function(event){
    event.preventDefault();
   
    const _formData =new FormData(this);
    try{
        const response = await fetch('https://localhost:7242/CreateItems',
            {
                method:'POST',
               body:_formData
            }
        );
        const result= await response.text();
        alert(result);
        alert('success');
    }catch(error)
    {
        console.error('error',error);
        alert('Failed create items');
    }
});
