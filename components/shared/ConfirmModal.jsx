"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";
import { cn } from "../../lib/utils.js";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  icon: CustomIcon,
}) {
  const variantStyles = {
    danger: {
      icon: "text-red-500 bg-red-100 dark:bg-red-500/20",
      buttonVariant: "danger",
    },
    warning: {
      icon: "text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20",
      buttonVariant: "primary",
    },
    info: {
      icon: "text-blue-500 bg-blue-100 dark:bg-blue-500/20",
      buttonVariant: "secondary",
    },
  };

  const styles = variantStyles[variant];
  const Icon = CustomIcon || AlertTriangle;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      footer={
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto sm:justify-end">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            variant={styles.buttonVariant}
            size="md"
            onClick={handleConfirm}
            className="w-full sm:w-auto"
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-3 sm:gap-4 py-2">
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-xl",
            "flex items-center justify-center",
            styles.icon,
          )}
        >
          <Icon size={24} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 break-words">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed break-words">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
}
