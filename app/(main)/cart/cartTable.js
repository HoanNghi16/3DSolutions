"use client"
import { useEffect, useState } from "react"
import { getUserCart } from "../../api/api"
import { HandleChangeCart, HandleDeleteCart } from "../../lib/handleCart"
import { ShowPriceFormat } from "../../lib/handleTextShow"
import { useAuth } from "../../authProvider"
import { useNoti } from "../../notification"
import ConfirmForm from "../../components/confirmForm"

export default function CartTable(){
    const [initialized, setInitialized] = useState(false)
    const [cart, setCart] = useState(null)
    const [selected, setSelected] = useState(null)
    const [cartError, setCartError] = useState(null)
    const [total, setTotal]= useState(0)
    const {setCartCount, user} = useAuth()
    const {setType, setMessage} = useNoti()
    const [showComfirm, setShowConfirm] = useState(false)
    const [confirmDetail, setConfirmDetail] = useState(null)
    const [toDelete, setToDelete] = useState(null)
    const [checkAll, setCheckAll] = useState(true)

    const handleCheckAll = (e)=>{
        if(e.target.checked){
            setInitialized(false)
        }else{
            setSelected([])
        }
    }
    const beforeConfirm = (kwargs) => {
        const cartItem = kwargs.cartItem
        const setCart = kwargs.setCart
        HandleDeleteCart(cartItem?.id, setCart).then((res) => {
                      setMessage(res?.message);
                      if (res.cart_count != null) {
                        setCartCount(res.cart_count);
                        setType("success");
                      } else {
                        setType("warning");
                      }
        });
    }
    const afterConfirm = () => {
        setShowConfirm(false)
    }

    function handleQuantityChange(e,cartItem){
        if( Number(e.target.value)<=0){
            setMessage('Số lượng sản phẩm phải lớn hơn 0')
            setType('warning')
            e.target.value = 1;
            return
        }
        if (e.target.value == ""){
            setCartError(null)
            e.target.value = e.target.defaultValue
            getTotal(selected)
            return
        }
        if (e.target.value != e.target.defaultValue){
            HandleChangeCart(cartItem?.id, cartItem?.product?.id, Number(e.target?.value)).then(result => {
                if (result?.message){
                    setCartError(result?.message)
                }else{
                    fetchCart()
                }
            })
        }else{
            setCartError(null)
            getTotal(selected)
        }
    }

    function checkQuantity(cartItem){
        return Number(cartItem?.quantity) > Number(cartItem?.product?.quantity)
    }
    function getTotal(selected){
        let term_total = 0
        if(!cart?.cart_details || !selected) return
        for (let detail of cart?.cart_details){
            if (selected.includes(detail?.id)){
                term_total+=Number(detail?.quantity*detail?.product?.unit_price)
            }
        }
        setTotal(term_total)
    }
    async function fetchCart(){
        const res = await getUserCart()
        const data = await res.json()
        if (data?.message){
            setCartError(data?.message)
            return
        }else{
            setCart(data)
            if(selected){
                getTotal(selected)
            }
            setCartError(null)
        }return true
    }
    useEffect(()=>{
        const wait = () => fetchCart()
        wait().then((res)=>{
            if(res?.message){
                setCartError(res?.message)
            }
        })
    },[])
    useEffect(()=>{
        getTotal(selected)
    },[cart])
    useEffect(()=>{
        function getSelected(){
            if(cart){
                if (initialized){
                    return
                }
                setSelected(cart?.cart_details?.map((item) => {
                    if(Number(item?.product?.quantity )> 0){
                        return item?.id
                    }
                    }))
                setInitialized(true)
                let checkout = {list_ids : selected, mode: 'order'}
                window.localStorage.setItem('checkout', JSON.stringify(checkout))
            }
        }
        getSelected()
    },[cart, initialized])

    function addItem(id){
        if(selected.includes(id)){
            setSelected((arr) => [...arr.filter((item) => {
                if (item!= id){
                    return item
                }
            })])
        }else{
            setSelected((arr) => [...arr, id])
            let checkboxes = window.document.getElementsByClassName('itemCheckBox')
            for (let check of checkboxes){
                if (check.target.checked == false){
                    return
                }
            }
            setCheckAll(true)
            window.document.getElementById('checkAll').checked = true
        }
    }
    useEffect(()=>{
        if (!user){
            setMessage('Vui lòng đăng nhập để sử dụng giỏ hàng!')
            setTimeout(()=> window.location.href = '/login', 1000)
            
        }
    },[])

    useEffect(()=>{
        function changeStorage(){
            if (!selected){
                return
            }
            getTotal(selected)
            let checkout = {list_ids: selected, mode: 'order'}
            window.localStorage.setItem('checkout', JSON.stringify(checkout))
        }
        changeStorage()
    },[selected])

    console.log(cart)
return (
  <main className="cartContainer">
    {showComfirm? <ConfirmForm callFirstFunc={beforeConfirm} kwargs={toDelete} callEndFunc={afterConfirm} detail={confirmDetail} type={'cartDelete'}></ConfirmForm>: null}
    {/* LEFT */}
    <section className="cartLeft">
      <header className="cartHeader">
        <h2 className="cartTitle">Giỏ hàng của bạn</h2>
      </header>
    {cartError && <p className="error">{cartError}</p>}
      <div className="cartBody">
        <label className="selectAll">
          <input type="checkbox" disabled={!cart || cart?.cart_details?.length == 0} defaultChecked={checkAll} id="checkAll" className="checkAll" onClick={(e)=>handleCheckAll(e)}/>
          Chọn tất cả
        </label>
        {cart?.cart_details?.length > 0 ?
          cart.cart_details.map((cartItem) => (
            <article className="cartItem" key={cartItem.id}>

              <div className="itemSelect">
                <input
                  className="itemCheckbox"
                  type="checkbox"
                  onChange={(e) => {
                    if(!e.target.checked){
                        window.document.getElementById('checkAll').checked = false
                    }
                    addItem(cartItem?.id)}
                  }
                  disabled={checkQuantity(cartItem)}
                  checked={selected?.includes(cartItem?.id) ?? true}
                />
              </div>
                <div className="itemImage">
                    <a href={`/products/${cartItem?.product?.id}`}>
                        <img src={cartItem?.product?.thumbnail} alt={cartItem?.product?.name}/>
                    </a>
                    </div>
                    <div className="itemInfo">
                    <p className="itemName">
                        {cartItem?.product?.name}
                    </p>
                    <p className="itemPrice">
                        {ShowPriceFormat(cartItem?.product?.unit_price)} &#8363;
                    </p>
                </div>


              <div className="itemQuantity">
                <input
                  type="number"
                  min={1}
                  className={cartItem?.id}
                  disabled={checkQuantity(cartItem)}
                  defaultValue={cartItem.quantity}
                  onBlur={(e) => handleQuantityChange(e, cartItem)}
                />
              </div>

              <div className="itemTotal">
                {ShowPriceFormat(cartItem?.sub_total)} đ
              </div>

              <div className="itemAction">
                <button className="deleteButton"
                  type="button"
                  onClick={() => {
                    setConfirmDetail(cartItem)
                    setShowConfirm(true)
                    setToDelete({cartItem: cartItem, setCart: setCart})
                  }}
                >
                  Xóa
                </button>
              </div>

            </article>
          )):<div className="cartRow" ><p className="error">Giỏ hàng trống</p></div>}
      </div>

    </section>

    {/* RIGHT */}
    <aside className="cartResult">

      <h3>Kết quả đơn hàng</h3>

      <div className="resultRow">
        <span>Tạm tính</span>
        <span>{ShowPriceFormat(total)} &#8363;</span>
      </div>

      <hr />

      <div className="resultTotal">
        <span>Tổng cộng</span>
        <span>{ShowPriceFormat(total)} &#8363;</span>
      </div>

      {cart?.cart_details?.length > 0 && (
        <button
          className="checkoutBtn"
          disabled={cartError != null}
          onClick={() => {
            setMessage('Đang kiểm tra!')
            setType(null)
            window.location.href = "/checkout";
          }}
        >
          Đặt hàng
        </button>
      )}

    </aside>

  </main>
);
}
