import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

export default function Modal(props) {
  const [Ready, setReady] = useState(() => false);
  const [Display, setDisplay] = useState(() => false);
  const [Allow, setAllow] = useState(() => true);

  const ModalRef = useRef(null);
  const idModal = "modal";

  const toggleAllow = () => {
    // Allow = false
    setAllow(!Allow);
  };

  const toggle = () => {
    if (props.toggleModal) props.toggleModal();
    else setDisplay(!Display);
  };

  const handleClickOutside = (event) => {
    if (ModalRef?.current && !ModalRef?.current?.contains?.(event.target) && Allow) toggle();
  };

  useEffect(() => {
    const rootContainer = document.createElement("div");
    rootContainer.setAttribute("id", idModal);
    setReady(true);

    if (!document.getElementById(idModal));
    document.body.appendChild(rootContainer);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (Display || props.in) {
      document.querySelector("body").classList.add("modal-open");
    }

    return () => {
      document.querySelector("body").classList.remove("modal-open");
    };
  }, [Display, props.in]);

  if (!Ready) return null;

  return (
    <>
      {props.children(toggle)}

      {document && document.getElementById(idModal) && (
        <div>
          {createPortal(
            <CSSTransition
              in={props.in ?? Display}
              timeout={500}
              onExit={toggleAllow}
              onExited={toggleAllow}
              classNames="overlay"
              unmountOnExit
            >
              <div className="overlay fixed inset-0 h-screen z-50">
                <div className="bg-black opacity-25 inset-0 absolute z-10"></div>
                <div className="absolute flex z-20 items-center justify-center inset-0">
                  <div
                    style={props.modalStyle}
                    ref={ModalRef}
                    className="bg-white shadow-2xl w-full max-h-full md:w-auto md:max-w-3xl "
                  >
                    <div className="relative">
                      <span className="modal-close" onClick={toggle}></span>
                    </div>

                    {props.content(toggle)}
                  </div>
                </div>
              </div>
            </CSSTransition>,
            document.getElementById(idModal)
          )}
        </div>
      )}
    </>
  );
}

Modal.defaultProps = {};
Modal.propTypes = {
  in: propTypes.bool,
  toggleModal: propTypes.func,
  content: propTypes.func.isRequired,
};
