import TextField from "@mui/material/TextField";
import Link from "next/link";
export default function CheckOutForm({
  currentStep,
  steps,
  setCurrentStep,
  setPaymentChoice,
}: any) {
  return (
    <>
      <div className="flex flex-col justify-around checkout-elements-width h-1/2">
        <h3 className="text-xl">{currentStep}</h3>
        <section className="grid grid-cols-2 gap-y-8 gap-x-2 ">
          <TextField label="First Name" variant="filled" />
          <TextField label="Last Name" variant="filled" />
          <TextField label="Address Line 1" variant="filled" />
          <TextField label="Email" variant="filled" />
          <TextField label="City" variant="filled" />
          <TextField label="Zip/Postal Code" variant="filled" />
          <TextField label="Shipping Country" variant="filled" />
        </section>
        <section className="flex justify-between">
          <button className="py-3 px-8 outline-none border-[1px] border-[#e5e5e5] rounded-sm ">
            <Link href="/cart">Back to Cart</Link>
          </button>
          <button
            className="py-3 px-8 outline-none bg-main text-[#FFFFFF] font-semibold "
            onClick={() => {
              //go to next step
              setCurrentStep(steps[1]);
              //Reinizialise the payment method, just in case he wants to pay with tokens
              setPaymentChoice("");
            }}
          >
            Next
          </button>
        </section>
      </div>
    </>
  );
}
