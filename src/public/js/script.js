//voltear la pagina cuando se presiona el boton prev o next
const pageTurnBtn=document.querySelectorAll('.nextprev-btn');
// console.log("🚀 ~ pageTurnBtn:==>", pageTurnBtn)


pageTurnBtn.forEach((el, index)=>{
    el.onclick=()=>{
        const pageTurnId=el.getAttribute('data-page');
        const pageTurn=document.getElementById(pageTurnId);

        if(pageTurn.classList.contains('turn')){
            pageTurn.classList.remove('turn');
            setTimeout(()=>{
                pageTurn.style.zIndex=20-index;
            }, 500)
        }else{
            pageTurn.classList.add('turn');
            setTimeout(()=>{
                pageTurn.style.zIndex=20+index;
            }, 500)

        }
    }
})

//al presionar el boton de contactarme
const pages=document.querySelectorAll('.book-page.page-right');
console.log("🚀 ~ pages:==>", pages)

const contactMeBtn=document.querySelector('.btn.contact-me');

contactMeBtn.onclick=()=>{
    pages.forEach((page, index)=>{
        setTimeout(()=>{
            page.classList.add('turn')
            setTimeout(()=>{
                page.style.zIndex=20+index;
            },500)
            
        }, (index +1) * 200 + 100)//300 500 700
    })
};

//reversar el indice
let totalPages=pages.length;
let pageNumber=0;

function reverseIndex(){
    pageNumber--;
    if(pageNumber<0){
        pageNumber=totalPages-1;
    }
}

//boton para ir al perfil
const backProfileBtn=document.querySelector('.back-profile');
backProfileBtn.onclick=()=>{
    pages.forEach((_, index)=>{
        setTimeout(()=>{
            reverseIndex()
            pages[pageNumber].classList.remove('turn')

            setTimeout(()=>{
                reverseIndex()
                pages[pageNumber].style.zIndex=10 + index
            },600)
        }, (index +1 ) * 200 + 100 )
    })
}


// //opening animation
const coverRight=document.querySelector('.cover.cover-right');
const pageLeft=document.getElementById('portada');
// const pageLeft=document.querySelector('.book-page.page-left');

// //opening animation (cover)

setTimeout(()=>{
    coverRight.classList.add('turn');
},2100)

setTimeout(()=>{
    coverRight.style.zIndex=-1;
},2800)

// opening animation (pagina izquierda o pagina de perfil)
setTimeout(()=>{
    pageLeft.style.zIndex=20;
},3700)

// // //opening animation (todas las paginas)
pages.forEach((_, index)=>{
    // console.log('vuelta principal=>', index)
    setTimeout(()=>{
        // console.log('vuelta interna1=>', index)
        reverseIndex()
        pages[pageNumber].classList.remove('turn')
        setTimeout(()=>{
            // console.log('vuelta interna2=>', index)
            reverseIndex()
            // console.log(' pages[pageNumber]=>', pages[pageNumber], pageNumber)
            pages[pageNumber].style.zIndex=10 + index
        },600)
    }, (index +1 ) * 200 + 2100 )
})

///////////////////////////

