import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import LoadingModal from "../modals/LoadingModal";
import { useAuthContext } from "../../context/AuthContext";

const SignUpModal = lazy(() => import("../modals/SignUpModal"));
const LogInModal = lazy(() => import("../modals/LoginModal"));
const SignUpVerifyModal = lazy(() => import("../modals/SignUpVerifyModal"));

export default function Navbar() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignUpVerfiyModal, setShowSignUpVerifyModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const { token } = useAuthContext();
  let navigate = useNavigate();
  return (
    <nav className="navbar bg-dark">
      <div className="container flex justify-between">
        <span
          className="navbar-brand mb-0 h1 text-info ms-4"
          onClick={() => {
            navigate("/");
          }}
        >
          Travera
        </span>
        {token === "" || token === undefined ? (
          <div className="d-flex gap-3">
            <Button
              variant="info"
              size="sm"
              className="text-black"
              onClick={(e) => {
                setShowSignUpModal(true);
              }}
            >
              Sign Up
            </Button>

            <Button
              variant="info"
              size="sm"
              className="text-black"
              onClick={(e) => {
                setShowLogInModal(true);
              }}
            >
              Log In
            </Button>
          </div>
        ) : null}
      </div>
      {showSignUpModal ? (
        <Suspense
          fallback={
            <LoadingModal
              show={showSignUpModal}
              handleClose={() => {
                setShowSignUpModal(false);
              }}
            />
          }
        >
          <SignUpModal
            show={showSignUpModal}
            handleClose={() => {
              setShowSignUpModal(false);
            }}
            hitNextModal={() => {
              setShowSignUpVerifyModal(true);
            }}
          />
        </Suspense>
      ) : null}
      {showLogInModal ? (
        <Suspense
          fallback={
            <LoadingModal
              show={showLogInModal}
              handleClose={() => {
                setShowLogInModal(false);
              }}
            />
          }
        >
          <LogInModal
            show={showLogInModal}
            handleClose={() => {
              setShowLogInModal(false);
            }}
          />
        </Suspense>
      ) : null}
      {showSignUpVerfiyModal ? (
        <Suspense
          fallback={
            <LoadingModal
              show={showSignUpVerfiyModal}
              handleClose={() => setShowSignUpVerifyModal(false)}
            />
          }
        >
          <SignUpVerifyModal
            show={showSignUpVerfiyModal}
            handleClose={() => setShowSignUpVerifyModal(false)}
          />
        </Suspense>
      ) : null}
    </nav>
  );
}
