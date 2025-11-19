import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Parcel Data:", data);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold"> Send A Parcel</h1>
      <p className="text-xl font-medium">Enter your parcel details</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value={"document"}
              {...register("parcelType", { required: true })}
              className="radio radio-success"
            />
            <span>Document</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value={"non-document"}
              {...register("parcelType", { required: true })}
              className="radio radio-success"
            />
            <span>Not-Document</span>
          </label>
        </div>

        {/* Parcel Name + Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="parcelName"
            placeholder="Parcel Name"
            className="input input-bordered w-full"
            {...register("parcelName", { required: true })}
          />
          <input
            type="text"
            name="weight"
            {...register("parcelWeight", { required: true })}
            placeholder="Parcel Weight (KG)"
            className="input input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Sender Details */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Sender Details</h2>

            <input
              type="text"
              name="senderName"
              placeholder="Sender Name"
              {...register("senderName", { required: true })}
              className="input input-bordered w-full mb-3"
            />
            {/* Sander Phone */}
            <input
              type="text"
              name="senderPhone"
              placeholder="Sender Phone No"
              {...register("senderPhone", { required: true })}
              className="input input-bordered w-full mb-3"
            />
            {/* Sander Address */}
            <input
              type="text"
              name="sanderAddress"
              placeholder="Address"
              {...register("sanderAddress", { required: true })}
              className="input input-bordered w-full mb-3"
            />
            <input
              type="text"
              name="sanderDistrict"
              placeholder="Your District"
              {...register("sanderAddress", { required: true })}
              className="input input-bordered w-full mb-3"
            />

            <textarea
              placeholder="Pickup Instruction"
              name="senderText"
              {...register("senderText", { required: true })}
              className="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>
          </div>

          {/* Receiver Details */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Receiver Details</h2>

            <input
              type="text"
              name="receiverName"
              {...register("receiverName", { required: true })}
              placeholder="Receiver Name"
              className="input input-bordered w-full mb-3"
            />

            <input
              type="text"
              placeholder="Receiver Contact No"
              name="receiverPhone"
              {...register("receiverPhone", { required: true })}
              className="input input-bordered w-full mb-3"
            />

            <input
              type="text"
              placeholder="Receiver Address"
              name="receiverAddress"
              {...register("receiverAddress", { required: true })}
              className="input input-bordered w-full mb-3"
            />
            {/* receiver District */}
            <input
              type="text"
              placeholder="Your District"
              name="receiverDistrict"
              {...register("receiverDistrict", { required: true })}
              className="input input-bordered w-full mb-3"
            />

            <textarea
              placeholder="Delivery Instruction"
              name="receiverInstruction"
              {...register("receiverInstruction", { required: true })}
              className="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Pickup Time */}
        <p className="mt-6 text-sm text-gray-700">
          * Pickup Time 4pm–7pm Approx.
        </p>

        {/* Submit Button */}
        <button className="btn btn-success mt-4 px-10">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
