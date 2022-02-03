export default function CartInfo(props: any) {
  return (
    <div className="">
      <h3>Order Info</h3>

      <section className="text-cartText flex justify-between items-center">
        <p>Subtotal</p>
        <span>
          ${props.totalCart != 0 ? props.totalCart - 10 : props.totalCart}
        </span>
      </section>
      <section className="text-cartText flex justify-between items-center">
        <p>Shipping Cost</p>
        <span>{props.totalCart != 0 ? "+$10.00" : "$0"}</span>
      </section>
      <section className="text-cartText flex justify-between items-center">
        <p>Total</p>
        <p className="text-lg font-bold">${props.totalCart}</p>
      </section>
      <section className="text-cartText flex justify-between items-center">
        <p>Total in tokens</p>
        <p className="text-lg font-bold text-main">
          {props.totalCart / 1000} Tokens
        </p>
      </section>
    </div>
  );
}
