const item = document.querySelector(".item");
form = item.querySelector("form");
fileInput = form.querySelector("input");
inforText = form.querySelector("p");
copyBtn = item.querySelector('.copy');
closeBtn = item.querySelector('.close')


const fetchRequest = (formData, file) =>{
    inforText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", 
    {
        method: "POST", body: formData
    }).then(res => res.json()).then(result=>{
        result = result[0].symbol[0].data;
        inforText.innerText = result? "Upload QR Code to scan": "Couldn't Scan QR Code";
        if(!result) return;
        item.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        inforText.innerText = "Upload QR Code to Scan";
        item.classList.add("active");
       })
}

fileInput.addEventListener('change', (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const formData = new FormData();
    formData.append("file", file)
    fetchRequest(formData, file);
})

copyBtn.addEventListener('click', ()=>{
    const text = item.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text);
});
closeBtn.addEventListener('click', ()=> item.classList.remove("active"));

form.addEventListener('click', ()=> {
    fileInput.click();
});
