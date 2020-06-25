window.addEventListener('load',()=>{
    let long;
    let lat;
    let tempDesc = document.querySelector('.temperature-description')
    let tempDegree = document.querySelector('.temperature-degree')
    let LocTimezone = document.querySelector('.location-timezone')
    let tempSec=document.querySelector('.temperature')
    let tempSpan = document.querySelector('.temperature span')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude
            lat=position.coords.latitude
           
            const proxy =`https://cors-anywhere.herokuapp.com/`
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
        
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data =>{
                    console.log(data)
                    const{temperature,summary ,icon}=data.currently;
                    tempDegree.textContent=temperature;
                    tempDesc.textContent=summary;
                    LocTimezone.textContent=data.timezone;
                    let celsius=(temperature-32)*(5/9)

                //  set Icons
                    setIcons(icon,document.querySelector('.icon'))
               
                    // change temperature to celsius and farenheight
                    tempSec.addEventListener('click', ()=>{
                        if(tempSpan.textContent==='F'){
                            tempSpan.textContent='C'
                            tempDegree.textContent=Math.floor(celsius)
                        }else{
                            tempSpan.textContent = 'F'
                            tempDegree.textContent=temperature
                        }
                    })

                   
                })
        })
        
    }
    function setIcons(Icon,id){
        const skycons=new Skycons({
            color:'white'
        })
        const currentIcon=Icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(id,Skycons[currentIcon])
    }
})