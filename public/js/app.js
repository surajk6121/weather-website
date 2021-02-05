console.log('Client side javascript is loaded')

// fetch('http://localhost:3000/weather?address=bangalore').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const messageone= document.querySelector('#message-1')
const messagetwo= document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(search.value)
    messageone.textContent='Loading...'
    messagetwo.textContent=''
    fetch('/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageone.textContent=(data.error)
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
            messageone.textContent=(data.location)
            messagetwo.textContent=(data.forecast)
        }
    })
})
    
})