import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const { user}=useAuth()
  const data = useLoaderData();
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const regionsDuplicate = data.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const senderRegions = useWatch({ control, name: "senderRegions" });
  const ReceiverRegions = useWatch({ control, name: "ReceiverRegions" });
  const districtByRegions = (region) => {
    const regionDistrict = data.filter((c) => c.region === region);
    const districts = regionDistrict.map((d) => d.district);
    return districts;
  };

  const onSubmit = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderRegions === data.ReceiverRegions;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 120 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    Swal.fire({
      title: "Are you Confirm?",
      text: `You won't be able to revert this ${cost}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Confirm  it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //save post mdb parcel info
        axiosSecure.post("/parcels", data).then((res) => {
          console.log(res.data);
        });

        // Swal.fire({
        //   title: "parcelAdd",
        //   text: "Your file has been add.",
        //   icon: "success",
        // });
      }
    });
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
            {/* Sender Name */}
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
            {/* Sander Email */}
            <input
              type="text"
              name="senderEmail"
              defaultValue={user.email}
              placeholder="Sender Email"
              {...register("senderEmail", { required: true })}
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
            {/* Sender Regions */}
            <select
              defaultValue="Server Regions"
              {...register("senderRegions")}
              className="select select-neutral w-full mb-2"
            >
              <option disabled={true}>Server Regions</option>
              {regions.map((r, i) => (
                <option key={i}>{r}</option>
              ))}
            </select>
            {/* Sender districts */}
            <select
              defaultValue="Server districts"
              {...register("senderDistricts")}
              className="select select-neutral w-full mb-2"
            >
              <option disabled={true}>Server districts</option>
              {districtByRegions(senderRegions).map((r, i) => (
                <option key={i}>{r}</option>
              ))}
            </select>

            <textarea
              placeholder="Pickup Instruction"
              name="senderText"
              {...register("senderInstruction", { required: true })}
              className="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>
          </div>

          {/* Receiver Details */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Receiver Details</h2>
            {/* Receiver Name */}
            <input
              type="text"
              name="receiverName"
              {...register("receiverName", { required: true })}
              placeholder="Receiver Name"
              className="input input-bordered w-full mb-3"
            />
            {/* Receiver Phone */}
            <input
              type="text"
              placeholder="Receiver Contact No"
              name="receiverPhone"
              {...register("receiverPhone", { required: true })}
              className="input input-bordered w-full mb-3"
            />
            {/* Receiver Email */}
            <input
              type="text"
              name="receiverEmail"
              placeholder="Receiver Email"
              {...register("receiverEmail", { required: true })}
              className="input input-bordered w-full mb-3"
            />
            {/* Receiver Address */}
            <input
              type="text"
              placeholder="Receiver Address"
              name="receiverAddress"
              {...register("receiverAddress", { required: true })}
              className="input input-bordered w-full mb-3"
            />
            {/* Receiver Regions */}
            <select
              defaultValue="Receiver Regions"
              {...register("ReceiverRegions")}
              className="select select-neutral w-full mb-2"
            >
              <option disabled={true}>Receiver Regions</option>
              {regions.map((r, i) => (
                <option key={i}>{r}</option>
              ))}
            </select>
            {/* Receiver districts */}
            <select
              defaultValue="Receiver districts"
              {...register("ReceiverDistricts")}
              className="select select-neutral w-full mb-2"
            >
              <option disabled={true}>Receiver districts</option>
              {districtByRegions(ReceiverRegions).map((r, i) => (
                <option key={i}>{r}</option>
              ))}
            </select>
            {/* Delivery Instruction */}
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
