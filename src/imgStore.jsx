// import create from "zustand";
// export const useImgStore = create((set)=>({
//     imagefile:null,
//     setImgfile:(file)=>set((state)=>({imagefilel:file})),
// }))

import create from "zustand";
export const useImgStore = create((set)=>({
    imgUrl:'',
    imagefile:{},
    downloadUrl:'',
    downloadTextA:'',
    setDownloadUrl:(url)=>set((state)=>({downloadUrl:url})),
    setImgfile:(file)=>set((state)=>({imagefile:file})),
    setimgUrl:(url)=>set((state)=>({imgUrl:url})),
    setExtractedText:(arr)=>set((state)=>({downloadTextA:arr}))
    
}))