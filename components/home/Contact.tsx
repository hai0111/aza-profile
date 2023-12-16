import React from "react";
import { useForm } from "@formspree/react";
import { FaHeart } from "react-icons/fa";

const Contact = () => {
  const [state, handleSubmit] = useForm("mqkvvjjo");

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold underline decoration-4 decoration-gray-500 underline-offset-4">
        Contact
      </h3>
      {state.succeeded ? (
        <div role="alert" className="mt-4 flex items-center">
          Your message has been successfully sent. I will contact you very soon
          <span className="text-red-500 ms-1">
            <FaHeart />
          </span>
          !
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-5 gap-3 w-100 dark:text-light"
        >
          <input
            type="email"
            id="email"
            name="email"
            required={true}
            maxLength={128}
            placeholder="Your E-mail"
            className="outline-none rounded-3xl px-8 py-2"
          />
          <textarea
            id="message"
            name="message"
            required={true}
            placeholder="Additional information"
            className="outline-none rounded-3xl px-8 py-6 min-h-[16em] resize-none"
          />
          <div className="text-center mt-3">
            <button
              type="submit"
              className="bg-teal-500 dark:bg-teal-200 hover:brightness-90 transition-all duration-150 text-black rounded-3xl px-8 py-2"
            >
              Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;
