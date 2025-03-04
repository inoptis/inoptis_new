// import React, {useRef, useState} from 'react';
// import cl from './Gallery.module.css'
// import {useScrollbar} from "../../Hooks/useScrollbar";
// import Slider from "react-slick";
// const Gallery = ({gallery}) => {
//
//     const [activeImage, setActiveImage] = useState()
//     const container = useRef();
//     useScrollbar(container)
//
//     return (
//         <div className={cl.block}>
//             <button className={cl.cross}>
//                 cross
//             </button>
//             <div className={cl.container}>
//                 {gallery.map((image, index) => (
//                     <div key={index} className={cl.imageContainer}>
//                         <img src={image}/>
//                     </div>
//                 ))}
//             </div>
//             <div className={cl.main}>
//                 <Slider>
//                     {gallery.map((image, index) => (
//                         <div key={index} className={cl.mainImage}>
//                             <img src={image}/>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </div>
//     );
// };
//
// export default Gallery;