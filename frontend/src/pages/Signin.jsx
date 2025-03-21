import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthImage from "/images/background.jpg";
import Logo from "/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  login,
  replaceCurrentUser,
  replaceIsLoggedIn,
  visitor,
} from "../slices/auth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../components/TextInput";
import ModalAlert from "./modals/ModalAlert";
import moment from "moment/moment";
import Loading from "../components/Loading";
import { showError, showSucces } from "../components/Toasts";
import { motion, useMotionValue, useTransform } from "motion/react";

function Signin() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Nom d'utilisateur requis").trim(),
  });

  const { isLoggedIn } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [showIsexist, setShowIsExist] = useState(false);
  const [message, setMessage] = useState("");
  const [me, setMe] = useState();
  const [load, setLoad] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  // addLocaleData([...locale_en, ...locale_de]);

  const dispatch = useDispatch();

  const itsMe = () => {
    dispatch(replaceCurrentUser(me));
    dispatch(replaceIsLoggedIn(true));
    localStorage.setItem("user", JSON.stringify(me));
    navigate("/home");
  };

  const onFormSubmit = (data) => {
    setLoad(true);
    dispatch(login(data))
      .unwrap()
      .then((data) => {
        setLoad(false);
        showSucces("Connexion reussie");
        navigate("/home");
      })
      .catch((err) => {
        setLoad(false);
        showError("Une erreur c'est produit");
      });
  };

  const onErrors = (errors) => console.error(errors);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <main className="bg-black h-[100dvh] relative">
      <Loading load={load} />
      <ModalAlert
        open={showIsexist}
        setOpen={setShowIsExist}
        message={message}
        action={() => itsMe()}
      />

      <div
        className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-lg bg-transparent bg-cover bg-center`}
        style={{ backgroundImage: `url("/images/background.jpg")` }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/50" />
      </div>

      <div className="relative grid min-h-[100dvh] overflow-y-auto place-items-center">
        <div className="h-[35rem] w-full sm:w-[500px] bg-[#14141c] rounded-lg pt-10 px-5 text-white">
          <div className="flex flex-col items-center w-full space-y-5 justify-center">
            <img src={Logo} alt="logo" className="h-12" />
            <p className="text-3xl font-bold">C'est parti</p>
            <div className="text-center sm:text-base text-sm">
              Glisse à gauche pour passer, à droite pour ajouter à ta liste 🎥.
              Trouve le film parfait à regarder avec tes amis en quelques swipes
              ! 🚀✨
            </div>
          </div>
          <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
            <div class="flex flex-col-reverse mt-5">
              <input
                placeholder="Nom d'utilisateur"
                value={username}
                class="peer bg-gray-800 outline-none ring-1 px-4 py-1 h-12 border-0 rounded-lg ring-primary-200 duration-500 focus:ring-2 focus:border-primary-500 relative placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 text-xs shadow-xl shadow-base-400/10 focus:shadow-none focus:rounded-md focus:ring-primary-500 placeholder:text-base-500"
                onChange={(e) => {
                  setValue("username", e.target.value);
                  setUsername(e.target.value);
                }}
                autoCapitalize="off"
              />

              <span class="duration-500 opacity-0 mb-2 peer-focus:opacity-100 text-base-500 text-xs -translate-y-12 peer-focus:translate-y-0">
                Nom d'utilisateur
              </span>
            </div>
            {errors.username && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors.username?.message}
              </span>
            )}

            <div className="flex justify-center mt-5">
              <motion.button
                className={`bg-gray-800 p-3 text-primary-500 rounded-xl w-3/4`}
                whileHover={{ scale: 1.1 }}
                type="submit"
                to="/"
              >
                Se connecter
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Signin;
