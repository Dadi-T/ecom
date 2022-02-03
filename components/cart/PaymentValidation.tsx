export default function PaymentValidation() {
  return (
    <div>
      <section className="sm:flex sm:justify-end items-center">
        <button className="main-button">Pay with Tokens</button>
        <p className="mx-2">OR</p>
        <button className="main-button">Pay with Card</button>
      </section>
    </div>
  );
}
