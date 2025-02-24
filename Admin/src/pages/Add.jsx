import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'


const Add = () => {
  //setting state for images 
  const{backendUrl, token}=useContext(AdminContext)
  const [image1,setImage1]=useState('')
  const [image2,setImage2]=useState('')
  const [image3,setImage3]=useState('')
  const [image4,setImage4]=useState('')

  const[name,setName]=useState('')
  const[description, setDescription]=useState('')
  const [prize, setPrice]=useState("");
  const[category,setCategory]=useState("Men")
  const [subCategory, setSubCategory]=useState('Topwear')
  const [bestSeller, setBestseller]=useState(false)
  const [sizes, setSizes]=useState([])


  // submit handler and api calling 
  const onSubmitHandler= async(e)=>{
    e.preventDefault()
    try{
      const formData=new FormData()
      formData.append("name",name)
      formData.append("description", description)
      formData.append("prize",prize)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append('bestSeller',bestSeller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

    const response=await axios.post(backendUrl + '/api/product/add', formData ,{headers:{token}})
      console.log(response)
      if(response.data.success){
        toast.success(response.data.message)
        // setName('')
        // setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        // setPrice('')
        // setCategory('Men')
        // setSubCategory('Topwear')
        setBestseller(false)

      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(error){
      toast.error(error.message)
      console.log(error.message)

    }
  }

  return (
    <form onSubmit={(e)=>{onSubmitHandler(e)}} className='flex flex-col w-full items-start gap-3'>
      <div className="">
        <p className="mb-2">Upload Image</p>

        <div className=" flex gap-2">
        <label htmlFor='image1'>
          <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className="w-20" />
          <input onChange={(e)=>{setImage1(e.target.files[0])}} type="file" className="" id='image1' hidden />
        </label>
        {/* label2 */}
        <label htmlFor='image2'>
          <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className="w-20" />
          <input onChange={(e)=>{setImage2(e.target.files[0])}} type="file" className="" id='image2' hidden />
        </label>

         {/* label3 */}
         <label htmlFor='image3'>
          <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className="w-20" />
          <input onChange={(e)=>{setImage3(e.target.files[0])}} type="file" className="" id='image3' hidden />
        </label>

         {/* label4 */}
         <label htmlFor='image4'>
          <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className="w-20" />
          <input onChange={(e)=>{setImage4(e.target.files[0])}} type="file" className="" id='image4' hidden />
        </label>
        </div>
      </div>
        {/* product name  */}
      <div className="w-full">
        <p className='mb-2'>Product name</p>
        <input onChange={(e)=>{setName(e.target.value)}} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
      </div>
         {/* product description  */}
      <div className="w-full">
        <p className='mb-2'>Product name</p>
        <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='write content here' required />
      </div>
      <div className=" flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
      <div className="">
        <p className="mb-2">Product category</p>
        <select onClick={(e)=>{setCategory(e.target.value)}} className='w-full px-3 py-2' required >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="">
        <p className="mb-2">Sub category</p>
        <select onChange={(e)=>{setSubCategory(e.target.value)}} className='w-full px-3 py-2' required>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div>
        <p className="mb-2">Product Price</p>
        <input onChange={(e)=>{setPrice(e.target.value)}} value={prize} type="number" placeholder='25' className='w-full px-3 py-2 sm:w-[120px]' required />
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>{setSizes(prev => prev.includes("S") ? prev.filter(item=>item !=="S"): [...prev,"S"])}}>
            <p className={`${sizes.includes('S') ? ' bg-pink-100' : ' bg-slate-400'} px-3 py-1 cursor-pointer`} >S</p>
          </div>

          <div onClick={()=>{setSizes(prev => prev.includes("M") ? prev.filter(item=>item !=="M"): [...prev,"M"])}}>
            <p className={`${sizes.includes('M') ? ' bg-pink-100' : ' bg-slate-400'} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={()=>{setSizes(prev => prev.includes("L") ? prev.filter(item=>item !=="L"): [...prev,"L"])}}>
            <p className={`${sizes.includes('L') ? ' bg-pink-100' : ' bg-slate-400'} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={()=>{setSizes(prev => prev.includes("XL") ? prev.filter(item=>item !=="XL"): [...prev,"XL"])}}>
            <p className={`${sizes.includes('XL') ? ' bg-pink-100' : ' bg-slate-400'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>{setSizes(prev => prev.includes("XXL") ? prev.filter(item=>item !=="XXL"): [...prev,"XXL"])}}> 
            <p className={`${sizes.includes('XXL') ? ' bg-pink-100' : ' bg-slate-400'} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={()=> setBestseller(prev => !prev)} checked={bestSeller} type="checkbox"  id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestSeller</label>
      </div>
      <button  type='submit' className=' cursor-pointer w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add