const getInfo=async()=>{

    const response =await fetch('/profile')
    const datas= await response.json()

    ///
    document.getElementById('name_profile').innerHTML=datas.name
    document.getElementById('name_profession').innerHTML=datas.profession
    ///

    const getData=()=>{
    
     const data=[]
    
    //  const response =await fetch('/profile')
    //  const datas= await response.json()
     const dataNameCert=datas.dataNameCert
     for(let i=1; i<dataNameCert.length; i++){
        const n=i<10?'0'+ i: i;
        data.push({name:`cert_`+n + '.jpg', course: dataNameCert[i-1]??''})
     }
        const viewCert=document.getElementById('view_certificate')
        const certificateBox=document.querySelector('#certificateBox');
        data.forEach((el)=>{
    
            const div=document.createElement('div');
            div.classList.add('certificate-content');
            div.addEventListener('click', ()=>{
                viewCert.querySelector('.modal__container img').src='img/'+el.name
                // viewCert.querySelector('.modal__container .modal__paragraph').innerHTML=el.course
                viewCert.classList.add('modal--show')
            })
            const div2=document.createElement('div');
            div2.classList.add('certificate-img_box');
            const img=document.createElement('img');
            const p=document.createElement('p');
            p.textContent=el.course;
    
            img.src=`img/${el.name}`;
            img.alt=el.course;
            div2.appendChild(img);
            div.appendChild(div2);
            div.appendChild(p);
            certificateBox.appendChild(div);
        })
    
        // console.log("🚀 ~ data:==>", data)
    };
    
    getData();
    
    // seccion de habilidades
    
    const mySkills=document.getElementById('mis_habilidades')
    
    const getMySkills=()=>{
    
        // const response =await fetch('/profile')
        // const datas= await response.json()
        const myskillsData=datas.myskillsData
        myskillsData.forEach(el=>{
            const skillContent=document.createElement('div');
            skillContent.classList.add('skills-content')
            const h3=document.createElement('h3');
            h3.innerHTML=el.title
            skillContent.appendChild(h3)
        
            const divContent =document.createElement('div')
            divContent.classList.add('content')
            el.data.forEach(x=>{
                const span=document.createElement('span')
                span.innerHTML=x.name
                const img=document.createElement('img')
                img.classList.add('icon-skill')
                img.src=`icons/${x.icon}`
                // img.style='width:150px;'
                span.prepend(img)
                divContent.appendChild(span)
            })
            skillContent.appendChild(divContent)
            mySkills.appendChild(skillContent)
        })
    }
    
    getMySkills()
    
    ///////
    //seccion mis servicios
    
    const getMyServices=()=>{
    
        // const response =await fetch('/profile')
        // const datas= await response.json()
        const myServices=datas.myServices
        const services=document.getElementById('services')
        myServices.forEach(el=>{
            const servicesContent=document.createElement('div');
            servicesContent.classList.add('services-content');
            // const img=document.createElement('img')
            // img.src='icons/'+el.icon
            // img.classList.add('icon-service')
            // servicesContent.appendChild(img)
            const headerTitle=document.createElement('div')
            headerTitle.classList.add('header-service')
            const h3=document.createElement('h3')
            h3.innerHTML=el.title
            headerTitle.appendChild(h3)
            servicesContent.appendChild(headerTitle)
        
            const bodyService=document.createElement('div')
            bodyService.classList.add('body-service')
            const p=document.createElement('p')
            p.innerHTML=el.description
            bodyService.appendChild(p)
            servicesContent.appendChild(bodyService)
        
            const footerServices=document.createElement('div')
            footerServices.classList.add('footer-service')
            const a=document.createElement('a')
            a.setAttribute('href', el.link)
            a.classList.add('btn')
            a.textContent="Leer más"
            footerServices.appendChild(a)
            servicesContent.appendChild(footerServices)
        
            services.appendChild(servicesContent)
        })
    }
    
    getMyServices()


    // seccion de últimos proyectos

    const page1LastProjects1=document.getElementById('porfolio_page1')
    const dataProject1=datas.last_projects[0]??{}
    const page2LastProjects2=document.getElementById('porfolio_page2')
    const dataProject2=datas.last_projects[1]??{}
    
    const gen_lastP=(dataObj, elementRef)=>{
        
        const img=elementRef.querySelector('.img-box img')
        img.src=`img/${dataObj.img_preview}`
        img.setAttribute('alt', dataObj.img_preview)

        const projectName=elementRef.querySelector('.info-box .info-title h3')
        projectName.innerHTML=dataObj.project_name
        const livePrev=elementRef.querySelector('.info-box .info-title a')
        livePrev.setAttribute('href', dataObj.live_preview)
        livePrev.setAttribute('target', '_blank')

        const descriptionP=elementRef.querySelector('.info-box .description_project')
        descriptionP.innerHTML=dataObj.description

        const sourceCode=elementRef.querySelector('.btn-box a:first-of-type')
        sourceCode.setAttribute('href', dataObj.source_code)
        sourceCode.setAttribute('target','_blank')
    }

    gen_lastP(dataProject1, page1LastProjects1)

}

getInfo()


// setTimeout(()=>{
//     VanillaTilt.init(document.querySelectorAll(".certificate-img_box img"), {
//         max: 25,
//         speed: 400
//     });
// }, 1000)
// const openModal = document.querySelector('.hero__cta');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

// openModal.addEventListener('click', (e)=>{
//     e.preventDefault();
//     modal.classList.add('modal--show');
// });

closeModal.addEventListener('click', (e)=>{
    // e.preventDefault();
    modal.classList.remove('modal--show');
});