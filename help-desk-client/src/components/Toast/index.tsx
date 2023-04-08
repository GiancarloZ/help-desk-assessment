import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Close } from "@mui/icons-material";

interface IToastNotificationProps {
  message: string;
  status: string;
  onHide: () => void;
}

interface IMessageObject {
  message: string;
  status: string;
}

interface IToastNotificationContainerProps {}
type StatusProp = {
  status: string;
};

const toastIn = keyframes`
  from {
    transform: translateX(-110%);
  }
  to {
    transform: translateX(0%);
  }
`;

const toastOut = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-110%);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
`;

const Toast = styled.div<StatusProp>`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  background-color: ${(props) =>
    props.status === "success" ? "#43a047" : "hsla(330, 100%, 28%, 1)"};
  color: #fff;
  border-radius: 24px;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  padding: 12px;
  animation: ${toastIn} 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards,
    ${toastOut} 1.5s 1.5s forwards;
  transform: translateX(-110%);
`;

const ToastMessage = styled.div`
  flex: 1;
`;

const CloseButton = styled.div`
  margin-left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;

  & > svg {
    width: 100%;
    height: auto;
    fill: #fff;
  }
`;

const ToastNotification = ({
  message,
  status,
  onHide,
}: IToastNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleHideToast = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <Toast status={status}>
      <ToastMessage>{message}</ToastMessage>
      <CloseButton onClick={handleHideToast}>
        <Close />
      </CloseButton>
    </Toast>
  ) : null;
};

const ToastNotificationContainer = forwardRef(
  (props: IToastNotificationContainerProps, ref) => {
    const [toasts, setToasts] = useState<IMessageObject[]>([]);

    useImperativeHandle(ref, () => ({
      sendMessage({ message, status }: IMessageObject) {
        setToasts((prevToasts) => [...prevToasts, { message, status }]);
      },
    }));

    const handleHideToast = (index: number) => {
      setToasts((prevToasts) => {
        const newToasts = [...prevToasts];
        newToasts.splice(index, 1);
        return newToasts;
      });
    };

    return (
      <ToastContainer>
        {toasts.map((toast: IMessageObject, index: number) => (
          <ToastNotification
            key={index}
            message={toast.message}
            status={toast.status}
            onHide={() => handleHideToast(index)}
          />
        ))}
      </ToastContainer>
    );
  }
);

export default ToastNotificationContainer;
