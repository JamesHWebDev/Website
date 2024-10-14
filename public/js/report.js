const ReportForm = document.getElementById('ReportBeatForm')
const RepDrop = document.getElementById('ReportDropdown')
const RepExt = document.getElementById('ExtContext')
ReportForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const RepBut = document.getElementById('reportButton')

    const give = `/ReportBeatSubmit/${RepBut.dataset.doc}`
    
    

  const formData = new FormData(this);


  const jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
});
    
    fetch(give, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then((data) => {
        if(data.message == 'No Reason Selected'){
            window.alert('Please Select a Reason')
        }
        if(data.message == 'Report Submitted'){
            document.getElementById('ReportedBeatDIV').style.borderRight = 'solid 1px black'
            document.getElementById('ReportedBeatDIV').style.borderLeft = 'solid 1px black'
            document.getElementById('ReportedBeatDIV').style.borderBottom = 'solid 1px black'
            document.getElementById('ReportedBeatDIV').style.height = '70px'
            document.getElementById('ReportedBeatDIV').style.transition = 'height .3s'
            setTimeout(function(){
                window.location.href = '/beats'
            }, 1500)
        }
    })
    .catch((err) => {
        console.log(err)
    })
    
    
})