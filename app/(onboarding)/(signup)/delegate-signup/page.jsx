"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import countryNames from "@/data/countries";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import supabase from "@/supabase/config";
import PhoneInput from "react-phone-number-input";

const numberOdFays = 3;

function page() {
  const days = Array.from({ length: numberOdFays }, (_, index) => index + 1);

  const [formData, setFormData] = useState({
    participant_name: "",
    company_name: "",
    email: "",
    confirm_email: "",
    phone_number: "",
    confirm_phone_number: "",
    is_whatsapp: "",
    whatsapp_number: "",
    bwi_2022: "", //dropdown
    designation: "",
    participating_brand: "",
    company_website: "",
    address_line_one: "",
    address_line_two: "",
    city: "",
    state: "",
    country: "", //dropdown
    pincode: "",
    product: "", //dropdown
    category: "", //dropdown
    selected_days: [],
  });

  const [phoneValidation, setPhoneValadation] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [isWhatsappDisable, setIsWhatsappDisable] = useState(false);

  const diabledInputStyle = {
    backgroundColor: "#F6F6F7",
  };

  function isTextValid(text) {
    return /^[A-za-z\s]+/.test(text);
  }

  const handleNonNumberChange = (e) => {
    const { id, value } = e.target;

    if (isTextValid(value) || value === "") {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const optionsIsWhatsappNumber = [
    { value: "yes", label: "yes" },
    { value: "no", label: "no" },
  ];

  const handleIsWhatsappChange = (selectOptions) => {
    const is_whatsapp = selectOptions.value;

    let whatsapp_number = "";

    if (is_whatsapp == "yes") {
      whatsapp_number == formData.phone_number;
      setIsWhatsappDisable(true);
    } else {
      setIsWhatsappDisable(false);
    }
  };

  const optionsCountry = countryNames.map((country) => ({
    value: country,
    label: country,
  }));

  const handleCountryChange = (selectOptions) => ({
    ...formData,
    country: selectOptions.value,
  });

  const handelReset = () => {
    window.location.reload();
  };

  const ResetForm = () => {
    setFormData({
      name: "",
      email: "",
      confirm_email: "",
      phone_number: "",
      is_whatsapp: "",
      whatsapp_number: "",
      bwi_2022: "",
      designation: "",
      company_name: "",
      company_website: "",
      address_line_one: "",
      address_line_two: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      product: "",
      category: "",
      password: "",
      selected_days: [],
    });
  };

  const handleCheckboxChange = (day) => {
    const { selected_days } = formData;
    if (selected_days.includes(day)) {
      setFormData({
        ...formData,
        selected_days: selected_days.filter((d) => d !== day),
      });
    } else {
      setFormData({
        ...formData,
        selected_days: [...selected_days, day],
      });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  const router = useRouter();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const {
      participant_name,
      company_name,
      email,
      confirm_email,
      phone_number,
      confirm_phone_number,
      is_whatsapp,
      whatsapp_number,
      bwi_2022,
      designation,
      participating_brand,
      company_website,
      address_line_one,
      address_line_two,
      city,
      state,
      country,
      pincode,
      product,
      category,
      password,
      confirm_password,
      selected_days,
    } = formData;

    if (password !== confirm_password) {
      toast.error("Password Didn't Match.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const { data: existingUser, error: checkedError } = await supabase
        .from("delegates")
        .select("email")
        .eq("email", email);

      if (checkedError) throw new Error(checkedError.message);

      if (existingUser > 0) {
        toast.warn("You have already signed in.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      const { data: newUser, error: inserError } = await supabase
        .from("delegates")
        .insert({
          participant_name,
          company_name,
          email,
          confirm_email,
          phone_number,
          confirm_phone_number,
          is_whatsapp,
          whatsapp_number,
          bwi_2022,
          designation,
          participating_brand,
          company_website,
          address_line_one,
          address_line_two,
          city,
          state,
          country,
          pincode,
          product,
          category,
          selected_days,
        })
        .select();

      if (inserError) throw new Error(inserError.message);

      toast.success("Register Successfully .");

      // setTimeout(() => {
      //   router.push("/"), 3000;
      // });

      console.log(formData);

      ResetForm();

      setSubmitted(!submitted);
    } catch (error) {
      console.error("Error during registration : ", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="px-4 sm:px-6">
      {/* Logo Section */}
      <div className="m-5 border rounded-md p-3 px-5 flex justify-center">
        <Image
          src="https://pzcyatdoqigagyfbsani.supabase.co/storage/v1/object/public/steel-images//eventlogo.webp"
          alt="Logo"
          height={100}
          width={100}
        />
      </div>

      {/* Form Section */}
      <div className="m-5 border rounded-md p-5">
        <h1 className="text-3xl md:text-4xl font-bold py-5 text-center">
          Delegate Registration Form
          <div className="h-[3px] w-full md:w-[480px] mx-auto rounded-t-md bg-gradient-to-r from-[#f0c2fa] via-[#da9ff7] to-[#9e2ff3]"></div>
        </h1>

        {/* Basic Info Section */}
        <h2 className="text-2xl font-bold py-5">Basic Info</h2>
        <div className="h-[5px] w-[120px] rounded-t-md bg-gradient-to-r from-[#f0c2fa] via-[#da9ff7] to-[#9e2ff3]"></div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div>
            <div>
              <h1 className="text-lg font-bold mb-2">Select Days:</h1>
            </div>

            {/* Flex container to display checkboxes in one line */}
            <div className="flex flex-wrap gap-4">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    id={`day${day}`}
                    name={`day${day}`}
                    onChange={() => handleCheckboxChange(`day${day}`)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor={`day${day}`}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Day {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="name" className="text-lg font-bold">
              Name
            </Label>
            <Input
              type="text"
              id="participant_name"
              placeholder="Name"
              className="border-2 rounded px-3 py-2 w-full"
              value={formData.participant_name || ""}
              onChange={handleNonNumberChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="designation" className="text-lg font-bold">
              Designation
            </Label>
            <Input
              id="designation"
              type="text"
              placeholder="Designation"
              className="border-2 rounded px-3 py-2 w-full"
              value={formData.designation}
              onChange={handleNonNumberChange}
              required
              maxLength={25}
            />
          </div>

          <div>
            <Label htmlFor="company_name" className="text-lg font-bold">
              Company Name
            </Label>
            <Input
              id="company_name"
              type="text"
              placeholder="Company Name"
              className="border-2 rounded px-3 py-2 w-full"
              value={formData.company_name}
              onChange={handleNonNumberChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone_number" className="text-lg font-bold">
              Phone Number
            </Label>
            <PhoneInput
              international
              id="phone_number"
              defaultCountry="IN"
              value={formData.phone_number}
              onChange={(e) => {
                handleInputChange({
                  target: {
                    id: "phone_number",
                    e,
                  },
                });
              }}
              required
              limitMaxLength
              className={`flex h-10 w-full rounded-md border border-input ${
                phoneValidation ? "bg-background" : "bg-error"
              } px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
          </div>

          <div>
            <Label htmlFor="is_whatsapp" className="text-lg font-bold">
              Is this your Whatsapp No.?
            </Label>
            <Select
              options={optionsIsWhatsappNumber}
              value={optionsIsWhatsappNumber.find(
                (option) => option.value === formData.is_whatsapp
              )}
              onChange={handleIsWhatsappChange}
              className="w-full"
              required
            />
          </div>

          <div>
            <Label htmlFor="whatsappNo" className="text-lg font-bold">
              Whatsapp Number
            </Label>
            <PhoneInput
              international
              required
              id="whatsapp_number"
              placeholder="Enter your Whatsapp Number."
              defaultCountry="IN"
              value={formData.whatsapp_number || ""}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    id: "phone_number",
                    value,
                  },
                })
              }
              disabled={isWhatsappDisable}
              style={isWhatsappDisable ? diabledInputStyle : {}}
              className={`flex h-10 w-full rounded-md border border-input ${
                phoneValidation ? "bg-background" : "bg-error"
              } px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-lg font-bold">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email Address"
              className="border-2 rounded px-3 py-2 w-full"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmEmail" className="text-lg font-bold">
              Confirm Email Address
            </Label>
            <Input
              type="email"
              id="confirm_email"
              placeholder="Confirm Email Address"
              value={formData.confirm_email}
              onPaste={handlePaste}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <hr className="my-5" />

        {/* Company Details Section */}
        <h2 className="text-2xl font-bold py-5">Company Details</h2>
        <div className="h-[5px] w-[220px] rounded-t-md bg-gradient-to-r from-[#f0c2fa] via-[#da9ff7] to-[#9e2ff3]"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div>
            <Label htmlFor="city" className="text-lg font-bold">
              City
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter your city"
              className="border-2 rounded px-3 py-2 w-full"
              value={formData.city}
              onChange={handleNonNumberChange}
              required
              maxLength={20}
            />
          </div>

          <div>
            <Label htmlFor="state" className="text-lg font-bold">
              State
            </Label>
            <Input
              id="state"
              type="text"
              placeholder="Enter your state"
              className="border-2 rounded px-3 py-2 w-full"
              value={formData.state}
              onChange={handleNonNumberChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="country" className="text-lg font-bold">
              Country
            </Label>
            <Select
              options={optionsCountry}
              value={optionsCountry.find(
                (options) => options.value === formData.country
              )}
              onChange={handleCountryChange}
              className="w-full"
              required
            />
          </div>
        </div>

        <hr className="my-5" />

        <div className="space-y-4 mt-5">
          <div className="flex items-center space-x-2">
            <Input
              type="checkbox"
              className="w-5 h-5"
              id="receiveUpdates"
              checked={formData.receiveUpdates || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  receiveUpdates: e.target.checked,
                }))
              }
            />

            <Label className="text-md font-bold">
              Would you like to receive future updates from us?
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Input
              id="privacyPolicy"
              type="checkbox"
              className="w-10 h-5 mt-1"
              checked={formData.privacyPolicy || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  privacyPolicy: e.target.checked,
                }))
              }
              required
            />
            <Label className="text-md font-bold">
              By accepting this, you acknowledge that you have read and
              understood this Privacy Policy and agree to its terms and
              conditions.
            </Label>
          </div>
        </div>

        <div className="my-20 flex items-center justify-center">
          <button
            variant="secondary"
            className="mx-10 bg-gray-200 px-10 py-2 font-bold rounded-md"
            type="button"
            onClick={handelReset}
          >
            Reset
          </button>

          <button
            type="submit"
            className="bg-[#9e2ff3] text-white px-10 py-2 font-bold rounded-md"
            onClick={handelSubmit}
          >
            Submit
          </button>
        </div>

        <div className="flex justify-center">
          <Image
            src="https://pzcyatdoqigagyfbsani.supabase.co/storage/v1/object/public/steel-images//poweredy.webp"
            alt="img"
            width={200}
            height={50}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
